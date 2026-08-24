/* =========================================================================
   SCRYER SITEWIDE SETTINGS
   Thin wrapper over localStorage. Mirror of the Connector's settings.js
   but scoped to a 'scryer.setting.<name>' namespace so the two sites
   can hold independent user preferences.

   Get(name) returns the stored value or the registry default. Set(name, v)
   validates and persists, then dispatches 'scryer-setting-change' so React
   consumers can re-render.
   ========================================================================= */

const SCRYER_SETTING_NS = 'scryer.setting.';

const SCRYER_SETTINGS_REGISTRY = {
  /* Sitewide polarity — sign convention for classes + aspects.
     Display-only: flips the sign of every value shown to the user
     (graph axis labels, glyph substance stats, ScryCard scores, …)
     while leaving the underlying leadership / distance / rank math
     completely unchanged.
       Huss (default): + = Active / Explicit, − = Passive / Implicit
       Cal:            − = Active / Explicit, + = Passive / Implicit
     Cal was the site's original convention (named for Calliope);
     Huss matches Hussie's canonical chart. */
  polarityMode: {
    kind:        'enum',
    default:     'huss',
    values:      ['huss', 'cal'],
    valueLabels: { huss: 'Huss', cal: 'Cal' },
    label:       'Polarity',
    description: "Huss: + = Active / Explicit. Cal: − = Active / Explicit.",
  },

  graphXAxisLabels: {
    kind:        'enum',
    default:     'text',
    values:      ['text', 'icon'],
    valueLabels: { text: 'Text', icon: 'Icon' },
    label:       'X-axis labels',
    description: "Text abbreviations (Ld, Wi, …) or class-icon tiles.",
  },
  graphYAxisLabels: {
    kind:        'enum',
    default:     'icon',
    values:      ['text', 'icon'],
    valueLabels: { text: 'Text', icon: 'Icon' },
    label:       'Y-axis labels',
    description: "Text abbreviations (SPC, VD, …) or aspect symbols.",
  },

  /* Glyph Gallery — Style subsection. */
  glyphRingMode: {
    kind:        'enum',
    default:     'canonical',
    values:      ['canonical', 'background', 'gradient', 'grayscale'],
    valueLabels: {
      canonical:  'Canonical',
      background: 'Background',
      gradient:   'Gradient',
      grayscale:  'Grayscale',
    },
    label:       'Ring color',
    description: "How the class ring is colored.",
  },
  glyphOutlineMode: {
    kind:        'enum',
    default:     'automatic',
    values:      ['automatic', 'none'],
    valueLabels: { automatic: 'Auto', none: 'Off' },
    label:       'Outline',
    description: "Lunar-sway stroke on the ring & disc edges.",
  },
  substanceFont: {
    kind:        'enum',
    default:     'courier',
    values:      ['courier', 'garamond', 'typostuck'],
    valueLabels: { courier: 'Regular', garamond: 'Fancy', typostuck: 'Retro' },
    // Per-option font styling so the picker previews the choice.
    valueStyles: {
      courier:   { fontFamily: "'Courier New', 'Courier', monospace",         textTransform: 'none' },
      garamond:  { fontFamily: "'Garamond', 'EB Garamond', 'Georgia', serif", textTransform: 'none' },
      typostuck: { fontFamily: "'Typostuck', 'Courier New', monospace",       textTransform: 'none' },
    },
    label:       'Text font',
    description: "Typostuck is embedded in exported PNGs.",
  },

  /* Glyph Gallery — Substance subsection. Text + icons overlaid on
     the glyph's clear band. Each zone toggles independently. */
  substanceTop: {
    kind:        'enum',
    default:     'name',
    values:      ['name', 'classpect', 'none'],
    valueLabels: { name: 'Name', classpect: 'Classpect', none: 'Off' },
    label:       'Top arc',
    description: "Name falls back to classpect for anonymous members.",
  },
  substanceLeft: {
    kind:        'bool',
    default:     true,
    label:       'Left arc',
    description: "Leadership value + rank.",
  },
  substanceRight: {
    kind:        'bool',
    default:     true,
    label:       'Right arc',
    description: "Classpect value + rung number.",
  },
  substanceBottom: {
    kind:        'bool',
    default:     true,
    label:       'Bottom arc',
    description: "Icon row — crowns, ∃!, ⋂, chevrons.",
  },
};

function _scryerKey(name) {
  return SCRYER_SETTING_NS + name;
}

const ScryerSettings = {
  registry: SCRYER_SETTINGS_REGISTRY,

  get(name) {
    const spec = SCRYER_SETTINGS_REGISTRY[name];
    if (!spec) {
      console.warn(`[scryer-settings] unknown setting: ${name}`);
      return undefined;
    }
    let stored;
    try {
      stored = window.localStorage.getItem(_scryerKey(name));
    } catch (_) {
      return spec.default;
    }
    if (stored === null) return spec.default;

    if (spec.kind === 'enum') {
      return spec.values.includes(stored) ? stored : spec.default;
    }
    if (spec.kind === 'bool') {
      if (stored === 'true')  return true;
      if (stored === 'false') return false;
      return spec.default;
    }
    return spec.default;
  },

  set(name, value) {
    const spec = SCRYER_SETTINGS_REGISTRY[name];
    if (!spec) {
      console.warn(`[scryer-settings] unknown setting: ${name}`);
      return;
    }
    if (spec.kind === 'enum' && !spec.values.includes(value)) {
      console.warn(`[scryer-settings] invalid value for ${name}: ${value} (allowed: ${spec.values.join(', ')})`);
      return;
    }
    if (spec.kind === 'bool' && typeof value !== 'boolean') {
      console.warn(`[scryer-settings] ${name} requires boolean, got ${typeof value}`);
      return;
    }
    const stored = spec.kind === 'bool' ? String(value) : value;
    try {
      window.localStorage.setItem(_scryerKey(name), stored);
    } catch (_) { /* storage disabled — best-effort */ }
    try {
      window.dispatchEvent(new CustomEvent('scryer-setting-change', {
        detail: { name, value },
      }));
    } catch (_) { /* ignore */ }
  },

  reset(name) {
    try {
      window.localStorage.removeItem(_scryerKey(name));
    } catch (_) { /* ignore */ }
    try {
      const spec = SCRYER_SETTINGS_REGISTRY[name];
      window.dispatchEvent(new CustomEvent('scryer-setting-change', {
        detail: { name, value: spec ? spec.default : undefined },
      }));
    } catch (_) { /* ignore */ }
  },
};

if (typeof window !== 'undefined') {
  window.ScryerSettings = ScryerSettings;
}
