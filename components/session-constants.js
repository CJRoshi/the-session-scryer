/* =========================================================================
   SESSION CONSTANTS
   Raw class/aspect lookups, session-code tables, moon colors, max-radius/
   max-area, rung naming, band/label tables, and class/aspect inverse maps.
   Pure data — no compute logic. Loaded before everything else.
   ========================================================================= */

const classesNumeric = {
  Lord: -7, Witch: -6, Prince: -5, Thief: -4,
  Knight: -3, Mage: -2, Sylph: -1, Maid: 1,
  Seer: 2, Page: 3, Rogue: 4, Bard: 5,
  Heir: 6, Muse: 7
};

const aspectsNumeric = {
  Hope: -6, Light: -5, Life: -4, Mind: -3,
  Breath: -2, Rage: -1, Time: 1, Blood: 2,
  Heart: 3, Doom: 4, Void: 5, Space: 6
};

const classAbbrev = {
  "Lord": "Ld", "Witch": "Wi", "Prince": "Pc", "Thief": "Tf",
  "Knight": "Nt", "Mage": "Mg", "Sylph": "Sy",
  "Maid": "Md", "Seer": "Sr", "Page": "Pg",
  "Rogue": "Rg", "Bard": "Bd", "Heir": "Hr", "Muse": "Ms"
};

const aspectAbbrev = {
  "Space": "SPC", "Void": "VD", "Doom": "DM", "Heart": "HRT",
  "Blood": "BLD", "Time": "TME", "Rage": "RGE", "Breath": "BTH",
  "Mind":  "MND", "Life": "LFE", "Light": "LGT", "Hope": "HPE"
};

const aspectOrder = ["Space", "Void", "Doom", "Heart", "Blood", "Time", "Rage", "Breath", "Mind", "Life", "Light", "Hope"];

/* =====================================================================
   SESSION CODE TABLES
   Class:  0x1 Lord ... 0xE Muse  (natural Lord→Muse order; 0x0, 0xF reserved)
   Aspect: 0x1 Hope ... 0xC Space (natural Hope→Space order; 0x0, 0xD-0xF reserved)
   Moon:   0x0 Dual, 0x1 Prospit, 0x2 Derse (0x3-0xF reserved)
   Per-player chunk = 3 hex chars (12 bits). Session code = sorted chunks concatenated.
   ===================================================================== */
const CLASS_ORDER = ['Lord','Witch','Prince','Thief','Knight','Mage','Sylph','Maid','Seer','Page','Rogue','Bard','Heir','Muse'];
const ASPECT_ORDER_ENC = ['Hope','Light','Life','Mind','Breath','Rage','Time','Blood','Heart','Doom','Void','Space'];

const classToCode = {};  CLASS_ORDER.forEach((c, i) => classToCode[c] = i + 1);
const codeToClass = {};  CLASS_ORDER.forEach((c, i) => codeToClass[i + 1] = c);
const aspectToCode = {}; ASPECT_ORDER_ENC.forEach((a, i) => aspectToCode[a] = i + 1);
const codeToAspect = {}; ASPECT_ORDER_ENC.forEach((a, i) => codeToAspect[i + 1] = a);
const moonToCode = { Dual: 0, Prospit: 1, Derse: 2 };
const codeToMoon = { 0: 'Dual', 1: 'Prospit', 2: 'Derse' };

const MOON_COLORS = {
  Dual:    '#888888',
  Prospit: '#f4d03f',
  Derse:   '#a569bd'
};

const BALANCE_BANDS = [
  { max: 0, label: 'Balanced', neutral: true },
  { max: 1, label: 'Weakly' },
  { max: 2, label: 'Moderately' },
  { max: 3, label: 'Unusually' },
  { max: Infinity, label: 'Extremely' }
];

/* =====================================================================
   STAT C: Representative Rung
   Each classpect sits on a "rung" — a concentric ring of the integer
   lattice grouped by r² = c² + a². There are 26 distinct rungs. They
   partition into 5 bands that mirror the Incipisphere:
     Skaian        (rungs  1– 5)   — Core → Battlefield → Skaia's halls
     Gated         (rungs  6–10)   — Gates and the systems that ring them
     Landed        (rungs 11–15)   — Planetary territory
     Veiled        (rungs 16–20)   — Meteors, temples, the edge of Derse
     Furthest Rungs(rungs 21–26)   — Beyond the Incipisphere
   ===================================================================== */
const RUNG_NAMES = [
  'Core of Creation',                   //  1, r²=2
  'The Battlefield',                    //  2, r²=5
  'The Net',                            //  3, r²=8
  'Hallowed Halls',                     //  4, r²=10
  'Center of Brilliance',               //  5, r²=13
  'Door To Destiny',                    //  6, r²=17
  'The Grist Rig',                      //  7, r²=18
  "Denizen's Lair",                     //  8, r²=20
  'The Battleships',                    //  9, r²=25
  'The Clock',                          // 10, r²=26
  'The Quest Bed',                      // 11, r²=29
  'The Village',                        // 12, r²=32
  'The Forge',                          // 13, r²=34
  'The Tadpole/The Scratch Construct',  // 14, r²=37
  'The Home',                           // 15, r²=40
  'The Meteors',                        // 16, r²=41
  'The Temple',                         // 17, r²=45
  'Ectobiology Lab',                    // 18, r²=50
  'Darkened Streets',                   // 19, r²=52
  'Core of Darkness',                   // 20, r²=53
  'The Fanontinuum',                    // 21, r²=58
  'The Secrets',                        // 22, r²=61
  'The Horrorterrors',                  // 23, r²=65
  'The Point/The Green Sun',            // 24, r²=72
  'The Map',                            // 25, r²=74
  'The Stage'                           // 26, r²=85
];

// r² → 1-indexed rung number (1..26)
const RUNG_R2_ORDER = [
  2, 5, 8, 10, 13, 17, 18, 20, 25, 26,
  29, 32, 34, 37, 40, 41, 45, 50, 52, 53,
  58, 61, 65, 72, 74, 85
];
const RUNG_BY_R2 = {};
RUNG_R2_ORDER.forEach((r2, i) => { RUNG_BY_R2[r2] = i + 1; });

// Band partition: each band spans 5 rungs except the outermost (6).
// Two color slots per band:
//   color     — bright hue used for the rung-band annulus on the dark
//               grid overlay (#0d0d0d bg), tuned to pop at 0.18 opacity.
//   textColor — darker variant used as text on the parchment cards/orbs.
//               Same hue family, lower lightness so it actually reads.
const BANDS = [
  { name: 'Skaian',         start:  1, end:  5, color: '#6dd1f4', textColor: '#125a7a' },
  { name: 'Gated',          start:  6, end: 10, color: '#ffd966', textColor: '#8a6810' },
  { name: 'Landed',         start: 11, end: 15, color: '#8fba6a', textColor: '#3a6a20' },
  { name: 'Veiled',         start: 16, end: 20, color: '#b57edc', textColor: '#6a3a8a' },
  { name: 'Furthest Rungs', start: 21, end: 26, color: '#8a5aa8', textColor: '#4a2a72' }
];

// Bands ordered by descending lower bound; first b where z >= b.min wins.
const ESSENTIALITY_BANDS = [
  { min:  3,          label: 'Mission-Critical!!',                    tone: 'high'    },
  { min:  2,          label: 'Momentous!',                            tone: 'high'    },
  { min:  1,          label: 'Key!',                                  tone: 'high'    },
  { min:  0.5,        label: 'Somewhat Essential.',                   tone: 'mid-hi'  },
  { min: -0.5,        label: 'Not too important, not too unimportant.', tone: 'neutral' },
  { min: -1,          label: 'Somewhat Inessential.',                 tone: 'mid-lo'  },
  { min: -2,          label: 'Trivial.',                              tone: 'low'     },
  { min: -3,          label: 'Negligible.',                           tone: 'low'     },
  { min: -Infinity,   label: 'Irrelevant.',                           tone: 'low'     }
];

const CONFLICT_BANDS = [
  { min:  3,          label: 'Doomed to discord!!',              tone: 'high'    },
  { min:  2,          label: "At each other's throats!",    tone: 'high'    },
  { min:  1,          label: 'Divided!',                         tone: 'high'    },
  { min:  0.5,        label: 'Somewhat at odds.',                tone: 'mid-hi'  },
  { min: -0.5,        label: 'Not in array, nor disarray.',      tone: 'neutral' },
  { min: -1,          label: 'Somewhat aligned.',                tone: 'mid-lo'  },
  { min: -2,          label: 'In accord.',                       tone: 'low'     },
  { min: -3,          label: 'Harmonious!',                      tone: 'low'     },
  { min: -Infinity,   label: 'United and synchronized!',         tone: 'low'     }
];

const MAX_RADIUS = Math.hypot(7, 6);     // ≈ 9.2195, farthest classpect
const MAX_AREA   = 14 * 12;              // 168, classpect bounding rect

const CHAOS_BANDS = [
  { idx: 0, min: 0.00, label: 'Uneventful',   tone: 'low'    },
  { idx: 1, min: 0.25, label: 'Simple',    tone: 'mid-lo' },
  { idx: 2, min: 0.50, label: 'Moderate',     tone: 'mid-hi' },
  { idx: 3, min: 0.75, label: 'Non-Stop Action', tone: 'high'   }
];

const REGULARITY_BANDS = [
  { idx: 0, min: 0.00, label: 'Tangled',     tone: 'low'    },
  { idx: 1, min: 0.25, label: 'Irregular',      tone: 'mid-lo' },
  { idx: 2, min: 0.50, label: 'Regular',   tone: 'mid-hi' },
  { idx: 3, min: 0.75, label: 'Organized', tone: 'high'   }
];

// 4×4 cell labels: STAT_F_LABELS[chaosBand.idx][regularityBand.idx].
// Rows convey eventfulness (Chaos axis: Uneventful → Non-Stop Action)
// Cols convey stability   (Regularity axis: Tangled → Organized)
const STAT_F_LABELS = [
  ['Half-Baked', 'Stunted',    'Mediocre', 'Tailored'],
  ['Botched',    'Janky',      'So-so',    'Vanilla' ],
  ['Broken',     'Glitchy',    'Weird',    'Classic' ],
  ['Catastrophic', 'Unhinged', 'Crazy',    'Epic'    ]
];

// Lord/Muse are their own "Singleton" group — no intra-group Pair/QP/AP
// structure that produces valid sibling/shadow partners within aspect range.
const CLASS_GROUPS = {
  "Magic":            ['Witch', 'Maid', 'Sylph', 'Heir'],
  "Vizier's":       ['Prince', 'Seer', 'Mage', 'Bard'],
  "Laws & Outlaws": ['Thief', 'Page', 'Knight', 'Rogue'],
  "Singleton":        ['Lord', 'Muse']
};
const CLASS_TO_GROUP = {};
Object.entries(CLASS_GROUPS).forEach(([g, cs]) =>
  cs.forEach(c => { CLASS_TO_GROUP[c] = g; })
);

// Per-class [Pair, Quasipair, Antipair, Numeric].
const CLASS_INVERSES = {
  Lord:   ['Muse',   'Muse',  'Muse',   'Muse'],
  Witch:  ['Sylph',  'Heir',  'Maid',   'Heir'],
  Prince: ['Bard',   'Mage',  'Seer',   'Bard'],
  Thief:  ['Rogue',  'Knight','Page',   'Rogue'],
  Knight: ['Page',   'Thief', 'Rogue',  'Page'],
  Mage:   ['Seer',   'Prince','Bard',   'Seer'],
  Sylph:  ['Witch',  'Maid',  'Heir',   'Maid'],
  Maid:   ['Heir',   'Sylph', 'Witch',  'Sylph'],
  Seer:   ['Mage',   'Bard',  'Prince', 'Mage'],
  Page:   ['Knight', 'Rogue', 'Thief',  'Knight'],
  Rogue:  ['Thief',  'Page',  'Knight', 'Thief'],
  Bard:   ['Prince', 'Seer',  'Mage',   'Prince'],
  Heir:   ['Maid',   'Witch', 'Sylph',  'Witch'],
  Muse:   ['Lord',   'Lord',  'Lord',   'Lord']
};

const ASPECT_INVERSES = {
  Space:  ['Time',   'Hope',   'Rage',   'Hope'],
  Void:   ['Light',  'Blood',  'Breath', 'Light'],
  Doom:   ['Life',   'Heart',  'Mind',   'Life'],
  Heart:  ['Mind',   'Doom',   'Life',   'Mind'],
  Blood:  ['Breath', 'Void',   'Light',  'Breath'],
  Time:   ['Space',  'Rage',   'Hope',   'Rage'],
  Rage:   ['Hope',   'Time',   'Space',  'Time'],
  Breath: ['Blood',  'Light',  'Void',   'Blood'],
  Mind:   ['Heart',  'Life',   'Doom',   'Heart'],
  Life:   ['Doom',   'Mind',   'Heart',  'Doom'],
  Light:  ['Void',   'Breath', 'Blood',  'Void'],
  Hope:   ['Rage',   'Space',  'Time',   'Space']
};

// G.4 leadership scale. Implicit = positive, Explicit = negative;
// rank 1 strongest on each side. Score = class_lead + 2·aspect_lead.
const CLASS_LEAD = {
  Muse:   +7, Heir:   +6, Rogue: +5, Mage:   +4, Maid:   +3, Page:   +2, Bard: +1,
  Witch:  -1, Knight: -2, Seer:  -3, Sylph:  -4, Thief:  -5, Prince: -6, Lord: -7
};
const ASPECT_LEAD = {
  Breath: +6, Void:   +5, Space: +4, Hope:   +3, Doom:   +2, Heart:  +1,
  Mind:   -1, Light:  -2, Time:  -3, Rage:   -4, Life:   -5, Blood:  -6
};

/* =====================================================================
   GRID OVERLAY COLORMAPS  (Wave 11a — under-the-grid value washes)
   Two diverging colormaps, one for each theme polarity:
     · Vanimo (dark theme): deep purple at -1 → near-black center →
       bright yellow at +1. Designed to read on the #0d0d0d grid bg.
     · PuY    (light theme): saturated purple at -1 → WHITE center →
       saturated yellow at +1. For the main Classpect Connector when
       it's in light mode (planned trickle-back per moreinstructions).
   Both colormaps are 5-stop piecewise-linear over t ∈ [-1, 1] and
   normalize so 0 = "neutral / no signal" sits at the visual center.

   Used by Wave 11a's grid-tint overlays:
     · Sum value:  t = (classVal + aspectVal) / 13   (range -13..+13)
     · Leadership: t = (cLead + 2·aLead) / 19         (range -19..+19)
   ===================================================================== */
function _lerp1(a, b, t) { return Math.round(a + (b - a) * t); }
function _hex2(n) { return n.toString(16).padStart(2, '0'); }
function _lerpStops(stops, t) {
  if (t <= stops[0].t) return stops[0];
  if (t >= stops[stops.length - 1].t) return stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i], b = stops[i + 1];
    if (t >= a.t && t <= b.t) {
      const f = (t - a.t) / (b.t - a.t);
      return { r: _lerp1(a.r, b.r, f), g: _lerp1(a.g, b.g, f), b: _lerp1(a.b, b.b, f) };
    }
  }
  return stops[stops.length - 1];
}
function _toHex(rgb) { return `#${_hex2(rgb.r)}${_hex2(rgb.g)}${_hex2(rgb.b)}`; }

const VANIMO_STOPS = [
  { t: -1.0, r:  20, g:   2, b:  80 },  // deep purple
  { t: -0.5, r: 120, g:  44, b: 146 },  // bright purple
  { t:  0.0, r:  22, g:  10, b:  30 },  // near-black center
  { t:  0.5, r: 220, g: 180, b: 100 },  // amber
  { t:  1.0, r: 250, g: 240, b: 110 },  // bright yellow
];

const PUY_STOPS = [
  { t: -1.0, r: 102, g:  20, b: 130 },  // saturated purple
  { t: -0.5, r: 184, g: 122, b: 204 },  // lavender
  { t:  0.0, r: 250, g: 250, b: 250 },  // white center
  { t:  0.5, r: 240, g: 220, b: 120 },  // pale yellow
  { t:  1.0, r: 230, g: 188, b:  30 },  // saturated yellow
];

/** Vanimo colormap (dark theme). t ∈ [-1, 1]. */
function vanimoColor(t) { return _toHex(_lerpStops(VANIMO_STOPS, t)); }
/** PuY colormap (light theme). t ∈ [-1, 1]. */
function puyColor(t) { return _toHex(_lerpStops(PUY_STOPS, t)); }

/* Per-classpect-value leadership lookups: indexed by integer value
   (-7..-1, 1..7 for class; -6..-1, 1..6 for aspect) so per-cell
   overlay loops can fetch the lead score without a name lookup.
   Wave 11g: explicit 0 entries (CLASS_LEAD_BY_VAL[0] = 0, same for
   aspect) so the overlay can be drawn along the 0 axes for visual
   continuity. The origin's leadership is then 0 + 2·0 = 0 (the
   neutral midpoint of the colormap), matching the user's spec. */
const CLASS_LEAD_BY_VAL = { 0: 0 };
Object.entries(classesNumeric).forEach(([name, val]) => {
  CLASS_LEAD_BY_VAL[val] = CLASS_LEAD[name];
});
const ASPECT_LEAD_BY_VAL = { 0: 0 };
Object.entries(aspectsNumeric).forEach(([name, val]) => {
  ASPECT_LEAD_BY_VAL[val] = ASPECT_LEAD[name];
});
