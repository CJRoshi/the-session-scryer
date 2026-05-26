/* =========================================================================
   SESSION STATS
   All compute* functions, their band helpers, geometry primitives, and
   shadow/sibling lookup. Pure functions — take a session (array of
   {class, aspect, moon}), return a result object. No React, no DOM.
   Depends on: session-constants.js, session-mc-tables.js, session-parser.js.
   ========================================================================= */

function computeBalance(session) {
  if (session.length === 0) return null;
  const sumClass  = session.reduce((s, p) => s + classesNumeric[p.class], 0);
  const sumAspect = session.reduce((s, p) => s + aspectsNumeric[p.aspect], 0);
  const sum       = sumClass + sumAspect;
  const rule      = ruleForSession(session);
  const sigma     = sigmaFor(rule, session.length);
  const sigmaDist = sigma > 0 ? Math.abs(sum) / sigma : 0;

  let band;
  if (sum === 0) band = BALANCE_BANDS[0];
  else band = BALANCE_BANDS.find(b => sigmaDist <= b.max) || BALANCE_BANDS[BALANCE_BANDS.length - 1];

  const direction = sum === 0 ? null : (sum > 0 ? 'Passive' : 'Active');
  const label = band.neutral ? band.label : `${band.label} ${direction}`;

  return { sum, sumClass, sumAspect, rule, sigma, sigmaDist, band, direction, label };
}

function computeCentroid(session) {
  if (session.length === 0) return null;
  const n = session.length;
  const meanX = session.reduce((s, p) => s + classesNumeric[p.class], 0) / n;
  const meanY = session.reduce((s, p) => s + aspectsNumeric[p.aspect], 0) / n;

  const rX = roundAwayFromZero(meanX);
  const rY = roundAwayFromZero(meanY);
  const isNexus = rX === 0 || rY === 0;

  if (isNexus) {
    return {
      meanX, meanY,
      repClassVal: 0, repAspectVal: 0,
      repClass: null, repAspect: null,
      isNexus: true,
      label: 'Nexus'
    };
  }

  const repClass  = classNameForValue(rX);
  const repAspect = aspectNameForValue(rY);
  return {
    meanX, meanY,
    repClassVal: rX, repAspectVal: rY,
    repClass, repAspect,
    isNexus: false,
    label: `${repClass} of ${repAspect}`
  };
}

function rungForPlayer(p) {
  const c = classesNumeric[p.class];
  const a = aspectsNumeric[p.aspect];
  const r2 = c * c + a * a;
  return RUNG_BY_R2[r2] ?? null;
}

function bandForRung(rung) {
  for (const b of BANDS) if (rung >= b.start && rung <= b.end) return b;
  return null;
}

function computeRepresentativeRung(session) {
  if (session.length === 0) return null;

  // 1. Rung per player.
  const rungs = session.map(rungForPlayer).filter(r => r !== null);
  if (rungs.length === 0) return null;

  // 2. Bucket by band.
  const buckets = BANDS.map(b => ({ band: b, members: [] }));
  rungs.forEach(r => {
    const idx = BANDS.findIndex(b => r >= b.start && r <= b.end);
    if (idx >= 0) buckets[idx].members.push(r);
  });
  const maxCount = Math.max(...buckets.map(b => b.members.length));
  const modalBuckets = buckets.filter(b => b.members.length === maxCount);

  // 3. Starting value: mean if one band wins; pooled median if ties.
  let startVal;
  let tieKind;
  if (modalBuckets.length === 1) {
    const ms = modalBuckets[0].members;
    startVal = ms.reduce((s, r) => s + r, 0) / ms.length;
    tieKind = 'modal';
  } else {
    const pooled = modalBuckets.flatMap(b => b.members).sort((a, b) => a - b);
    const mid = pooled.length / 2;
    startVal = pooled.length % 2
      ? pooled[Math.floor(mid)]
      : (pooled[mid - 1] + pooled[mid]) / 2;
    tieKind = 'median';
  }

  // 4. Floor rule — always step down non-integers.
  let startFloored = Math.floor(startVal);
  if (startFloored < 1) startFloored = 1;
  if (startFloored > 26) startFloored = 26;

  // 5. Adjustment: count players further / closer than the floored value.
  let further = 0, closer = 0;
  rungs.forEach(r => {
    if (r > startFloored) further++;
    else if (r < startFloored) closer++;
  });
  const adjustment = further > closer ? +1 : (closer > further ? -1 : 0);

  // 6. Final rung — clamp to [1, 26].
  const finalRung = Math.max(1, Math.min(26, startFloored + adjustment));
  const band = bandForRung(finalRung);
  const rungName = RUNG_NAMES[finalRung - 1];

  return {
    finalRung,
    rungName,
    band,
    startVal,
    startFloored,
    adjustment,
    further,
    closer,
    tieKind,
    modalBands: modalBuckets.map(b => b.band.name),
    playerRungs: rungs
  };
}

function essentialityBand(z) {
  for (const b of ESSENTIALITY_BANDS) if (z >= b.min) return b;
  return ESSENTIALITY_BANDS[ESSENTIALITY_BANDS.length - 1];
}

function computeEssentiality(session) {
  if (session.length === 0) return null;
  const cen = computeCentroid(session);
  // Snapped center: (0,0) if Nexus, else (repClassVal, repAspectVal).
  const cx = cen.isNexus ? 0 : cen.repClassVal;
  const cy = cen.isNexus ? 0 : cen.repAspectVal;

  const n = session.length;
  const E = session.reduce((s, p) => {
    const dx = classesNumeric[p.class]  - cx;
    const dy = aspectsNumeric[p.aspect] - cy;
    return s + Math.hypot(dx, dy);
  }, 0) / n;

  const rule  = ruleForSession(session);
  const mean  = essMeanFor(rule, n);
  const sigma = essSigmaFor(rule, n);

  // n=1 is always E=0 with σ=0; skip banding.
  if (sigma <= 0 || !isFinite(sigma)) {
    return { E, rule, mean, sigma, z: null, band: null,
             label: 'of Importance unknown.',
             centerX: cx, centerY: cy, isNexus: cen.isNexus };
  }

  const z = (E - mean) / sigma;
  const band = essentialityBand(z);
  return { E, rule, mean, sigma, z, band, label: band.label,
           centerX: cx, centerY: cy, isNexus: cen.isNexus };
}

function conflictBand(z) {
  for (const b of CONFLICT_BANDS) if (z >= b.min) return b;
  return CONFLICT_BANDS[CONFLICT_BANDS.length - 1];
}

// Helper: the maximum-distance pair(s) in a session. Ties returned together.
function maxConflictPairs(session) {
  const n = session.length;
  if (n < 2) return { maxDist: 0, pairs: [] };
  let maxDist = -1;
  let pairs = [];
  for (let i = 0; i < n; i++) {
    const xi = classesNumeric[session[i].class];
    const yi = aspectsNumeric[session[i].aspect];
    for (let j = i + 1; j < n; j++) {
      const xj = classesNumeric[session[j].class];
      const yj = aspectsNumeric[session[j].aspect];
      const d  = Math.hypot(xi - xj, yi - yj);
      if (d > maxDist + 1e-9) { maxDist = d; pairs = [[i, j]]; }
      else if (Math.abs(d - maxDist) < 1e-9) { pairs.push([i, j]); }
    }
  }
  return { maxDist, pairs };
}

function computeConflict(session) {
  if (session.length === 0) return null;
  const n = session.length;

  // Singleton has no pairs → "All internal."
  if (n === 1) {
    return { C: 0, rule: ruleForSession(session), mean: NaN, sigma: NaN,
             z: null, band: null, label: 'All internal.',
             maxDist: 0, maxPairs: [] };
  }

  // Mean pairwise Euclidean distance. Iterate unordered pairs directly (no
  // double counting: j starts at i+1).
  let total = 0, pairs = 0;
  for (let i = 0; i < n; i++) {
    const xi = classesNumeric[session[i].class];
    const yi = aspectsNumeric[session[i].aspect];
    for (let j = i + 1; j < n; j++) {
      const xj = classesNumeric[session[j].class];
      const yj = aspectsNumeric[session[j].aspect];
      total += Math.hypot(xi - xj, yi - yj);
      pairs += 1;
    }
  }
  const C = total / pairs;

  const rule  = ruleForSession(session);
  const mean  = conflictMeanFor(rule, n);
  const sigma = conflictSigmaFor(rule, n);
  const maxInfo = maxConflictPairs(session);

  // If tables haven't been populated yet, we can still return the raw value
  // but must skip banding.
  if (!isFinite(mean) || !isFinite(sigma) || sigma <= 0) {
    return { C, rule, mean, sigma, z: null, band: null,
             label: '(MC tables pending)',
             maxDist: maxInfo.maxDist, maxPairs: maxInfo.pairs };
  }

  const z = (C - mean) / sigma;
  const band = conflictBand(z);
  return { C, rule, mean, sigma, z, band, label: band.label,
           maxDist: maxInfo.maxDist, maxPairs: maxInfo.pairs };
}

function convexHull(pts) {
  // Monotone chain. Strict `<= 0` test keeps colinear points off the hull
  // so cheapest-insertion can place them optimally.
  const arr = [...new Map(pts.map(p => [p[0] + ',' + p[1], p])).values()];
  arr.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (arr.length <= 1) return arr;
  const lower = [];
  for (const p of arr) {
    while (lower.length >= 2 && _cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    const p = arr[i];
    while (upper.length >= 2 && _cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  lower.pop(); upper.pop();
  return lower.concat(upper);
}

function _cross(o, a, b) {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function _dist2d(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }

function minPerimeterPolygon(pts) {
  // Cheapest-insertion heuristic on the convex hull. O(n²). For n ≤ 24
  // this is instant.
  const unique = [...new Map(pts.map(p => [p[0] + ',' + p[1], p])).values()];
  if (unique.length <= 2) return unique.slice();
  const hull = convexHull(unique);
  const hullKey = new Set(hull.map(p => p[0] + ',' + p[1]));
  const poly = hull.slice();
  const remaining = unique.filter(p => !hullKey.has(p[0] + ',' + p[1]));
  while (remaining.length > 0) {
    let best = null;  // [cost, pIdx, eIdx]
    for (let pi = 0; pi < remaining.length; pi++) {
      const p = remaining[pi];
      for (let ei = 0; ei < poly.length; ei++) {
        const a = poly[ei];
        const b = poly[(ei + 1) % poly.length];
        const cost = _dist2d(a, p) + _dist2d(p, b) - _dist2d(a, b);
        if (best === null || cost < best[0]) best = [cost, pi, ei];
      }
    }
    const [, pi, ei] = best;
    const p = remaining.splice(pi, 1)[0];
    poly.splice(ei + 1, 0, p);
  }
  return poly;
}

function polygonPerimeter(poly) {
  const n = poly.length;
  if (n < 2) return 0;
  if (n === 2) return 2 * _dist2d(poly[0], poly[1]);
  let s = 0;
  for (let i = 0; i < n; i++) s += _dist2d(poly[i], poly[(i + 1) % n]);
  return s;
}

function polygonArea(poly) {
  const n = poly.length;
  if (n < 3) return 0;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % n];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
}

function _bandFor(value, bands) {
  let band = bands[0];
  for (const b of bands) if (value >= b.min) band = b;
  return band;
}

function computeOrder(session) {
  if (session.length === 0) return null;

  const cen = computeCentroid(session);
  // Nexus snaps to (0, 0). No player can sit on Nexus (no class=0, no
  // aspect=0), so only the non-Nexus case can drop anyone.
  const cx = cen.isNexus ? 0 : cen.repClassVal;
  const cy = cen.isNexus ? 0 : cen.repAspectVal;

  // Raw points, then effective (post-drop) points.
  const rawPts = session.map(p => [classesNumeric[p.class], aspectsNumeric[p.aspect]]);
  const dropIdx = [];
  const effPts = [];
  rawPts.forEach((pt, i) => {
    if (!cen.isNexus && pt[0] === cx && pt[1] === cy) dropIdx.push(i);
    else effPts.push(pt);
  });
  const k = effPts.length;
  const rule = ruleForSession(session);

  const buildResult = ({ order, regularity, polygon, perimeter, area, effectiveN, pinned }) => {
    const orderBand      = _bandFor(order, CHAOS_BANDS);
    const regularityBand = _bandFor(regularity, REGULARITY_BANDS);
    const cellLabel = STAT_F_LABELS[orderBand.idx][regularityBand.idx];
    // MC z-scores for tooltip. Order MC is in raw area; compare against A.
    // Regularity MC is already in [0, 1].
    const orderMean  = _lookupMC(ORDER_MEAN_TABLES, rule, effectiveN);
    const orderSigma = _lookupMC(ORDER_SIGMA_TABLES, rule, effectiveN);
    const regMean    = _lookupMC(REG_MEAN_TABLES, rule, effectiveN);
    const regSigma   = _lookupMC(REG_SIGMA_TABLES, rule, effectiveN);
    const orderZ = (orderSigma > 0) ? (area - orderMean) / orderSigma : null;
    const regZ   = (regSigma   > 0) ? (regularity - regMean) / regSigma : null;
    return {
      order, regularity,
      orderBand, regularityBand,
      cellLabel,
      label: `${cellLabel}.`,
      polygon, perimeter, area, effectiveN, rule,
      droppedIdx: dropIdx, droppedAt: cen.isNexus ? null : [cx, cy],
      pinned,  // null | 'order-max' | 'order-min'
      orderMean, orderSigma, orderZ,
      regMean, regSigma, regZ
    };
  };

  // k = 0: n=1 session where the single player sits on their own Rep.
  // Fall back to the original point's coords; pin Order to max.
  if (k === 0) {
    const [x, y] = rawPts[0] ?? [0, 0];
    return buildResult({
      order: 1,                                    // pinned max
      regularity: Math.min(1, Math.hypot(x, y) / MAX_RADIUS),
      polygon: [], perimeter: 0, area: 0, effectiveN: 1,
      pinned: 'order-max'
    });
  }

  if (k === 1) {
    const [x, y] = effPts[0];
    return buildResult({
      order: 1,                                    // pinned max
      regularity: Math.min(1, Math.hypot(x, y) / MAX_RADIUS),
      polygon: [effPts[0]], perimeter: 0, area: 0, effectiveN: 1,
      pinned: 'order-max'
    });
  }

  if (k === 2) {
    const [[x1, y1], [x2, y2]] = effPts;
    const n1 = Math.hypot(x1, y1), n2 = Math.hypot(x2, y2);
    const reg = (n1 === 0 || n2 === 0) ? 0 : Math.abs((x1 * x2 + y1 * y2) / (n1 * n2));
    return buildResult({
      order: 0,                                    // pinned min
      regularity: reg,
      polygon: effPts, perimeter: _dist2d(effPts[0], effPts[1]), area: 0, effectiveN: 2,
      pinned: 'order-min'
    });
  }

  // k ≥ 3: derive both axes from the polygon.
  const poly = minPerimeterPolygon(effPts);
  const P = polygonPerimeter(poly);
  const A = polygonArea(poly);
  const order = Math.max(0, Math.min(1, A / MAX_AREA));
  let reg = (P > 0) ? (4 * k * Math.tan(Math.PI / k) * A / (P * P)) : 0;
  reg = Math.max(0, Math.min(1, reg));

  return buildResult({
    order, regularity: reg,
    polygon: poly, perimeter: P, area: A, effectiveN: k,
    pinned: null
  });
}

function _relatedClasspects(className, aspectName, preserveTotal) {
  const T = classesNumeric[className] + aspectsNumeric[aspectName];
  const cInv = CLASS_INVERSES[className];
  const seen = new Set();
  const out = [];
  for (let i = 0; i < 3; i++) {  // Pair, Quasipair, Antipair only
    const newClass = cInv[i];
    const desired = (preserveTotal ? T : -T) - classesNumeric[newClass];
    const newAspect = aspectNameForValue(desired);
    if (newAspect === null) continue;
    const key = `${newClass}|${newAspect}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push([newClass, newAspect]);
  }
  return out;
}
function shadowsOf(c, a)  { return _relatedClasspects(c, a, false); }
function siblingsOf(c, a) { return _relatedClasspects(c, a, true);  }

function computeOddest(session) {
  const n = session.length;
  if (n < 2) return null;

  const shadowKeys = session.map(p =>
    new Set(shadowsOf(p.class, p.aspect).map(([c, a]) => `${c}|${a}`))
  );
  const playerKeys = session.map(p => `${p.class}|${p.aspect}`);
  const pts = session.map(p => [classesNumeric[p.class], aspectsNumeric[p.aspect]]);

  const shadowCounts = session.map((_, i) => {
    let c = 0;
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      if (shadowKeys[i].has(playerKeys[j])) c += 1;
    }
    return c;
  });
  // Mean pairwise distance to all other members. This is the right
  // tiebreak for "Oddest One Out" because it captures overall
  // isolation, not just the loneliest closest neighbor. The previous
  // tiebreak used nearest-neighbor distance — which silently failed in
  // sessions where two candidates each had a single sibling-style
  // close peer at identical distance (e.g. Dancestors: Meulin↔Kankri
  // and Cronus↔Rufioh both at √17), leaving first-encountered to win.
  // Mean distance correctly prefers Cronus (~9.64) over Meulin
  // (~6.54) in that case.
  const meanDist = session.map((_, i) => {
    if (n < 2) return 0;
    let sum = 0;
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      sum += Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
    }
    return sum / (n - 1);
  });

  let bestIdx = 0;
  for (let i = 1; i < n; i++) {
    if (shadowCounts[i] > shadowCounts[bestIdx]) { bestIdx = i; continue; }
    if (shadowCounts[i] === shadowCounts[bestIdx] && meanDist[i] > meanDist[bestIdx]) {
      bestIdx = i;
    }
  }
  return {
    playerIdx: bestIdx,
    player: session[bestIdx],
    shadowCount: shadowCounts[bestIdx],
    meanDistToOthers: meanDist[bestIdx],
    allShadowCounts: shadowCounts,
    allMeanDist: meanDist
  };
}

function computeClosestKnit(session) {
  const n = session.length;
  if (n < 2) return null;
  const pts = session.map(p => [classesNumeric[p.class], aspectsNumeric[p.aspect]]);

  // Bucket by (group, total). Skip Singleton (Lord/Muse are never siblings).
  const buckets = new Map();
  session.forEach((p, i) => {
    const group = CLASS_TO_GROUP[p.class];
    if (group === 'Singleton') return;
    const T = classesNumeric[p.class] + aspectsNumeric[p.aspect];
    const key = `${group}||${T}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(i);
  });

  const meanPairwise = (idxs) => {
    let s = 0, c = 0;
    for (let i = 0; i < idxs.length; i++)
      for (let j = i + 1; j < idxs.length; j++) {
        const a = pts[idxs[i]], b = pts[idxs[j]];
        s += Math.hypot(a[0] - b[0], a[1] - b[1]);
        c += 1;
      }
    return c > 0 ? s / c : 0;
  };

  /* Dupes (May 2026): same classpect ≠ sibling. Two Pages of Heart
     aren't a sibling pair — they're literally the same role. A bucket
     qualifies as a sibling clique only if it contains at least TWO
     DISTINCT (class, aspect) pairs. Buckets full of dupes of one
     classpect don't count; they get filtered out and the fallback
     "most central member" reading kicks in if nothing real remains. */
  const cliques = Array.from(buckets.entries())
    .filter(([, idxs]) => {
      if (idxs.length < 2) return false;
      const seen = new Set();
      for (const i of idxs) {
        seen.add(`${session[i].class}|${session[i].aspect}`);
        if (seen.size >= 2) return true;
      }
      return false;
    })
    .map(([key, idxs]) => {
      const [group, Tstr] = key.split('||');
      return { group, total: Number(Tstr), idxs, meanDist: meanPairwise(idxs) };
    });

  if (cliques.length === 0) {
    // Fallback: "most central" player.
    const meanToOthers = session.map((_, i) => {
      let s = 0;
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        s += Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
      }
      return s / (n - 1);
    });
    let bestIdx = 0;
    for (let i = 1; i < n; i++) {
      if (meanToOthers[i] < meanToOthers[bestIdx]) bestIdx = i;
    }
    return {
      kind: 'fallback',
      playerIdx: bestIdx,
      player: session[bestIdx],
      meanDistToOthers: meanToOthers[bestIdx]
    };
  }

  cliques.sort((a, b) => {
    if (b.idxs.length !== a.idxs.length) return b.idxs.length - a.idxs.length;
    return a.meanDist - b.meanDist;
  });
  const winner = cliques[0];
  return {
    kind: 'clique',
    group: winner.group,
    total: winner.total,
    playerIdxs: winner.idxs,
    players: winner.idxs.map(i => session[i]),
    size: winner.idxs.length,
    meanDist: winner.meanDist,
    allCliques: cliques
  };
}

function computeLeaders(session) {
  if (session.length === 0) return null;
  const ranked = session.map((p, i) => {
    const c = CLASS_LEAD[p.class];
    const a = ASPECT_LEAD[p.aspect];
    const score = c + 2 * a;
    let side;
    if (score > 0) side = 'Implicit';
    else if (score < 0) side = 'Explicit';
    else side = 'Balanced';
    return {
      playerIdx: i, player: p,
      classLead: c, aspectLead: a,
      score, absScore: Math.abs(score), side
    };
  });
  ranked.sort((x, y) => {
    if (y.absScore !== x.absScore) return y.absScore - x.absScore;
    const xc = Math.abs(x.classLead), yc = Math.abs(y.classLead);
    if (yc !== xc) return yc - xc;
    const xa = Math.abs(x.aspectLead), ya = Math.abs(y.aspectLead);
    if (ya !== xa) return ya - xa;
    // Final tiebreak: explicit (negative score) wins.
    return x.score - y.score;
  });
  return {
    top:    ranked[0],
    second: ranked[1] ?? null,
    ranked
  };
}

function computeLunarBalance(session) {
  if (session.length === 0) return null;
  const pureProspit = session.filter(p => p.moon === 'Prospit');
  const pureDerse   = session.filter(p => p.moon === 'Derse');
  if (pureProspit.length === 0 || pureDerse.length === 0) return null;

  const prospitMembers = session.filter(p => p.moon === 'Prospit' || p.moon === 'Dual');
  const derseMembers   = session.filter(p => p.moon === 'Derse'   || p.moon === 'Dual');

  return {
    prospit: {
      members:  prospitMembers,
      balance:  computeBalance(prospitMembers),
      centroid: computeCentroid(prospitMembers)
    },
    derse: {
      members:  derseMembers,
      balance:  computeBalance(derseMembers),
      centroid: computeCentroid(derseMembers)
    },
    counts: {
      prospitPure: pureProspit.length,
      dersePure:   pureDerse.length,
      dual:        session.filter(p => p.moon === 'Dual').length
    }
  };
}
