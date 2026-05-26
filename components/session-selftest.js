/* =========================================================================
   SELF TESTS
   Runs once on page load, asserts invariants across parser, encoder,
   decoder, rule detection, and every stat's compute function. Results
   render into the SelfTestPanel React component.
   Depends on: all other session-* files.
   ========================================================================= */

function runSelfTests() {
  const results = [];
  const ok  = (name) => results.push({ name, pass: true });
  const bad = (name, msg) => results.push({ name, pass: false, msg });
  const eqJSON = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Parser — Beta Kids round-trip
  const betaText = "derse nt time, d sr lgt\nProspit Heir of Breath\nWitch Space (Prospit)";
  const parsed = parseSession(betaText);
  if (parsed.errors.length === 0) ok('parse: Beta Kids — no errors');
  else bad('parse: Beta Kids — no errors', JSON.stringify(parsed.errors));
  if (parsed.players.length === 4) ok('parse: Beta Kids — 4 players');
  else bad('parse: Beta Kids — 4 players', `got ${parsed.players.length}`);

  const expected = [
    { class: 'Knight', aspect: 'Time',   moon: 'Derse' },
    { class: 'Seer',   aspect: 'Light',  moon: 'Derse' },
    { class: 'Heir',   aspect: 'Breath', moon: 'Prospit' },
    { class: 'Witch',  aspect: 'Space',  moon: 'Prospit' }
  ];
  const sortedParsed = sortPlayers(parsed.players);
  const sortedExpected = sortPlayers(expected);
  if (eqJSON(sortedParsed, sortedExpected)) ok('parse: Beta Kids — exact match');
  else bad('parse: Beta Kids — exact match', `got ${JSON.stringify(sortedParsed)}`);

  // Code round-trip
  const code = encodeSession(parsed.players);
  if (code === '2C1572922D51') ok('encode: Beta Kids → 2C1572922D51');
  else bad('encode: Beta Kids → 2C1572922D51', `got ${code}`);
  const decoded = decodeSession(code);
  if (eqJSON(sortPlayers(decoded.players), sortedExpected)) ok('decode: code → Beta Kids');
  else bad('decode: code → Beta Kids', `got ${JSON.stringify(decoded.players)}`);

  // No-moon → Dual
  const dual = parseSession('Maid of Hope');
  if (dual.players[0]?.moon === 'Dual') ok('parse: no moon defaults to Dual');
  else bad('parse: no moon defaults to Dual', JSON.stringify(dual));

  // Single-letter moons
  const singles = parseSession('p heir breath, d seer light');
  if (singles.players.length === 2 && singles.players[0].moon === 'Prospit' && singles.players[1].moon === 'Derse')
    ok('parse: single-letter moons p/d');
  else bad('parse: single-letter moons p/d', JSON.stringify(singles));

  // RG/Rg collision: "rg" → Rogue (documented)
  const rg = parseSession('rg light');
  if (rg.players[0]?.class === 'Rogue') ok('parse: "rg" → Rogue (documented collision)');
  else bad('parse: "rg" → Rogue', JSON.stringify(rg));

  // Unknown token → error, no player added
  const bad1 = parseSession('xyzzy time');
  if (bad1.players.length === 0 && bad1.errors.length === 1) ok('parse: unknown token errors out');
  else bad('parse: unknown token errors out', JSON.stringify(bad1));

  // Decode bad input
  const dec1 = decodeSession('Z51');
  if (dec1.errors.length > 0) ok('decode: bad hex flagged');
  else bad('decode: bad hex flagged', JSON.stringify(dec1));

  // Count prefix (May 2026): "N <classpect>" expands to N identical members.
  const cnt2 = parseSession('2 d knight time');
  if (cnt2.errors.length === 0 && cnt2.players.length === 2
      && cnt2.players.every(p => p.class === 'Knight' && p.aspect === 'Time' && p.moon === 'Derse'))
    ok('parse: count prefix "2 d knight time" → 2× Derse Knight of Time');
  else bad('parse: count prefix "2 d knight time"', JSON.stringify(cnt2));

  // Count prefix with no explicit moon → defaults to Dual ×N.
  const cnt3 = parseSession('3 prince hope');
  if (cnt3.errors.length === 0 && cnt3.players.length === 3
      && cnt3.players.every(p => p.class === 'Prince' && p.aspect === 'Hope' && p.moon === 'Dual'))
    ok('parse: count prefix "3 prince hope" → 3× Dual Prince of Hope');
  else bad('parse: count prefix "3 prince hope"', JSON.stringify(cnt3));

  // Count prefix mixed with comma-separated lines.
  const cnt4 = parseSession('2 p maid time, seer light');
  if (cnt4.errors.length === 0 && cnt4.players.length === 3)
    ok('parse: count prefix mixed with single-player line → 3 total');
  else bad('parse: count prefix mixed', JSON.stringify(cnt4));

  // Count of 0 → error (positive integer required).
  const cnt5 = parseSession('0 knight time');
  if (cnt5.errors.length === 1 && cnt5.players.length === 0)
    ok('parse: count "0" rejected as non-positive');
  else bad('parse: count "0" rejected', JSON.stringify(cnt5));

  // No prefix → existing single-player behavior preserved.
  const cnt6 = parseSession('knight time');
  if (cnt6.errors.length === 0 && cnt6.players.length === 1)
    ok('parse: no count prefix preserves single-player behavior');
  else bad('parse: no count prefix', JSON.stringify(cnt6));

  // Balance — Beta Kids: Witch/Space(0) + Knight/Time(-2) + Seer/Light(-3) + Heir/Breath(+4) = -1
  //   Rule D (no dup classes AND aspects), n=4, σ=10.279089 → |−1|/10.28 = 0.097 → Weakly Active
  const bal = computeBalance(parsed.players);
  if (bal?.sum === -1) ok('balance: Beta Kids sum === -1');
  else bad('balance: Beta Kids sum === -1', `got ${bal?.sum}`);
  if (bal?.rule === 'D') ok('balance: Beta Kids rule === D');
  else bad('balance: Beta Kids rule === D', `got ${bal?.rule}`);
  if (bal?.label === 'Weakly Active') ok('balance: Beta Kids label === "Weakly Active"');
  else bad('balance: Beta Kids label === "Weakly Active"', `got "${bal?.label}"`);

  // Balance — empty session → null
  if (computeBalance([]) === null) ok('balance: empty session returns null');
  else bad('balance: empty session returns null', 'got non-null');

  // Rule detection — two Knights forces away from C/D to A/B
  const dupClass = [
    { class: 'Knight', aspect: 'Time', moon: 'Dual' },
    { class: 'Knight', aspect: 'Space', moon: 'Dual' }
  ];
  if (ruleForSession(dupClass) === 'B') ok('rule: dup classes → B');
  else bad('rule: dup classes → B', `got ${ruleForSession(dupClass)}`);

  // Centroid — Beta Kids:
  //   classes: Witch(-6), Knight(-3), Seer(+2), Heir(+6) → mean = -0.25
  //   aspects: Space(+6), Time(+1), Light(-5), Breath(-2) → mean = 0.00
  //   mean class rounds to 0 → Nexus
  const cen = computeCentroid(parsed.players);
  if (cen?.isNexus) ok('centroid: Beta Kids → Nexus');
  else bad('centroid: Beta Kids → Nexus', `got ${cen?.label}`);
  if (Math.abs(cen?.meanX - (-0.25)) < 1e-9) ok('centroid: Beta Kids meanX = -0.25');
  else bad('centroid: Beta Kids meanX = -0.25', `got ${cen?.meanX}`);
  if (Math.abs(cen?.meanY - 0) < 1e-9) ok('centroid: Beta Kids meanY = 0');
  else bad('centroid: Beta Kids meanY = 0', `got ${cen?.meanY}`);

  // Centroid — simple non-nexus: single Muse of Space → (7, 6), snaps to itself
  const solo = [{ class: 'Muse', aspect: 'Space', moon: 'Dual' }];
  const cenSolo = computeCentroid(solo);
  if (cenSolo?.repClass === 'Muse' && cenSolo?.repAspect === 'Space') ok('centroid: solo Muse/Space → self');
  else bad('centroid: solo Muse/Space → self', `got ${cenSolo?.label}`);

  // Centroid — tight cluster that rounds to a valid classpect
  //   Sylph/Hope(-1,-6) + Maid/Hope(+1,-6) → mean (0, -6) → Nexus (class axis is 0)
  const axis = [
    { class: 'Sylph', aspect: 'Hope', moon: 'Dual' },
    { class: 'Maid',  aspect: 'Hope', moon: 'Dual' }
  ];
  if (computeCentroid(axis)?.isNexus) ok('centroid: zero-class-axis → Nexus');
  else bad('centroid: zero-class-axis → Nexus', `got ${computeCentroid(axis)?.label}`);

  // Centroid — empty session → null
  if (computeCentroid([]) === null) ok('centroid: empty session → null');
  else bad('centroid: empty session → null', 'got non-null');

  // Essentiality — Beta Kids from Nexus:
  //   √72 + √10 + √29 + √40 all / 4 ≈ 5.83920
  //   Rule D, n=4: μ=5.0592, σ=0.9946 → z ≈ +0.784 → "Somewhat Essential."
  const essBeta = computeEssentiality(parsed.players);
  const expectedE = (Math.sqrt(72) + Math.sqrt(10) + Math.sqrt(29) + Math.sqrt(40)) / 4;
  if (Math.abs(essBeta?.E - expectedE) < 1e-9) ok('essentiality: Beta Kids E ≈ 5.8392');
  else bad('essentiality: Beta Kids E ≈ 5.8392', `got ${essBeta?.E}`);
  if (essBeta?.rule === 'D') ok('essentiality: Beta Kids rule === D');
  else bad('essentiality: Beta Kids rule === D', `got ${essBeta?.rule}`);
  if (essBeta?.label === 'Somewhat Essential.') ok('essentiality: Beta Kids → "Somewhat Essential."');
  else bad('essentiality: Beta Kids → "Somewhat Essential."', `got "${essBeta?.label}" (z=${essBeta?.z?.toFixed(3)})`);

  // Essentiality — solo Muse of Space → E=0, singleton label
  const essSolo = computeEssentiality(solo);
  if (essSolo?.E === 0) ok('essentiality: solo → E=0');
  else bad('essentiality: solo → E=0', `got ${essSolo?.E}`);
  if (essSolo?.label === 'of Importance unknown.') ok('essentiality: solo → "of Importance unknown."');
  else bad('essentiality: solo → "of Importance unknown."', `got "${essSolo?.label}"`);

  // Essentiality — empty → null
  if (computeEssentiality([]) === null) ok('essentiality: empty → null');
  else bad('essentiality: empty → null', 'got non-null');

  // Essentiality band mapping — spot check bounds
  if (essentialityBand(3).label === 'Mission-Critical!!') ok('ess band: z=3 → Mission-Critical');
  else bad('ess band: z=3 → Mission-Critical', `got ${essentialityBand(3).label}`);
  if (essentialityBand(0).label === 'Not too important, not too unimportant.') ok('ess band: z=0 → neutral');
  else bad('ess band: z=0 → neutral', `got ${essentialityBand(0).label}`);
  if (essentialityBand(-4).label === 'Irrelevant.') ok('ess band: z=-4 → Irrelevant');
  else bad('ess band: z=-4 → Irrelevant', `got ${essentialityBand(-4).label}`);

  // Conflict — Beta Kids pairwise distances:
  //   (Witch/Space, Knight/Time)  = √34
  //   (Witch/Space, Seer/Light)   = √185
  //   (Witch/Space, Heir/Breath)  = √208   <-- max pair
  //   (Knight/Time, Seer/Light)   = √61
  //   (Knight/Time, Heir/Breath)  = √90
  //   (Seer/Light, Heir/Breath)   = 5
  //   C = (√34 + √185 + √208 + √61 + √90 + 5) / 6 ≈ 9.3586
  const conBeta = computeConflict(parsed.players);
  const expectedC = (Math.sqrt(34) + Math.sqrt(185) + Math.sqrt(208)
                   + Math.sqrt(61) + Math.sqrt(90) + 5) / 6;
  if (Math.abs(conBeta?.C - expectedC) < 1e-9) ok('conflict: Beta Kids C ≈ 9.3586');
  else bad('conflict: Beta Kids C ≈ 9.3586', `got ${conBeta?.C}`);
  if (Math.abs(conBeta?.maxDist - Math.sqrt(208)) < 1e-9) ok('conflict: Beta Kids max pair = √208');
  else bad('conflict: Beta Kids max pair = √208', `got ${conBeta?.maxDist}`);
  if (conBeta?.maxPairs.length === 1) ok('conflict: Beta Kids exactly 1 max pair');
  else bad('conflict: Beta Kids exactly 1 max pair', `got ${conBeta?.maxPairs.length}`);
  // Rule D n=4: μ=8.0127, σ=1.4919 → z ≈ (9.3586 − 8.0127)/1.4919 ≈ +0.902 → "Somewhat at odds."
  if (conBeta?.label === 'Somewhat at odds.') ok('conflict: Beta Kids → "Somewhat at odds."');
  else bad('conflict: Beta Kids → "Somewhat at odds."', `got "${conBeta?.label}" (z=${conBeta?.z?.toFixed(3)})`);

  // Conflict — singleton → "All internal."
  const conSolo = computeConflict(solo);
  if (conSolo?.label === 'All internal.') ok('conflict: singleton → "All internal."');
  else bad('conflict: singleton → "All internal."', `got "${conSolo?.label}"`);
  if (conSolo?.C === 0) ok('conflict: singleton → C=0');
  else bad('conflict: singleton → C=0', `got ${conSolo?.C}`);

  // Conflict — empty → null
  if (computeConflict([]) === null) ok('conflict: empty → null');
  else bad('conflict: empty → null', 'got non-null');

  // Conflict — symmetric 4-player square (all equidistant neighbors)
  //   Place corners of a 2x2 square around origin to force a clear max pair
  //   Lord/Hope (-7,-6), Lord/Space (-7,6), Muse/Hope (7,-6), Muse/Space (7,6).
  //   Opposing corners are the max pairs (two of them, equal distance √(14²+12²)=√340).
  const square = [
    { class: 'Lord', aspect: 'Hope',  moon: 'Dual' },
    { class: 'Lord', aspect: 'Space', moon: 'Dual' },
    { class: 'Muse', aspect: 'Hope',  moon: 'Dual' },
    { class: 'Muse', aspect: 'Space', moon: 'Dual' }
  ];
  const conSquare = computeConflict(square);
  if (conSquare?.maxPairs.length === 2) ok('conflict: square has 2 max pairs (diagonals)');
  else bad('conflict: square has 2 max pairs (diagonals)', `got ${conSquare?.maxPairs.length}`);
  if (Math.abs(conSquare?.maxDist - Math.sqrt(340)) < 1e-9) ok('conflict: square max dist = √340');
  else bad('conflict: square max dist = √340', `got ${conSquare?.maxDist}`);

  // Conflict band mapping — spot checks (assumes MC tables populated; skip otherwise)
  if (conflictBand(3).label === 'Doomed to discord!!') ok('conflict band: z=3 → Doomed to discord');
  else bad('conflict band: z=3 → Doomed to discord', `got ${conflictBand(3).label}`);
  if (conflictBand(0).label === 'Not in array, nor disarray.') ok('conflict band: z=0 → neutral');
  else bad('conflict band: z=0 → neutral', `got ${conflictBand(0).label}`);
  if (conflictBand(-4).label === 'United and synchronized!') ok('conflict band: z=-4 → U&S');
  else bad('conflict band: z=-4 → U&S', `got ${conflictBand(-4).label}`);

  // ── Stat C (Representative Rung) ───────────────────────────────────────

  // RUNG_NAMES has 26 entries, one per rung.
  if (RUNG_NAMES.length === 26) ok('rung: RUNG_NAMES has 26 entries');
  else bad('rung: RUNG_NAMES has 26 entries', `got ${RUNG_NAMES.length}`);

  // rungForPlayer: Witch of Space (-6, 6) → r²=72 → rung 24 (The Point/Green Sun)
  if (rungForPlayer({ class: 'Witch', aspect: 'Space' }) === 24) ok('rung: Witch of Space → 24 (The Point)');
  else bad('rung: Witch of Space → 24', `got ${rungForPlayer({ class: 'Witch', aspect: 'Space' })}`);

  // Muse of Space (7, 6) → r²=85 → rung 26 (The Stage)
  if (rungForPlayer({ class: 'Muse', aspect: 'Space' }) === 26) ok('rung: Muse of Space → 26 (The Stage)');
  else bad('rung: Muse of Space → 26', `got ${rungForPlayer({ class: 'Muse', aspect: 'Space' })}`);

  // Beta Kids rungs: Witch/Space(r²=72)→24, Knight/Time(r²=10)→4,
  //                  Seer/Light(r²=29)→11, Heir/Breath(r²=40)→15
  // Buckets: Skaian=1 (Knight), Landed=2 (Seer, Heir), Furthest=1 (Witch).
  // Modal band = Landed (members rungs 11, 15 → mean 13).
  // Floored = 13. Further (15, 24): 2. Closer (4, 11): 2. Adj = 0.
  // Final rung = 13 (The Forge).
  const repBeta = computeRepresentativeRung(parsed.players);
  if (repBeta?.finalRung === 13) ok('rung: Beta Kids → rung 13 (The Forge)');
  else bad('rung: Beta Kids → rung 13', `got ${repBeta?.finalRung} (start ${repBeta?.startVal}, adj ${repBeta?.adjustment})`);
  if (repBeta?.band.name === 'Landed') ok('rung: Beta Kids modal band → Landed');
  else bad('rung: Beta Kids modal band → Landed', `got ${repBeta?.band.name}`);

  // Single-band mean spot check: Knight/Time (r²=10, rung 4) + Seer/Time (r²=5, rung 2)
  // → both in Skaian band (2 members). Mean = (2+4)/2 = 3 (integer) → floor = 3.
  // further(>3): 1 (Knight), closer(<3): 1 (Seer). adj = 0. Final = 3 (The Net).
  const repPair = computeRepresentativeRung([
    { class: 'Knight', aspect: 'Time', moon: 'Dual' },
    { class: 'Seer',   aspect: 'Time', moon: 'Dual' }
  ]);
  if (repPair?.finalRung === 3) ok('rung: same-band mean → rung 3 (The Net)');
  else bad('rung: same-band mean → rung 3', `got ${repPair?.finalRung} (start ${repPair?.startVal})`);
  if (repPair?.tieKind === 'modal') ok('rung: same-band mean uses modal (not median)');
  else bad('rung: same-band mean uses modal', `got ${repPair?.tieKind}`);

  // Tied-band median spot check: Seer/Time (rung 2, Skaian) + Knight/Life (rung 9, Gated).
  // Tied bands → pooled median of [2, 9] = 5.5 → floor = 5 (Center of Brilliance).
  // further(>5): 1 (9). closer(<5): 1 (2). adj = 0. Final = 5.
  const repTied = computeRepresentativeRung([
    { class: 'Seer',   aspect: 'Time', moon: 'Dual' },
    { class: 'Knight', aspect: 'Life', moon: 'Dual' }
  ]);
  if (repTied?.finalRung === 5) ok('rung: tied-band median → rung 5 (Center of Brilliance)');
  else bad('rung: tied-band median → rung 5', `got ${repTied?.finalRung} (start ${repTied?.startVal})`);
  if (repTied?.tieKind === 'median') ok('rung: tied-band uses pooled median');
  else bad('rung: tied-band uses pooled median', `got ${repTied?.tieKind}`);

  // Empty → null
  if (computeRepresentativeRung([]) === null) ok('rung: empty → null');
  else bad('rung: empty → null', 'got non-null');

  // Single player → that player's rung with adj=0 (further=closer=0).
  const repSolo = computeRepresentativeRung([{ class: 'Muse', aspect: 'Space', moon: 'Dual' }]);
  if (repSolo?.finalRung === 26 && repSolo?.adjustment === 0) ok('rung: solo Muse/Space → rung 26, adj 0');
  else bad('rung: solo Muse/Space → rung 26', JSON.stringify({ r: repSolo?.finalRung, a: repSolo?.adjustment }));

  // ── Stat F (Game Quality: Chaos × Regularity) ──────────────────────────

  // Convex hull — trivial square
  const hullPts = [[0,0],[10,0],[10,10],[0,10],[5,5]]; // 5th point is interior
  const hull = convexHull(hullPts);
  if (hull.length === 4) ok('hull: 4-point square excludes interior');
  else bad('hull: 4-point square excludes interior', `got ${hull.length}`);

  // Full-corner rectangle {Lord/Hope, Lord/Space, Muse/Hope, Muse/Space}:
  //   corners (-7,-6), (-7,6), (7,-6), (7,6) → perimeter = 2*14 + 2*12 = 52
  //   area = 14 * 12 = 168 → Order = 168/168 = 1 (max Sprawling)
  //   Regularity = 4*4*tan(π/4) * 168 / 52² = 2688/2704 ≈ 0.99408 (Symmetrical)
  const squareE = [
    { class: 'Lord', aspect: 'Hope',  moon: 'Dual' },
    { class: 'Lord', aspect: 'Space', moon: 'Dual' },
    { class: 'Muse', aspect: 'Hope',  moon: 'Dual' },
    { class: 'Muse', aspect: 'Space', moon: 'Dual' }
  ];
  const ordSquare = computeOrder(squareE);
  if (Math.abs(ordSquare.perimeter - 52) < 1e-9) ok('order: square perimeter = 52');
  else bad('order: square perimeter = 52', `got ${ordSquare.perimeter}`);
  if (Math.abs(ordSquare.area - 168) < 1e-9) ok('order: square area = 168');
  else bad('order: square area = 168', `got ${ordSquare.area}`);
  if (Math.abs(ordSquare.order - 1) < 1e-9) ok('order: square → Order = 1 (Sprawling)');
  else bad('order: square → Order = 1', `got ${ordSquare.order}`);
  const expectedSquareR = 4 * 4 * Math.tan(Math.PI / 4) * 168 / (52 * 52);
  if (Math.abs(ordSquare.regularity - expectedSquareR) < 1e-9) ok('order: square Regularity ≈ 0.99408 (Symmetrical)');
  else bad('order: square Regularity ≈ 0.99408', `got ${ordSquare.regularity}`);
  if (ordSquare.label === 'Epic.') ok('order: square (Sprawling/Symmetrical) → "Epic."');
  else bad('order: square → "Epic."', `got "${ordSquare.label}"`);

  // Singleton — Order pinned max, regularity = dist/MAX_RADIUS
  const ordSolo = computeOrder(solo);  // Muse of Space = (7, 6) = MAX_RADIUS
  if (ordSolo.pinned === 'order-max') ok('order: solo → pinned order-max');
  else bad('order: solo → pinned order-max', `got ${ordSolo.pinned}`);
  if (Math.abs(ordSolo.order - 1) < 1e-9) ok('order: solo → Order = 1 (pinned)');
  else bad('order: solo → Order = 1', `got ${ordSolo.order}`);
  if (Math.abs(ordSolo.regularity - 1) < 1e-9) ok('order: solo at MAX corner → Regularity = 1');
  else bad('order: solo MAX corner → Regularity = 1', `got ${ordSolo.regularity}`);
  if (ordSolo.label === 'Epic.') ok('order: solo at MAX corner (Sprawling/Symmetrical) → "Epic."');
  else bad('order: solo at MAX corner → "Epic."', `got "${ordSolo.label}"`);

  // 2-player — Order pinned min. {Heir/Time (6,1), Lord/Hope (-7,-6)}:
  //   |cos θ| = |6*(-7)+1*(-6)| / √37·√85 = 48/√3145 ≈ 0.85598 → Symmetrical
  const twoP = [
    { class: 'Heir', aspect: 'Time', moon: 'Dual' },
    { class: 'Lord', aspect: 'Hope', moon: 'Dual' }
  ];
  const ordTwo = computeOrder(twoP);
  if (ordTwo.pinned === 'order-min') ok('order: 2-player → pinned order-min');
  else bad('order: 2-player → pinned order-min', `got ${ordTwo.pinned}`);
  if (Math.abs(ordTwo.order - 0) < 1e-9) ok('order: 2-player → Order = 0 (pinned)');
  else bad('order: 2-player → Order = 0', `got ${ordTwo.order}`);
  const expectedTwoR = Math.abs(6*(-7) + 1*(-6)) / (Math.hypot(6,1) * Math.hypot(-7,-6));
  if (Math.abs(ordTwo.regularity - expectedTwoR) < 1e-9) ok('order: 2-player Regularity = |cos θ|');
  else bad('order: 2-player Regularity = |cos θ|', `got ${ordTwo.regularity}`);
  if (ordTwo.label === 'Tailored.') ok('order: 2-player aligned (Cramped/Symmetrical) → "Tailored."');
  else bad('order: 2-player aligned → "Tailored."', `got "${ordTwo.label}"`);

  // Label matrix sanity — direct lookup of all 16 corners of the 4×4
  const cornerChecks = [
    [0, 0, 'Half-Baked'], [0, 1, 'Stunted'], [0, 2, 'Mediocre'], [0, 3, 'Tailored'],
    [1, 0, 'Botched'],    [1, 1, 'Janky'],   [1, 2, 'So-so'],    [1, 3, 'Vanilla'],
    [2, 0, 'Broken'],   [2, 1, 'Glitchy'], [2, 2, 'Weird'],    [2, 3, 'Classic'],
    [3, 0, 'Catastrophic'],[3, 1, 'Unhinged'],[3, 2, 'Crazy'], [3, 3, 'Epic']
  ];
  let matrixOk = true, matrixFail = '';
  for (const [oi, ri, want] of cornerChecks) {
    if (STAT_F_LABELS[oi][ri] !== want) { matrixOk = false; matrixFail = `[${oi}][${ri}]=${STAT_F_LABELS[oi][ri]} (want ${want})`; break; }
  }
  if (matrixOk) ok('order: STAT_F_LABELS all 16 cells correct');
  else bad('order: STAT_F_LABELS lookup', matrixFail);

  // Empty → null
  if (computeOrder([]) === null) ok('order: empty → null');
  else bad('order: empty → null', 'got non-null');

  // Rep-Classpect drop — {Seer/Time (2,1), Knight/Time (-3,1), Muse/Time (7,1)}:
  //   raw mean = (2, 1) → snap (2, 1) = Seer/Time. Player there drops.
  //   Effective n=2 → Order pinned min.
  const dropSess = [
    { class: 'Seer',   aspect: 'Time', moon: 'Dual' },   // (2, 1) — at Rep
    { class: 'Knight', aspect: 'Time', moon: 'Dual' },   // (-3, 1)
    { class: 'Muse',   aspect: 'Time', moon: 'Dual' }    // (7, 1)
  ];
  const ordDrop = computeOrder(dropSess);
  if (ordDrop.droppedIdx.length === 1) ok('order: Rep-Classpect player is dropped');
  else bad('order: Rep-Classpect player is dropped', `got ${ordDrop.droppedIdx.length}`);
  if (ordDrop.effectiveN === 2) ok('order: after drop, effectiveN = 2 (falls back to k=2)');
  else bad('order: after drop, effectiveN = 2', `got ${ordDrop.effectiveN}`);
  if (ordDrop.pinned === 'order-min') ok('order: after drop → pinned order-min');
  else bad('order: after drop → pinned order-min', `got ${ordDrop.pinned}`);

  // Beta Trolls — canonical n=12 Rule D fixture
  //   Σclass = Σaspect = 0 (deliberately balanced); centroid rounds to Nexus.
  //   Code: 2303104205806A07C0870940A50B90C60DB0 (moons all Dual)
  const trollsText = [
    'Witch of Life', 'Prince of Hope', 'Thief of Light', 'Knight of Blood',
    'Mage of Doom', 'Sylph of Space', 'Maid of Time', 'Seer of Mind',
    'Page of Breath', 'Rogue of Heart', 'Bard of Rage', 'Heir of Void'
  ].join(', ');
  const trolls = parseSession(trollsText);
  if (trolls.errors.length === 0 && trolls.players.length === 12) ok('parse: Beta Trolls — 12 players');
  else bad('parse: Beta Trolls — 12 players', JSON.stringify({errs: trolls.errors, n: trolls.players.length}));

  const trollsCode = encodeSession(trolls.players);
  const expectedTrollsCode = '2303104205806A07C0870940A50B90C60DB0';
  if (trollsCode === expectedTrollsCode) ok('encode: Beta Trolls → ' + expectedTrollsCode);
  else bad('encode: Beta Trolls', `got ${trollsCode}`);

  const trollsDecoded = decodeSession(expectedTrollsCode);
  if (trollsDecoded.errors.length === 0 && trollsDecoded.players.length === 12) ok('decode: Beta Trolls round-trip');
  else bad('decode: Beta Trolls round-trip', JSON.stringify(trollsDecoded));

  if (ruleForSession(trolls.players) === 'D') ok('rule: Beta Trolls → D (n=12)');
  else bad('rule: Beta Trolls → D (n=12)', `got ${ruleForSession(trolls.players)}`);

  const balTrolls = computeBalance(trolls.players);
  if (balTrolls?.sum === 0 && balTrolls?.label === 'Balanced') ok('balance: Beta Trolls → Balanced (sum=0)');
  else bad('balance: Beta Trolls → Balanced', JSON.stringify({sum: balTrolls?.sum, label: balTrolls?.label}));

  const cenTrolls = computeCentroid(trolls.players);
  if (cenTrolls?.isNexus) ok('centroid: Beta Trolls → Nexus');
  else bad('centroid: Beta Trolls → Nexus', `got ${cenTrolls?.label}`);

  // Stat F on Beta Trolls — Nexus snap means no drop (no troll at (0,0)).
  const ordTrolls = computeOrder(trolls.players);
  if (ordTrolls.effectiveN === 12) ok('order: Beta Trolls effectiveN = 12 (no drop, Nexus rep)');
  else bad('order: Beta Trolls effectiveN = 12', `got ${ordTrolls.effectiveN}`);
  if (ordTrolls.droppedIdx.length === 0) ok('order: Beta Trolls no dropped player');
  else bad('order: Beta Trolls no dropped player', `got ${ordTrolls.droppedIdx.length}`);
  if (ordTrolls.order >= 0 && ordTrolls.order <= 1) ok('order: Beta Trolls Order ∈ [0, 1]');
  else bad('order: Beta Trolls Order ∈ [0, 1]', `got ${ordTrolls.order}`);
  if (ordTrolls.regularity >= 0 && ordTrolls.regularity <= 1) ok('order: Beta Trolls Regularity ∈ [0, 1]');
  else bad('order: Beta Trolls Regularity ∈ [0, 1]', `got ${ordTrolls.regularity}`);

  // Stat F on Beta Kids (Rule D, n=4) — should produce a quad polygon.
  const ordKids = computeOrder(parsed.players);
  if (ordKids.effectiveN === 4 && ordKids.polygon.length === 4) ok('order: Beta Kids polygon has 4 vertices');
  else bad('order: Beta Kids polygon has 4 vertices', `effN=${ordKids.effectiveN} polyLen=${ordKids.polygon.length}`);
  if (ordKids.order >= 0 && ordKids.order <= 1) ok('order: Beta Kids Order ∈ [0, 1]');
  else bad('order: Beta Kids Order ∈ [0, 1]', `got ${ordKids.order}`);
  if (ordKids.regularity >= 0 && ordKids.regularity <= 1) ok('order: Beta Kids Regularity ∈ [0, 1]');
  else bad('order: Beta Kids Regularity ∈ [0, 1]', `got ${ordKids.regularity}`);

  // ── Stat G shared helpers ──────────────────────────────────────────────

  // Shadow spec from theory.html, Maid of Space example:
  //   Pair → Heir of Time;   QP → Sylph of Hope;   AP → Witch of Rage
  // Shadow is Pair-Inverting (undefined), QP-Inv (Sylph of Hope), AP-Inv (Witch of Rage).
  const shMaidSpace = shadowsOf('Maid', 'Space').map(([c,a]) => `${c}|${a}`);
  if (shMaidSpace.includes('Sylph|Hope')) ok('shadows: Maid of Space includes Sylph of Hope');
  else bad('shadows: Maid of Space includes Sylph of Hope', JSON.stringify(shMaidSpace));
  if (shMaidSpace.includes('Witch|Rage')) ok('shadows: Maid of Space includes Witch of Rage');
  else bad('shadows: Maid of Space includes Witch of Rage', JSON.stringify(shMaidSpace));

  // Siblings of Maid of Space: Pair-Preserving = Heir of Time; QP/AP undefined.
  const sibMaidSpace = siblingsOf('Maid', 'Space').map(([c,a]) => `${c}|${a}`);
  if (sibMaidSpace.length === 1 && sibMaidSpace[0] === 'Heir|Time') ok('siblings: Maid of Space → just Heir of Time');
  else bad('siblings: Maid of Space → just Heir of Time', JSON.stringify(sibMaidSpace));

  // Lord of X has zero siblings (never reachable within aspect range).
  if (siblingsOf('Lord', 'Blood').length === 0) ok('siblings: Lord of Blood → none');
  else bad('siblings: Lord of Blood → none', JSON.stringify(siblingsOf('Lord', 'Blood')));

  // Leadership sign check.
  if (CLASS_LEAD.Muse === 7 && CLASS_LEAD.Lord === -7) ok('leadership: Muse=+7, Lord=-7');
  else bad('leadership: Muse=+7, Lord=-7', `Muse=${CLASS_LEAD.Muse} Lord=${CLASS_LEAD.Lord}`);
  if (ASPECT_LEAD.Breath === 6 && ASPECT_LEAD.Blood === -6) ok('leadership: Breath=+6, Blood=-6');
  else bad('leadership: Breath=+6, Blood=-6', `Breath=${ASPECT_LEAD.Breath} Blood=${ASPECT_LEAD.Blood}`);

  // ── Stat G.1 — Oddest One Out ──────────────────────────────────────────

  // Empty / singleton → null
  if (computeOddest([]) === null) ok('oddest: empty → null');
  else bad('oddest: empty → null', 'non-null');
  if (computeOddest([{class:'Maid', aspect:'Space', moon:'Dual'}]) === null) ok('oddest: n=1 → null');
  else bad('oddest: n=1 → null', 'non-null');

  // Handcrafted shadow set: Maid of Space + its shadows (Sylph of Hope, Witch
  // of Rage) + an unrelated isolated Muse of Breath. The Maid has 2 shadows.
  const oddSess1 = [
    { class: 'Maid',  aspect: 'Space',  moon: 'Dual' },
    { class: 'Sylph', aspect: 'Hope',   moon: 'Dual' },
    { class: 'Witch', aspect: 'Rage',   moon: 'Dual' },
    { class: 'Muse',  aspect: 'Breath', moon: 'Dual' }
  ];
  const odd1 = computeOddest(oddSess1);
  if (odd1.playerIdx === 0) ok('oddest: Maid of Space wins with 2 in-session shadows');
  else bad('oddest: Maid of Space wins', `got idx ${odd1.playerIdx} with ${odd1.shadowCount} shadows`);
  if (odd1.shadowCount === 2) ok('oddest: shadowCount = 2');
  else bad('oddest: shadowCount = 2', `got ${odd1.shadowCount}`);

  // Tiebreaker test: a session where two players tie at 0 shadows; the more
  // isolated wins. Muse/Breath (7,-2) and Seer/Time (2,1) — no shadow overlap.
  const oddSess2 = [
    { class: 'Muse', aspect: 'Breath', moon: 'Dual' },  // (7, -2), r≈7.28
    { class: 'Seer', aspect: 'Time',   moon: 'Dual' },  // (2, 1)
    { class: 'Page', aspect: 'Heart',  moon: 'Dual' }   // (3, 3)
  ];
  const odd2 = computeOddest(oddSess2);
  if (odd2.shadowCount === 0) ok('oddest: tie-breaker — 0 shadows for all');
  else bad('oddest: 0 shadows for all', `got ${odd2.shadowCount}`);
  // Muse of Breath at (7, -2); nearest is Seer of Time at (2, 1):
  // dist = √(5² + 3²) = √34 ≈ 5.83. Others are closer.
  if (odd2.playerIdx === 0) ok('oddest: tie broken by isolation → Muse of Breath');
  else bad('oddest: tie-break → Muse of Breath', `got idx ${odd2.playerIdx}`);

  // ── Stat G.2 — Closest Knit ────────────────────────────────────────────

  // Closest-Knit on Beta Trolls: Σ=0 for all, but class groups differ, so
  // groups of same-total members form per-group cliques.
  // Witch/Life (-6+-4=-10), Maid/Time (1+1=2), etc. — totals vary, so most
  // are singletons in their (group, total). Expect at most size-1 cliques
  // and hence fallback. Actually, let's check: all 12 trolls have different
  // (group, total) tuples? Probably yes, because Rule D diversifies both.
  // We'll just assert G.2 returns non-null with either clique or fallback.
  const knitTrolls = computeClosestKnit(trolls.players);
  if (knitTrolls !== null) ok('knit: Beta Trolls returns non-null result');
  else bad('knit: Beta Trolls returns non-null', 'got null');

  // Hand-built clique: Witch/Life (-10), Sylph/Time (0)? No. Let's make a
  // clique with same (group, total): Magic group, total 0.
  //   Witch (-6) of Space (+6) = 0
  //   Maid  (+1) of Rage  (-1) = 0
  //   Heir  (+6) of Hope  (-6) = 0
  // All in Magic, total 0 → size-3 clique.
  const knitSess = [
    { class: 'Witch', aspect: 'Space', moon: 'Dual' },
    { class: 'Maid',  aspect: 'Rage',  moon: 'Dual' },
    { class: 'Heir',  aspect: 'Hope',  moon: 'Dual' },
    { class: 'Seer',  aspect: 'Time',  moon: 'Dual' }  // Vizier's, total 3
  ];
  const knit1 = computeClosestKnit(knitSess);
  if (knit1.kind === 'clique') ok('knit: 3-troll Magic/0 clique identified');
  else bad('knit: clique kind', `got ${knit1.kind}`);
  if (knit1.size === 3) ok('knit: clique size = 3');
  else bad('knit: clique size = 3', `got ${knit1.size}`);
  if (knit1.group === 'Magic' && knit1.total === 0) ok('knit: clique group=Magic, total=0');
  else bad('knit: clique group=Magic, total=0', JSON.stringify({g: knit1.group, t: knit1.total}));

  // No-sibling session → fallback.
  const knitFallback = computeClosestKnit([
    { class: 'Muse',  aspect: 'Breath', moon: 'Dual' },  // Singleton class
    { class: 'Lord',  aspect: 'Blood',  moon: 'Dual' },  // Singleton class
    { class: 'Seer',  aspect: 'Time',   moon: 'Dual' }   // Vizier's, alone
  ]);
  if (knitFallback.kind === 'fallback') ok('knit: no cliques → fallback to most central');
  else bad('knit: fallback kind', `got ${knitFallback.kind}`);

  // ── Stat G.4 — Likeliest Leader ────────────────────────────────────────

  // Handbuilt: Muse of Breath (7 + 2*6 = +19, Implicit max) vs Lord of Blood
  // (-7 + 2*-6 = -19, Explicit max). Score magnitudes tie; |class| and
  // |aspect| both tie; explicit wins → Lord of Blood is top.
  const leadPair = computeLeaders([
    { class: 'Muse', aspect: 'Breath', moon: 'Dual' },
    { class: 'Lord', aspect: 'Blood',  moon: 'Dual' }
  ]);
  if (leadPair.top.player.class === 'Lord' && leadPair.top.player.aspect === 'Blood')
    ok('leader: |19|-tie → Lord of Blood wins (explicit tiebreak)');
  else bad('leader: tie → Lord of Blood', `got ${leadPair.top.player.class} of ${leadPair.top.player.aspect}`);
  if (leadPair.top.side === 'Explicit' && leadPair.second.side === 'Implicit')
    ok('leader: sides = Explicit then Implicit');
  else bad('leader: sides', JSON.stringify({top: leadPair.top.side, 2: leadPair.second?.side}));
  if (leadPair.top.score === -19 && leadPair.second.score === 19) ok('leader: scores -19 / +19');
  else bad('leader: scores -19 / +19', JSON.stringify({a: leadPair.top.score, b: leadPair.second.score}));

  // Muse of Blood (mixed): score = 7 + 2*(-6) = -5 → Explicit.
  const leadMixed = computeLeaders([
    { class: 'Muse', aspect: 'Blood', moon: 'Dual' }
  ]);
  if (leadMixed.top.score === -5 && leadMixed.top.side === 'Explicit')
    ok('leader: Muse of Blood → score -5, Explicit side');
  else bad('leader: Muse of Blood', JSON.stringify({s: leadMixed.top.score, side: leadMixed.top.side}));

  // Beta Kids — sanity that ranking exists.
  const leadKids = computeLeaders(parsed.players);
  if (leadKids && leadKids.ranked.length === parsed.players.length) ok('leader: Beta Kids ranked all 4');
  else bad('leader: Beta Kids ranked all 4', `got ${leadKids?.ranked.length}`);

  // ── Stat G.5 — Lunar Balance ───────────────────────────────────────────

  // All-Prospit → null (no Derse).
  const allProspit = parsed.players.map(p => ({ ...p, moon: 'Prospit' }));
  if (computeLunarBalance(allProspit) === null) ok('lunar: all-Prospit → null');
  else bad('lunar: all-Prospit → null', 'got non-null');

  // Split Kids evenly: John/Rose Prospit, Dave/Jade Derse.
  const splitKids = parsed.players.map((p, i) => ({ ...p, moon: i < 2 ? 'Prospit' : 'Derse' }));
  const lunaSplit = computeLunarBalance(splitKids);
  if (lunaSplit !== null) ok('lunar: split Kids → non-null');
  else bad('lunar: split Kids → non-null', 'got null');
  if (lunaSplit && lunaSplit.prospit.members.length === 2 && lunaSplit.derse.members.length === 2)
    ok('lunar: split Kids → 2 per moon');
  else bad('lunar: split Kids → 2 per moon', JSON.stringify({
    p: lunaSplit?.prospit.members.length, d: lunaSplit?.derse.members.length
  }));
  // A Dual added to a split should inflate both moons.
  const splitPlusDual = [...splitKids, { class: 'Muse', aspect: 'Breath', moon: 'Dual' }];
  const lunaDual = computeLunarBalance(splitPlusDual);
  if (lunaDual.prospit.members.length === 3 && lunaDual.derse.members.length === 3)
    ok('lunar: Dual player counts toward both moons');
  else bad('lunar: Dual → both', JSON.stringify({
    p: lunaDual?.prospit.members.length, d: lunaDual?.derse.members.length
  }));

  console.group('Session Analyzer self-tests');
  for (const r of results) {
    if (r.pass) console.log('%c PASS', 'color: #6bff6b', r.name);
    else        console.log('%c FAIL', 'color: #ff6b6b', r.name, r.msg);
  }
  console.groupEnd();
  return results;
}
