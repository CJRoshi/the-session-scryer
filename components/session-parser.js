/* =========================================================================
   SESSION PARSER / ENCODER / DECODER
   ========================================================================= */

function ruleForSession(session) {
  const n = session.length;
  const uniqueClasses = new Set(session.map(p => p.class)).size;
  const uniqueAspects = new Set(session.map(p => p.aspect)).size;
  const noDupClasses  = uniqueClasses === n;
  const noDupAspects  = uniqueAspects === n;
  if (noDupClasses && noDupAspects) return 'D';
  if (noDupClasses)                 return 'C';
  if (noDupAspects)                 return 'B';
  return 'A';
}

function roundAwayFromZero(v) {
  return v >= 0 ? Math.round(v) : -Math.round(-v);
}

function classNameForValue(v) {
  return Object.entries(classesNumeric).find(([, val]) => val === v)?.[0] ?? null;
}
function aspectNameForValue(v) {
  return Object.entries(aspectsNumeric).find(([, val]) => val === v)?.[0] ?? null;
}

function classifyToken(token) {
  if (FILLER.has(token)) return { type: 'filler' };
  if (token in classVocab)  return { type: 'class',  value: classVocab[token] };
  if (token in aspectVocab) return { type: 'aspect', value: aspectVocab[token] };
  if (token in moonVocab)   return { type: 'moon',   value: moonVocab[token] };
  return { type: 'unknown', value: token };
}

function parsePlayerChunk(chunk) {
  let tokens = tokenize(chunk);
  if (tokens.length === 0) return null;
  let count = 1;
  if (/^\d+$/.test(tokens[0])) {
    const n = parseInt(tokens[0], 10);
    if (n <= 0) {
      return {
        class: null, aspect: null, moon: null, count: 0,
        errors: [`Count must be a positive integer, got "${tokens[0]}"`],
      };
    }
    count = n;
    tokens = tokens.slice(1);
  }

  const out = { class: null, aspect: null, moon: null, count, errors: [] };
  for (const tok of tokens) {
    const t = classifyToken(tok);
    if (t.type === 'filler') continue;
    if (t.type === 'unknown') { out.errors.push(`Unknown token "${tok}"`); continue; }
    if (t.type === 'class')   {
      if (out.class)  out.errors.push(`Multiple classes ("${out.class}", "${t.value}")`);
      else out.class = t.value;
    }
    if (t.type === 'aspect') {
      if (out.aspect) out.errors.push(`Multiple aspects ("${out.aspect}", "${t.value}")`);
      else out.aspect = t.value;
    }
    if (t.type === 'moon')   {
      if (out.moon)   out.errors.push(`Multiple moons ("${out.moon}", "${t.value}")`);
      else out.moon = t.value;
    }
  }
  if (!out.class)  out.errors.push('Missing Class');
  if (!out.aspect) out.errors.push('Missing Aspect');
  if (!out.moon)   out.moon = 'Dual';   // no-moon default
  return out;
}

function parseSession(text) {
  const chunks = text.split(/[\n,]/).map(s => s.trim()).filter(s => s.length > 0);
  const players = [];
  const errors  = [];
  chunks.forEach((chunk, idx) => {
    const p = parsePlayerChunk(chunk);
    if (!p) return;
    if (p.errors.length === 0) {
      const n = p.count || 1;
      for (let i = 0; i < n; i++) {
        players.push({ class: p.class, aspect: p.aspect, moon: p.moon });
      }
    } else {
      errors.push({ chunk, line: idx + 1, errors: p.errors });
    }
  });
  return { players, errors };
}

function sortPlayers(players) {
  return [...players].sort((a, b) => {
    const dc = classesNumeric[a.class] - classesNumeric[b.class];
    if (dc) return dc;
    const da = aspectsNumeric[a.aspect] - aspectsNumeric[b.aspect];
    if (da) return da;
    return moonToCode[a.moon] - moonToCode[b.moon];
  });
}

function encodeSession(players) {
  return sortPlayers(players).map(p => {
    const c = classToCode[p.class].toString(16).toUpperCase();
    const a = aspectToCode[p.aspect].toString(16).toUpperCase();
    const m = moonToCode[p.moon].toString(16).toUpperCase();
    return c + a + m;
  }).join('');
}

function decodeSession(code) {
  const cleaned = (code || '').replace(/[\s_-]/g, '').toUpperCase();
  if (cleaned.length === 0) return { players: [], errors: [] };
  if (cleaned.length % 3 !== 0) return { players: [], errors: [`Code length ${cleaned.length} is not a multiple of 3`] };
  const players = [];
  const errors  = [];
  for (let i = 0; i < cleaned.length; i += 3) {
    const ch = cleaned.substr(i, 3);
    const cv = parseInt(ch[0], 16);
    const av = parseInt(ch[1], 16);
    const mv = parseInt(ch[2], 16);
    if (isNaN(cv) || isNaN(av) || isNaN(mv)) { errors.push(`Bad hex in chunk ${i/3 + 1}: ${ch}`); continue; }
    const cn = codeToClass[cv];
    const an = codeToAspect[av];
    const mn = codeToMoon[mv];
    if (!cn) { errors.push(`Chunk ${i/3 + 1}: invalid class nibble 0x${cv.toString(16).toUpperCase()}`); continue; }
    if (!an) { errors.push(`Chunk ${i/3 + 1}: invalid aspect nibble 0x${av.toString(16).toUpperCase()}`); continue; }
    if (!mn) { errors.push(`Chunk ${i/3 + 1}: invalid moon nibble 0x${mv.toString(16).toUpperCase()}`); continue; }
    players.push({ class: cn, aspect: an, moon: mn });
  }
  return { players, errors };
}

// ── Parser vocabulary initialization ─────────────────────────────────────

const classVocab = {};
const aspectVocab = {};
const moonVocab = {};

(() => {
  const classAlts = {
    Lord:   ['lord', 'ld'],
    Witch:  ['witch', 'wi'],
    Prince: ['prince', 'pc', 'pr'],
    Thief:  ['thief', 'tf'],
    Knight: ['knight', 'nt', 'kt'],
    Mage:   ['mage', 'mg'],
    Sylph:  ['sylph', 'sy'],
    Maid:   ['maid', 'md'],
    Seer:   ['seer', 'sr'],
    Page:   ['page', 'pg'],
    Rogue:  ['rogue', 'rg'],
    Bard:   ['bard', 'bd'],
    Heir:   ['heir', 'hr'],
    Muse:   ['muse', 'ms', 'mu']
  };
  for (const [name, toks] of Object.entries(classAlts)) {
    for (const t of toks) classVocab[t] = name;
  }

  const aspectAlts = {
    Hope:   ['hope', 'hpe'],
    Light:  ['light', 'lgt'],
    Life:   ['life', 'lfe'],
    Mind:   ['mind', 'mnd'],
    Breath: ['breath', 'bth'],
    Rage:   ['rage', 'rge'],
    Time:   ['time', 'tme', 'tm'],
    Blood:  ['blood', 'bld'],
    Heart:  ['heart', 'hrt', 'ht'],
    Doom:   ['doom', 'dm'],
    Void:   ['void', 'vd'],
    Space:  ['space', 'spc', 'sp']
  };
  for (const [name, toks] of Object.entries(aspectAlts)) {
    for (const t of toks) aspectVocab[t] = name;
  }

  const moonAlts = {
    Prospit: ['prospit', 'p', 'gold'],
    Derse:   ['derse', 'd', 'purple'],
    Dual:    ['dual', 'b', 'both', 'gray', 'grey', 'u', 'unassigned', 'unknown', '?']
  };
  for (const [name, toks] of Object.entries(moonAlts)) {
    for (const t of toks) moonVocab[t] = name;
  }
})();

const FILLER = new Set(['of', 'the', 'a', 'an', '']);

function tokenize(chunk) {
  return chunk
    .replace(/[(),]/g, ' ')      // strip parens; commas should already be split, but be safe
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length > 0);
}
