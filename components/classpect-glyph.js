/* =========================================================================
   CLASSPECT GLYPH — Scryer copy.
   Structurally identical to the Connector's classpect-glyph.js.

   Layers, z-order top to bottom:
     1. Disc (colored CSS circle, aspect BG color)
     2. Aspect symbol (aspects/no-bg/*.svg centered on the disc)
     3. Rotating ring group:
          a. Ring fill (classes/rings/*.svg, colored via mask-image)
          b. Ring stroke overlay (only when outline mode is on)
     4. Substance layer (top-arc text, bottom-arc icons, side labels)

   Rotation timing mirrors Python tool:
     0.3125° per frame at 24 fps = 7.5°/sec per unit of |class-sign|
       Sylph/Maid (|sign|=1) → 48 sec/rev
       Lord/Muse  (|sign|=7) → ~6.9 sec/rev
   Direction: active classes clockwise, passive counterclockwise.

   Assets expected at:
     ./images/classes/rings/{class}.svg           — ring silhouette
     ./images/aspects/no-bg/{aspect}.svg          — aspect symbol
     ./images/playericons-deco/*.png              — bottom-arc crown icons

   Requires: session-constants.js (classesNumeric, aspectsNumeric)
             settings.js          (ScryerSettings, scryer-setting-change)
   ========================================================================= */

/* Ring color per aspect, */
const RING_COLORS = {
  breath: '#47dff9', blood:  '#ba1016', doom:  '#306800', heart:  '#bd1864',
  hope:   '#fdfdfd', life:   '#72eb34', light: '#f6fa4e', mind:   '#06ffc9',
  rage:   '#9c4dad', space:  '#ffffff', time:  '#ff2106', void:   '#104ea2',
};

/* Aspect BG color. */
const BG_COLORS = {
  breath: '#4379e6', blood:  '#3e1601', doom:  '#306800', heart:  '#55142a',
  hope:   '#ffde55', life:   '#a49787', light: '#f0840c', mind:   '#00923d',
  rage:   '#520c61', space:  '#000000', time:  '#b70d0e', void:   '#104ea2',
};

/* Aspect FG color. */
const FG_COLORS = {
  breath: '#47dff9', blood:  '#ba1016', doom:  '#000000', heart:  '#bd1864',
  hope:   '#fdfdfd', life:   '#72eb34', light: '#f6fa4e', mind:   '#06ffc9',
  rage:   '#9c4dad', space:  '#ffffff', time:  '#ff2106', void:   '#001957',
};

/* Signed class value. Same table as the Connector uses. */
const GLYPH_CLASS_SIGN = {
  Lord:  -7, Witch: -6, Prince: -5, Thief: -4,
  Knight:-3, Mage:  -2, Sylph:  -1, Maid:   1,
  Seer:   2, Page:   3, Rogue:   4, Bard:   5,
  Heir:   6, Muse:   7,
};

/* Grayscale endpoints — Lord/Muse are the darkest/lightest. */
const GS_LORD_DARK  = '#3F3F3F';
const GS_MUSE_LIGHT = '#929292';

/* Outline stroke color per lunar sway. */
const OUTLINE_COLORS = {
  prospit: '#ffff01',
  derse:   '#ff01fe',
  neutral: '#808080',
};

/* Gradient inner-darken factor. */
const GRADIENT_DARKEN = 0.85;

/* Hex color helpers. */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHex(r, g, b) {
  const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return '#' + c(r) + c(g) + c(b);
}
function darkenHex(hex, factor) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - factor), g * (1 - factor), b * (1 - factor));
}
function interpHex(a, b, t) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t);
}

/* Resolve the ring color for a (mode, class, aspect) tuple. */
function resolveRingColor(mode, className, aspectName) {
  const asp = aspectName.toLowerCase();
  const cls = className;

  if (mode === 'canonical') return { kind: 'solid', color: RING_COLORS[asp] };
  if (mode === 'background') {
    if (asp === 'space') return { kind: 'solid', color: '#ffffff' };
    return { kind: 'solid', color: BG_COLORS[asp] };
  }
  if (mode === 'grayscale') {
    const sign = GLYPH_CLASS_SIGN[cls] || 0;
    const t = (sign - (-7)) / 14;
    return { kind: 'solid', color: interpHex(GS_LORD_DARK, GS_MUSE_LIGHT, t) };
  }
  if (mode === 'gradient') {
    let bright = FG_COLORS[asp];
    const [r, g, b] = hexToRgb(bright);
    if (r + g + b < 90) bright = RING_COLORS[asp];
    const dark = darkenHex(bright, GRADIENT_DARKEN);
    return { kind: 'gradient', inner: dark, outer: bright };
  }
  return { kind: 'solid', color: RING_COLORS[asp] };
}

/* Resolve outline mode + character list into a stroke color (or null).
   For 'automatic', first canon character's lunar sway wins. Scryer
   members always have a lunarsway. */
function resolveOutlineColor(mode, canonChars, nonCanonChars) {
  if (mode === 'none' || !mode) return null;
  if (mode === 'automatic') {
    const SWAY_TO_KEY = { prospit: 'prospit', derse: 'derse', dual: 'neutral' };
    const pickKey = (list) => {
      if (!list) return null;
      for (const ch of list) {
        if (ch && ch.lunarsway) {
          const key = SWAY_TO_KEY[ch.lunarsway.toLowerCase()];
          if (key) return key;
        }
      }
      return null;
    };
    const key = pickKey(canonChars) || pickKey(nonCanonChars);
    return key ? OUTLINE_COLORS[key] : null;
  }
  return OUTLINE_COLORS[mode] || null;
}

const DISC_OVERSHOOT = 1.05;
const DISC_INSET     = 0.92;

const aspectAssetCache  = {};
const ringGeometryCache = {};
const ringSvgTextCache  = {};
const ringStrokeCache   = {};

async function fetchRingSvgText(className) {
  if (ringSvgTextCache[className]) return ringSvgTextCache[className];
  const resp = await fetch(`./images/classes/rings/${className}.svg`);
  const text = await resp.text();
  ringSvgTextCache[className] = text;
  return text;
}

async function loadRingStrokeOverlay(className, outlineColor) {
  const key = `${className}|${outlineColor}`;
  if (ringStrokeCache[key]) return ringStrokeCache[key];

  const text = await fetchRingSvgText(className);
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svgEl = doc.documentElement;
  svgEl.querySelectorAll('style').forEach((s) => s.remove());

  const SHAPE_SEL = 'path, ellipse, circle, rect, polygon, polyline, line';
  const shapes = Array.from(svgEl.querySelectorAll(SHAPE_SEL));

  const holder = document.createElement('div');
  holder.style.cssText = 'position:absolute;left:-99999px;top:-99999px;visibility:hidden;pointer-events:none;';
  holder.appendChild(svgEl);
  document.body.appendChild(holder);

  const bboxes = shapes.map((s) => {
    try { return s.getBBox(); } catch { return { width: 0, height: 0 }; }
  });
  const maxExtent = bboxes.reduce((m, b) => Math.max(m, b.width, b.height), 0);
  // Only drop truly negligible shapes.
  const KEEP_THRESHOLD = 0.02;

  const SUBPATH_EXTENT_THRESHOLD = 0.005;
  const SUBPATH_AREA_THRESHOLD   = 0.0001;
  const maxArea = maxExtent * maxExtent;

  const scratchPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgEl.appendChild(scratchPath);

  shapes.forEach((s, i) => {
    const b = bboxes[i];
    const extent = Math.max(b.width, b.height);
    if (extent < maxExtent * KEEP_THRESHOLD) { s.remove(); return; }
    s.removeAttribute('class');
    if (s.tagName === 'path') {
      const d = s.getAttribute('d');
      if (d) {
        const parts = d.match(/M[^M]*/g) || [d];
        if (parts.length > 1) {
          const kept = parts.filter((part) => {
            scratchPath.setAttribute('d', part);
            try {
              const bb = scratchPath.getBBox();
              const spExtent = Math.max(bb.width, bb.height);
              const spArea   = bb.width * bb.height;
              return spExtent >= maxExtent * SUBPATH_EXTENT_THRESHOLD
                  || spArea   >= maxArea   * SUBPATH_AREA_THRESHOLD;
            } catch {
              return true;
            }
          });
          s.setAttribute('d', kept.join(''));
        }
      }
    }
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', outlineColor);
    s.setAttribute('stroke-width', '1');
    s.setAttribute('vector-effect', 'non-scaling-stroke');
    s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('stroke-linecap',  'round');
  });

  svgEl.removeChild(scratchPath);
  document.body.removeChild(holder);

  const serialized = new XMLSerializer().serializeToString(svgEl);
  const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(serialized);
  const img = new Image();
  await new Promise((resolve) => {
    img.onload  = resolve;
    img.onerror = resolve;
    img.src = dataUrl;
  });

  const result = { dataUrl, img };
  ringStrokeCache[key] = result;
  return result;
}

async function rasterize(url, targetLongSide) {
  const img = new Image();
  try {
    await new Promise((resolve, reject) => {
      img.onload  = resolve;
      img.onerror = () => reject(new Error(`Failed to load ${url}`));
      img.src = url;
    });
  } catch (err) { console.error(err); return null; }
  // Preserve the source SVG's aspect ratio when rasterizing.
  const natW = img.naturalWidth  || targetLongSide;
  const natH = img.naturalHeight || targetLongSide;
  const scale = targetLongSide / Math.max(natW, natH);
  const w = Math.max(1, Math.round(natW * scale));
  const h = Math.max(1, Math.round(natH * scale));
  const canvas = document.createElement('canvas');
  canvas.width  = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  return { img, rgba: ctx.getImageData(0, 0, w, h).data, w, h, size: w };
}

function pixelBboxFraction(rgba, w, h, alphaThresh = 32) {
  // Both w and h required — the old single-`size` shim was masking a
  // bug where a numeric alpha threshold in the h slot truncated the
  // scan to 32 rows.
  let minX = w, maxX = -1, minY = h, maxY = -1;
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      if (rgba[(row + x) * 4 + 3] >= alphaThresh) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  return {
    xFrac: minX / w,
    yFrac: minY / h,
    wFrac: (maxX - minX + 1) / w,
    hFrac: (maxY - minY + 1) / h,
  };
}

async function loadRingGeometry(className) {
  if (ringGeometryCache[className]) return ringGeometryCache[className];
  const url = `./images/classes/rings/${className}.svg`;
  const raster = await rasterize(url, 400);
  if (!raster) return { outerFrac: 0.9, holeFrac: 0.46, holeCxFrac: 0.5, holeCyFrac: 0.5, img: null, url };

  const { rgba, size } = raster;
  const A = 32;
  // Rings are square-ish; pass size for both dims explicitly.
  const outerBbox = pixelBboxFraction(rgba, size, size, A);
  if (!outerBbox) return { outerFrac: 0.9, holeFrac: 0.46, holeCxFrac: 0.5, holeCyFrac: 0.5, img: raster.img, url };

  const outerCxFrac = outerBbox.xFrac + outerBbox.wFrac / 2;
  const outerCyFrac = outerBbox.yFrac + outerBbox.hFrac / 2;
  const outerFrac   = Math.max(outerBbox.wFrac, outerBbox.hFrac);

  const cxPx = Math.round(outerCxFrac * size);
  const cyPx = Math.round(outerCyFrac * size);
  const visited = new Uint8Array(size * size);
  const stack = [cyPx * size + cxPx];
  let hMinX = size, hMaxX = -1, hMinY = size, hMaxY = -1;
  const xMin = Math.floor(outerBbox.xFrac * size);
  const xMax = Math.ceil((outerBbox.xFrac + outerBbox.wFrac) * size);
  const yMin = Math.floor(outerBbox.yFrac * size);
  const yMax = Math.ceil((outerBbox.yFrac + outerBbox.hFrac) * size);
  while (stack.length) {
    const p = stack.pop();
    if (visited[p]) continue;
    visited[p] = 1;
    const x = p % size, y = (p - x) / size;
    if (x < xMin || x >= xMax || y < yMin || y >= yMax) continue;
    if (rgba[p * 4 + 3] >= A) continue;
    if (x < hMinX) hMinX = x;
    if (x > hMaxX) hMaxX = x;
    if (y < hMinY) hMinY = y;
    if (y > hMaxY) hMaxY = y;
    if (x + 1 < size) stack.push(p + 1);
    if (x - 1 >= 0)   stack.push(p - 1);
    if (y + 1 < size) stack.push(p + size);
    if (y - 1 >= 0)   stack.push(p - size);
  }

  const holeCxFrac = ((hMinX + hMaxX) / 2) / size;
  const holeCyFrac = ((hMinY + hMaxY) / 2) / size;
  const holeFrac = ((hMaxX - hMinX + 1) + (hMaxY - hMinY + 1)) / (4 * size);

  const result = {
    outerFrac, holeFrac, holeCxFrac, holeCyFrac,
    outerCxFrac, outerCyFrac, img: raster.img, url,
  };
  ringGeometryCache[className] = result;
  return result;
}

async function loadAspectBboxCropped(aspect) {
  if (aspectAssetCache[aspect]) return aspectAssetCache[aspect];
  const url = `./images/aspects/no-bg/${aspect}.svg`;
  const raster = await rasterize(url, 400);
  if (!raster) return null;
  // Pass the raster's actual W and H so fractions map 1:1 onto the
  // source's coordinate system regardless of browser aspect-ratio
  // handling during rasterization (see rasterize() comment above).
  const bboxFrac = pixelBboxFraction(raster.rgba, raster.w, raster.h);
  if (!bboxFrac) return null;

  const resp = await fetch(url);
  const svgText = await resp.text();
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  const svgEl = doc.documentElement;
  const vbAttr = svgEl.getAttribute('viewBox');
  let vbX = 0, vbY = 0, vbW = 100, vbH = 100;
  if (vbAttr) {
    const p = vbAttr.split(/[\s,]+/).map(Number);
    if (p.length === 4) [vbX, vbY, vbW, vbH] = p;
  } else {
    vbW = parseFloat(svgEl.getAttribute('width'))  || 100;
    vbH = parseFloat(svgEl.getAttribute('height')) || 100;
  }
  const cropX = vbX + bboxFrac.xFrac * vbW;
  const cropY = vbY + bboxFrac.yFrac * vbH;
  const cropW = bboxFrac.wFrac * vbW;
  const cropH = bboxFrac.hFrac * vbH;

  svgEl.setAttribute('viewBox', `${cropX} ${cropY} ${cropW} ${cropH}`);
  svgEl.removeAttribute('width');
  svgEl.removeAttribute('height');

  const serialized = new XMLSerializer().serializeToString(svgEl);
  const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(serialized);
  const finalImg = new Image();
  await new Promise((resolve) => {
    finalImg.onload  = resolve;
    finalImg.onerror = resolve;
    finalImg.src = dataUrl;
  });

  const result = { dataUrl, bboxW: cropW, bboxH: cropH, img: finalImg };
  aspectAssetCache[aspect] = result;
  return result;
}

const DEG_PER_SEC_PER_SIGN = 7.5;

/* Cache of base64 data-URLs for fonts we've inlined into exported
   SVGs. */
const embeddedFontCache = {};

async function loadEmbeddedFont(fontName, url) {
  if (embeddedFontCache[fontName]) return embeddedFontCache[fontName];
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Font fetch failed: ${resp.status}`);
    const blob = await resp.blob();
    const dataUrl = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload  = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
    embeddedFontCache[fontName] = dataUrl;
    return dataUrl;
  } catch (err) {
    console.error(`[classpect-glyph] failed to load embedded font ${fontName}:`, err);
    return null;
  }
}

if (typeof document !== 'undefined' && !document.getElementById('classpect-glyph-keyframes')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'classpect-glyph-keyframes';
  styleEl.textContent = `
    @keyframes classpect-glyph-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .classpect-glyph-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 14px; background: #f4f4f4;
      border: 1px solid rgba(0, 0, 0, 0.25); border-radius: 3px;
      color: #1a1a1a; font-family: 'Courier New', monospace;
      font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
      cursor: pointer; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
      transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s;
    }
    .classpect-glyph-btn:hover:not(:disabled) {
      background: #ffffff; border-color: rgba(0, 0, 0, 0.5);
      color: #000; box-shadow: 0 3px 10px rgba(109, 209, 244, 0.35);
    }
  `;
  document.head.appendChild(styleEl);
}


const ClasspectGlyph = React.forwardRef(({
  className, aspectName, theme, size = 240,
  ringMode:        ringModeProp,
  outlineMode:     outlineModeProp,
  canonCharacters,
  nonCanonCharacters,
  showButtons = true,
  animate = true,
  substance = null,
  // Externally-driven rotation angle (degrees).
  spinAngle = null,
  // Drops the dark card chrome (background, border, rounded corners,
  // padding) around the glyph so it renders as a bare ring + disc +
  // aspect symbol.
  frameless = false,
}, ref) => {
  const cls  = className.toLowerCase();
  const asp  = aspectName.toLowerCase();
  const sign = classesNumeric[className];
  const absSign = Math.abs(sign);
  const secPerTurn = 360 / (DEG_PER_SEC_PER_SIGN * absSign);

  const isActive = sign < 0;
  const direction = isActive ? 'normal' : 'reverse';

  // Subscribes to ScryerSettings (namespace 'scryer.setting.') and the
  // 'scryer-setting-change' broadcast event, not the Connector's.
  const [ringModeSetting,    setRingModeSetting]    = React.useState(() => ScryerSettings.get('glyphRingMode'));
  const [outlineModeSetting, setOutlineModeSetting] = React.useState(() => ScryerSettings.get('glyphOutlineMode'));
  React.useEffect(() => {
    const onChange = (ev) => {
      if (ev.detail?.name === 'glyphRingMode')    setRingModeSetting(ScryerSettings.get('glyphRingMode'));
      if (ev.detail?.name === 'glyphOutlineMode') setOutlineModeSetting(ScryerSettings.get('glyphOutlineMode'));
    };
    window.addEventListener('scryer-setting-change', onChange);
    return () => window.removeEventListener('scryer-setting-change', onChange);
  }, []);
  const ringMode    = ringModeProp    ?? ringModeSetting    ?? 'canonical';
  const outlineMode = outlineModeProp ?? outlineModeSetting ?? 'none';

  const ringPaint         = resolveRingColor(ringMode, className, aspectName);
  const glyphOutlineColor = resolveOutlineColor(outlineMode, canonCharacters, nonCanonCharacters);
  const bgColor           = BG_COLORS[asp] || '#000000';

  const BORDER    = frameless ? 0 : 2;
  const padding   = frameless ? 0 : Math.round(size * 0.09);
  const innerSize = size - 2 * padding - 2 * BORDER;

  const [ringGeom, setRingGeom] = React.useState(null);
  React.useEffect(() => {
    let cancelled = false;
    loadRingGeometry(cls).then((g) => { if (!cancelled) setRingGeom(g); });
    return () => { cancelled = true; };
  }, [cls]);

  const ringOuterFrac  = ringGeom?.outerFrac  ?? 0.9;
  const ringHoleFrac   = ringGeom?.holeFrac   ?? 0.46;
  const outerCxFrac    = ringGeom?.outerCxFrac ?? 0.5;
  const outerCyFrac    = ringGeom?.outerCyFrac ?? 0.5;
  const holeCxFrac     = ringGeom?.holeCxFrac  ?? 0.5;
  const holeCyFrac     = ringGeom?.holeCyFrac  ?? 0.5;

  const ringScale    = 1 / ringOuterFrac;
  const ringScalePct = (100 * ringScale).toFixed(2) + '%';
  const mxPct = ringScale > 1
    ? (100 * (outerCxFrac * ringScale - 0.5) / (ringScale - 1)).toFixed(2) + '%'
    : '50%';
  const myPct = ringScale > 1
    ? (100 * (outerCyFrac * ringScale - 0.5) / (ringScale - 1)).toFixed(2) + '%'
    : '50%';

  const holeSize = innerSize * (ringHoleFrac / ringOuterFrac) * 2;
  const discSize = Math.round(holeSize * DISC_OVERSHOOT);
  const discCxPx = innerSize * ((holeCxFrac - outerCxFrac) * ringScale + 0.5);
  const discCyPx = innerSize * ((holeCyFrac - outerCyFrac) * ringScale + 0.5);

  const ringMaskUrl = `./images/classes/rings/${cls}.svg`;
  const holeRadiusPct = (holeSize / innerSize) * 100;
  const ringBackground = ringPaint.kind === 'gradient'
    ? `radial-gradient(circle closest-side at 50% 50%, ${ringPaint.inner} ${holeRadiusPct.toFixed(2)}%, ${ringPaint.outer} 100%)`
    : ringPaint.color;

  // When `spinAngle` is a number, the physics loop is driving rotation
  // — use a plain transform and skip the CSS animation entirely.
  // Otherwise fall back to the canonical CSS spin (or nothing if
  // animate=false). `will-change: transform` hints the compositor to
  // keep the ring on its own layer when driven per-frame.
  const ringRotatorStyle = (typeof spinAngle === 'number')
    ? {
        position: 'absolute', inset: 0,
        transform: `rotate(${spinAngle}deg)`,
        willChange: 'transform',
        pointerEvents: 'none',
      }
    : {
        position: 'absolute', inset: 0,
        animation: animate ? `classpect-glyph-spin ${secPerTurn}s linear infinite` : 'none',
        animationDirection: direction, pointerEvents: 'none',
      };
  const ringStyle = {
    position: 'absolute', inset: 0, background: ringBackground,
    maskImage: `url(${ringMaskUrl})`, WebkitMaskImage: `url(${ringMaskUrl})`,
    maskSize: ringScalePct, WebkitMaskSize: ringScalePct,
    maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
    maskPosition: `${mxPct} ${myPct}`, WebkitMaskPosition: `${mxPct} ${myPct}`,
    pointerEvents: 'none',
  };

  const [ringStroke, setRingStroke] = React.useState(null);
  React.useEffect(() => {
    if (!glyphOutlineColor) { setRingStroke(null); return; }
    let cancelled = false;
    loadRingStrokeOverlay(cls, glyphOutlineColor).then((s) => { if (!cancelled) setRingStroke(s); });
    return () => { cancelled = true; };
  }, [cls, glyphOutlineColor]);

  const strokeOverlayWrapperStyle = {
    position: 'absolute', inset: 0,
    transform: `scale(${ringScale})`,
    transformOrigin: `${(outerCxFrac * 100).toFixed(2)}% ${(outerCyFrac * 100).toFixed(2)}%`,
    pointerEvents: 'none',
  };
  const strokeOverlayImgStyle = { display: 'block', width: '100%', height: '100%' };
  const boxBorderColor = theme?.accentBg || '#a0a0a0';

  const glyphInnerRef = React.useRef(null);
  const [copied, setCopied]         = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);

  const [aspectAsset, setAspectAsset] = React.useState(null);
  React.useEffect(() => {
    let cancelled = false;
    loadAspectBboxCropped(asp).then((asset) => { if (!cancelled) setAspectAsset(asset); });
    return () => { cancelled = true; };
  }, [asp]);

  let aspectRenderW = 0, aspectRenderH = 0;
  if (aspectAsset) {
    const { bboxW, bboxH } = aspectAsset;
    const bboxDiag = Math.sqrt(bboxW * bboxW + bboxH * bboxH);
    const scale = (holeSize * DISC_INSET) / bboxDiag;
    aspectRenderW = bboxW * scale;
    aspectRenderH = bboxH * scale;
  }

  // Compose the glyph — disc + aspect + ring + substance — into a
  // transparent-background PNG blob at the requested outputSize.
  const composeStaticPng = async (outputSize = innerSize * 2) => {
    if (!ringGeom || !aspectAsset) return null;

    const OUT     = outputSize;
    const scaleUp = OUT / innerSize;               // maps inner-glyph px → canvas px
    const canvas  = document.createElement('canvas');
    canvas.width  = OUT;
    canvas.height = OUT;
    const ctx = canvas.getContext('2d');
    // Canvas is transparent by default — no fill needed.

    const cs = (v) => v * scaleUp;

    // 1. Disc + optional outline stroke.
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(cs(discCxPx), cs(discCyPx), cs(discSize / 2), 0, Math.PI * 2);
    ctx.fill();
    if (glyphOutlineColor) {
      ctx.strokeStyle = glyphOutlineColor;
      ctx.lineWidth   = 1 * scaleUp;
      ctx.stroke();
    }

    // 2. Aspect symbol.
    if (aspectAsset.img && aspectAsset.img.complete) {
      const aw = cs(aspectRenderW);
      const ah = cs(aspectRenderH);
      ctx.drawImage(aspectAsset.img, cs(discCxPx) - aw / 2, cs(discCyPx) - ah / 2, aw, ah);
    }

    // 3. Ring (mask + fill), tinted via scratch canvas + source-in.
    if (ringGeom.img) {
      const scratch = document.createElement('canvas');
      scratch.width  = OUT;
      scratch.height = OUT;
      const sctx = scratch.getContext('2d');
      const ringDrawSize = OUT * ringScale;
      const rx = OUT / 2 - outerCxFrac * ringDrawSize;
      const ry = OUT / 2 - outerCyFrac * ringDrawSize;
      sctx.drawImage(ringGeom.img, rx, ry, ringDrawSize, ringDrawSize);
      sctx.globalCompositeOperation = 'source-in';
      if (ringPaint.kind === 'gradient') {
        const grad = sctx.createRadialGradient(
          OUT / 2, OUT / 2, cs(holeSize / 2),
          OUT / 2, OUT / 2, OUT / 2,
        );
        grad.addColorStop(0, ringPaint.inner);
        grad.addColorStop(1, ringPaint.outer);
        sctx.fillStyle = grad;
      } else {
        sctx.fillStyle = ringPaint.color;
      }
      sctx.fillRect(0, 0, OUT, OUT);
      ctx.drawImage(scratch, 0, 0);

      // 4. Ring stroke overlay (only when outline mode is on).
      if (glyphOutlineColor && ringStroke?.img && ringStroke.img.complete) {
        ctx.drawImage(ringStroke.img, rx, ry, ringDrawSize, ringDrawSize);
      }
    }

    // 5. Substance layer.
    if (substance) {
      const substanceSvg = glyphInnerRef.current?.querySelector('svg[data-substance]');
      if (substanceSvg) {
        const clone = substanceSvg.cloneNode(true);

        const usesTypostuck = Array.from(clone.querySelectorAll('text')).some(
          (t) => ((t.getAttribute('style') || '') + (t.style?.fontFamily || ''))
                    .includes('Typostuck')
        );
        if (usesTypostuck) {
          const fontDataUrl = await loadEmbeddedFont('Typostuck', './fonts/TYPOSTUCK.ttf');
          if (fontDataUrl) {
            const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
            styleEl.textContent =
              `@font-face { font-family: 'Typostuck'; ` +
              `src: url('${fontDataUrl}') format('truetype'); }`;
            clone.insertBefore(styleEl, clone.firstChild);
          }
        }

        const imgs = Array.from(clone.querySelectorAll('image'));
        await Promise.all(imgs.map(async (img) => {
          const href = img.getAttribute('href') || img.getAttribute('xlink:href');
          if (!href || /^data:/.test(href)) return;
          try {
            const absUrl = new URL(href, document.baseURI).href;
            const resp = await fetch(absUrl);
            const blob = await resp.blob();
            const dataUrl = await new Promise((resolve, reject) => {
              const r = new FileReader();
              r.onload  = () => resolve(r.result);
              r.onerror = reject;
              r.readAsDataURL(blob);
            });
            img.setAttribute('href', dataUrl);
            img.removeAttribute('xlink:href');
          } catch (err) {
            console.error(`Failed to inline substance image ${href}:`, err);
          }
        }));
        const svgString = new XMLSerializer().serializeToString(clone);
        const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
        const subImg = new Image();
        await new Promise((resolve) => {
          subImg.onload  = resolve;
          subImg.onerror = resolve;
          subImg.src = dataUrl;
        });
        if (subImg.complete && subImg.naturalWidth > 0) {
          ctx.drawImage(subImg, 0, 0, OUT, OUT);
        }
      }
    }

    return await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  };

  const handleDownload = async () => {
    const blob = await composeStaticPng();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cls}-of-${asp}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1200);
  };

  const handleCopy = async () => {
    const blob = await composeStaticPng();
    if (!blob) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      alert('Copy failed — your browser may not support image clipboard writes. Try the Download button instead.');
      console.error(err);
    }
  };

  // Imperative handle — lets parent components (e.g. the Scryer's
  // gallery zip-download flow) trigger PNG composition on any glyph
  // instance.
  React.useImperativeHandle(ref, () => ({
    composeStaticPng: (outputSize) => composeStaticPng(outputSize),
    isReady:          () => Boolean(ringGeom && aspectAsset),
  }));

  const substanceUid = React.useId();
  const substanceLayer = (substance && ringGeom) ? (() => {
    const cx = discCxPx;
    const cy = discCyPx;
    const discR  = discSize / 2;
    const outerR = innerSize / 2;
    const bandThickness = Math.max(4, outerR - discR);
    const subBand = bandThickness / 7;
    const arcR    = discR + subBand / 2;
    const fontPx  = Math.max(5, subBand * 0.9);
    const iconPx  = Math.max(6, subBand);
    
    const font    = substance.fontFamily || "'Courier New', 'Courier', monospace";
    const color   = substance.color || '#ffffff';
    const stroke  = '#121314';
    const strokeW = Math.max(1, fontPx * 0.14);

    const pt = (deg) => {
      const r = deg * Math.PI / 180;
      return [cx + arcR * Math.cos(r), cy - arcR * Math.sin(r)];
    };

    // Three half-circle arc paths — one each for top, left, right.
    // Each arc's endpoints are diametrically opposite.
    const arcAt = (ax, ay, bx, by, sweep) =>
      `M ${ax.toFixed(2)},${ay.toFixed(2)} ` +
      `A ${arcR.toFixed(2)},${arcR.toFixed(2)} 0 0 ${sweep} ` +
      `${bx.toFixed(2)},${by.toFixed(2)}`;

    const topArcD   = arcAt(cx - arcR, cy,        cx + arcR, cy,        1); // 9→3 via 12 (CW, reads L→R)
    // Left arc: start at 6, end at 12, sweep-flag=1 to route via 9
    // (the left side). Path direction is UP the left side; default
    // textPath placement puts characters on the OUTER side of the
    // curve so their tops face away from center — matches the right
    // arc's outward orientation. Reading order is bottom-to-top on
    // the left, top-to-bottom on the right — the classic seal
    // "wrapped-around" look where text flows continuously from
    // bottom-left, up and over the top, then down the right.
    const leftArcD  = arcAt(cx,        cy + arcR, cx,        cy - arcR, 1); // 6→12 via 9  (CW,  reads B→T)
    const rightArcD = arcAt(cx,        cy - arcR, cx,        cy + arcR, 1); // 12→6 via 3  (CW,  reads T→B)

    const bottomIcons = substance.bottomIcons || [];

    const arcTextStyle = {
      fontFamily:    font,
      fontSize:      `${fontPx}px`,
      fontWeight:    'bold',
      fill:          color,
      stroke:        stroke,
      strokeWidth:   `${strokeW}px`,
      paintOrder:    'stroke fill',
      letterSpacing: '1px',
      dominantBaseline: 'central',
    };

    return (
      <svg
        style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
        viewBox={`0 0 ${innerSize} ${innerSize}`}
        xmlns="http://www.w3.org/2000/svg"
        data-substance="true"
      >
        <defs>
          <path id={`sub-top-${substanceUid}`}   d={topArcD}   fill="none"/>
          <path id={`sub-left-${substanceUid}`}  d={leftArcD}  fill="none"/>
          <path id={`sub-right-${substanceUid}`} d={rightArcD} fill="none"/>
        </defs>
        {substance.top && (
          <text style={arcTextStyle}>
            <textPath href={`#sub-top-${substanceUid}`} startOffset="50%" textAnchor="middle">
              {substance.top}
            </textPath>
          </text>
        )}
        {substance.left && (
          <text style={arcTextStyle}>
            {/* Left-arc path runs 6→12 (bottom-to-top). */}
            <textPath href={`#sub-left-${substanceUid}`} startOffset="50%" textAnchor="middle">
              {substance.left}
            </textPath>
          </text>
        )}
        {substance.right && (
          <text style={arcTextStyle}>
            <textPath href={`#sub-right-${substanceUid}`} startOffset="50%" textAnchor="middle">
              {substance.right}
            </textPath>
          </text>
        )}

        {/* Bottom-arc icons. */}
        {(() => {
          const ICON_SPACING_DEG = 22;
          const n = bottomIcons.length;
          const totalSpan = (n - 1) * ICON_SPACING_DEG;
          const firstAngle = 270 - totalSpan / 2;
          return bottomIcons.map((icon, i) => {
            const angleDeg = firstAngle + i * ICON_SPACING_DEG;
            const [ix, iy] = pt(angleDeg);
            const scale = icon.scale || 1;
            if (icon.kind === 'image') {
              const s = (icon.size || iconPx) * scale;
              const iconOutline =
                'drop-shadow(1px 0 0 #000)'  +
                ' drop-shadow(-1px 0 0 #000)' +
                ' drop-shadow(0 1px 0 #000)'  +
                ' drop-shadow(0 -1px 0 #000)';
              return (
                <image key={i} href={icon.src}
                       x={ix - s / 2} y={iy - s / 2}
                       width={s} height={s}
                       preserveAspectRatio="xMidYMid meet"
                       style={{filter: iconOutline}}/>
              );
            }
            if (icon.kind === 'text') {
              return (
                <text key={i} x={ix} y={iy} dy="0.35em"
                      textAnchor="middle"
                      style={{
                        fontFamily: font, fontSize: `${fontPx * 1.35 * scale}px`,
                        fontWeight: 'bold', fill: icon.color || color,
                        stroke: stroke, strokeWidth: `${strokeW}px`,
                        paintOrder: 'stroke fill',
                      }}>
                  {icon.char}
                </text>
              );
            }
            return null;
          });
        })()}
      </svg>
    );
  })() : null;

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flexShrink: 0}}>
      <div
        style={{
          width:  `${size}px`, height: `${size}px`,
          // Chrome (dark bg + border + rounded corners + padding) is
          // suppressed when frameless is set.
          background: frameless ? 'transparent' : '#121314',
          border:     frameless ? 'none' : `${BORDER}px solid ${boxBorderColor}`,
          borderRadius: frameless ? 0 : '12px',
          position: 'relative',
          overflow: frameless ? 'visible' : 'hidden',
          padding: `${padding}px`, boxSizing: 'border-box',
        }}
      >
        <div ref={glyphInnerRef} style={{position: 'relative', width: '100%', height: '100%'}}>
          {ringGeom && (
            <div
              style={{
                position: 'absolute',
                top:  `${discCyPx - discSize / 2 - (glyphOutlineColor ? 1 : 0)}px`,
                left: `${discCxPx - discSize / 2 - (glyphOutlineColor ? 1 : 0)}px`,
                width:  `${discSize + (glyphOutlineColor ? 2 : 0)}px`,
                height: `${discSize + (glyphOutlineColor ? 2 : 0)}px`,
                borderRadius: '50%', background: bgColor, boxSizing: 'border-box',
                border: glyphOutlineColor ? `1px solid ${glyphOutlineColor}` : 'none',
              }}
            />
          )}
          {aspectAsset && ringGeom && (
            <img src={aspectAsset.dataUrl} alt=""
                 style={{
                   position: 'absolute',
                   top:  `${discCyPx - aspectRenderH / 2}px`,
                   left: `${discCxPx - aspectRenderW / 2}px`,
                   width:  `${aspectRenderW}px`, height: `${aspectRenderH}px`,
                   pointerEvents: 'none',
                 }}/>
          )}
          <div style={ringRotatorStyle}>
            <div style={ringStyle}/>
            {ringStroke && (
              <div style={strokeOverlayWrapperStyle}>
                <img src={ringStroke.dataUrl} alt="" style={strokeOverlayImgStyle}/>
              </div>
            )}
          </div>
          {substanceLayer}
        </div>
      </div>

      {showButtons && (
        <div style={{display: 'flex', gap: '10px'}}>
          <button className="classpect-glyph-btn" onClick={handleCopy} title="Copy static PNG to clipboard">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="9" y="2" width="6" height="4" rx="1"/>
              <path d="M8 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2"/>
            </svg>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button className="classpect-glyph-btn" onClick={handleDownload} title="Download static PNG">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v10m0 0l-4-4m4 4l4-4" strokeLinecap="round"/>
              <path d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" strokeLinecap="round"/>
            </svg>
            {downloaded ? '✓ Saved' : 'Save PNG'}
          </button>
        </div>
      )}
    </div>
  );
});
