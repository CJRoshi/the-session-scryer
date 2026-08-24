/* =========================================================================
   SESSION GRID
   Shared classpect-space visualization (SVG). Renders the 14-class ×
   12-aspect lattice with axis labels, player markers, and a flexible
   `overlays` system for stats to draw on top.

   Accepts an `overlays` array. Kinds:
     { kind: 'point',    x, y, color?, radius?, shape?: 'diamond'|'x'|'square' }
     { kind: 'marker',   class, aspect, color?, dash?: boolean, width? }
     { kind: 'glyph',    class, aspect, text, color?, dx?, dy?, fontSize?, fontFamily?, fontWeight? }
     { kind: 'nexus',    color? }
     { kind: 'line',     x1, y1, x2, y2, color?, dash?: boolean }
     { kind: 'glow-line', x1, y1, x2, y2, color?, width?, midWidth?, glowWidth? }
     { kind: 'polygon',  points: [[x,y],...], color?, fill?, opacity?, width?, dash? }
     { kind: 'circle',   cx, cy, r, color?, dash?, fill?, fillOpacity?, opacity?, width?, clip? }
     { kind: 'annulus',  cx, cy, rInner, rOuter, color?, opacity?, clip? }
     { kind: 'crown',    class, aspect, color?, stroke?, tone?: 'implicit'|'explicit' }
     { kind: 'moon-marker',     x, y, side: 'prospit'|'derse', size?, pixelOffsetY? }
     { kind: 'chevron',         class, aspect, side: 'prospit'|'derse', width?, height? }
     { kind: 'session-center',  class, aspect, size? }
   Coordinates are classpect-space (class val, aspect val), not pixels.
   `clip: 'grid'` clips the overlay to the integer-grid rectangle so it
   doesn't bleed past the labels. `focusMoon`: when set ('Prospit' |
   'Derse'), player dots not on that moon (and not Dual) are rendered
   at low opacity.

   Extracted from session-prototype/index.html in the LOC-reduction pass.
   ========================================================================= */

/* Per-aspect drop-shadow filter for the Y-axis label icons. Aspects
   not in this map render without any filter (their native colors are
   bright enough to read on the dark grid interior). Tuning notes:
     Doom  — anchor case, signed off by the user; keep as-is when
             touching other aspects. Heavy brightness boost because
             the icon is a near-black skull silhouette.
     Void  — heaviest brightness (2.8) + widest halo because the
             silhouette is the least distinctive against dark.
     Blood — NO brightness boost (saturated red already pops); just a
             white halo so the dark outline pixels read against the
             dark interior. Earlier brightness(1.9) tuning made the
             red glow neon-bright; halo-only matches the rest of the
             colored aspects.
     Rage  — halo-only like Blood, but DIMMER. Rage's icon already
             has high-contrast magenta highlights so a bright halo
             overcooks it; a tighter, fainter halo just sharpens the
             silhouette without bloating it.
   The drop-shadow is white in all cases so the halo reads as "lit
   from outside" rather than tinting the icon's own color. */
/* Phase C: two glow sets, picked at render time via the `glowMode` prop.
   - 'inside' (default): the Phase B v8.4 tuning, calibrated for the
     inside-ball results scene where the grid sits ON the pentagon's
     blue backdrop. Blood/Rage halos help those red/magenta icons
     pop against the saturated blue.
   - 'dark': used by the entry-view Graph mode, where the grid lives
     on a normal dark panel (#2a2a2a) and the Blood/Rage halos read
     as over-the-top neon. Only Doom and Void get the brightness
     boost they've always needed to stay visible on dark; Blood and
     Rage render with no filter, same as the rest of the aspects.
   - 'none': passthrough, no filters anywhere. Reserved for future
     uses (e.g. PNG export wanting maximally true colors). */

// Sharp 4-cardinal-direction white outline built from stacked 0-blur
// drop-shadows.
const SHARP_OUTLINE_WHITE =
  'drop-shadow(1px 0 0 rgba(255,255,255,1))' +
  ' drop-shadow(-1px 0 0 rgba(255,255,255,1))' +
  ' drop-shadow(0 1px 0 rgba(255,255,255,1))' +
  ' drop-shadow(0 -1px 0 rgba(255,255,255,1))';

// Glow strengths reduced across the board.
const ASPECT_GLOW_FILTERS_INSIDE = {
  'Doom':  `brightness(1.9) ${SHARP_OUTLINE_WHITE} drop-shadow(0 0 2px rgba(255,255,255,0.85)) drop-shadow(0 0 5px rgba(255,255,255,0.4))`,
  'Void':  `brightness(2.2) ${SHARP_OUTLINE_WHITE} drop-shadow(0 0 3px rgba(255,255,255,0.85)) drop-shadow(0 0 6px rgba(255,255,255,0.45))`,
  'Blood': `${SHARP_OUTLINE_WHITE} drop-shadow(0 0 2px rgba(255,255,255,0.5)) drop-shadow(0 0 4px rgba(255,255,255,0.25))`,
  'Rage':  `${SHARP_OUTLINE_WHITE} drop-shadow(0 0 1.5px rgba(255,255,255,0.35)) drop-shadow(0 0 3px rgba(255,255,255,0.15))`,
};
const ASPECT_GLOW_FILTERS_DARK = {
  'Doom':  `brightness(1.9) ${SHARP_OUTLINE_WHITE} drop-shadow(0 0 2px rgba(255,255,255,0.85)) drop-shadow(0 0 5px rgba(255,255,255,0.4))`,
  'Void':  `brightness(2.2) ${SHARP_OUTLINE_WHITE} drop-shadow(0 0 3px rgba(255,255,255,0.85)) drop-shadow(0 0 6px rgba(255,255,255,0.45))`,
};
function aspectGlowTable(mode) {
  if (mode === 'dark') return ASPECT_GLOW_FILTERS_DARK;
  if (mode === 'none') return null;
  return ASPECT_GLOW_FILTERS_INSIDE;
}

const SessionGrid = React.forwardRef(({ session, moonCursor, onToggle, onClear = null, overlays = [], focusMoon = null,
                       onPlayerHover = null, onPlayerClick = null,
                       hoveredPlayerIdx = null, pinnedPlayerIdx = null,
                       gridTint = null,
                       glowMode = 'inside',
                       
                       phantomMembers = [],
                       onPhantomClick = null,
                       pinnedPhantomIdx = null }, svgRef) => {
  const glowTable = aspectGlowTable(glowMode);
  const scale = 30, centerX = 280, centerY = 200;

  // Polarity — subscribe to sitewide sign convention.
  const [polarity, setPolarity] = React.useState(() => ScryerSettings.get('polarityMode'));
  React.useEffect(() => {
    const onChange = (ev) => {
      if (ev.detail?.name === 'polarityMode') setPolarity(ScryerSettings.get('polarityMode'));
    };
    window.addEventListener('scryer-setting-change', onChange);
    return () => window.removeEventListener('scryer-setting-change', onChange);
  }, []);
  const polar = v => (polarity === 'cal' ? v : -v);
  const toSvgX = v => centerX + polar(v) * scale;
  const toSvgY = v => centerY - polar(v) * scale;

  // Polarity-independent chrome anchors.
  const chromeLeftX   = centerX - 7 * scale;
  const chromeRightX  = centerX + 7 * scale;
  const chromeTopY    = centerY - 6 * scale;
  const chromeBottomY = centerY + 6 * scale;

  // Lookup map: "Class|Aspect" → aggregated cell info.
  const cellAt = useMemo(() => {
    const m = new Map();
    session.forEach((p, idx) => {
      const key = `${p.class}|${p.aspect}`;
      let cell = m.get(key);
      if (!cell) {
        cell = { members: [], prospit: 0, derse: 0, dual: 0, total: 0,
                 representative: { ...p, _idx: idx } };
        m.set(key, cell);
      }
      cell.members.push({ ...p, _idx: idx });
      cell.total += 1;
      if (p.moon === 'Prospit') cell.prospit += 1;
      else if (p.moon === 'Derse') cell.derse += 1;
      else cell.dual += 1;
    });
    // Pick the icon moon: pure if everyone shares one moon, otherwise
    // Dual (the "mix" indicator). Single-member cells fall through to
    // their member's moon naturally.
    for (const cell of m.values()) {
      if (cell.total === cell.prospit) cell.iconMoon = 'Prospit';
      else if (cell.total === cell.derse) cell.iconMoon = 'Derse';
      else if (cell.total === cell.dual) cell.iconMoon = 'Dual';
      else cell.iconMoon = 'Dual';  // any mix → Dual
    }
    return m;
  }, [session]);

  const [hover, setHover] = useState(null);

  // Aspects whose icon failed to load — fall back to text abbreviation.
  // Mirrors the pattern used in components/rotation-graph.js so missing
  // assets don't leave us with a blank Y-axis.
  const [failedAspectImages, setFailedAspectImages] = useState(() => new Set());

  // Sitewide axis-label preference
  const [xLabelStyle, setXLabelStyle] = useState(
    () => (typeof ScryerSettings !== 'undefined' ? ScryerSettings.get('graphXAxisLabels') : 'text')
  );
  const [yLabelStyle, setYLabelStyle] = useState(
    () => (typeof ScryerSettings !== 'undefined' ? ScryerSettings.get('graphYAxisLabels') : 'icon')
  );
  useEffect(() => {
    const onChange = (e) => {
      if (!e.detail || typeof ScryerSettings === 'undefined') return;
      if (e.detail.name === 'graphXAxisLabels') setXLabelStyle(ScryerSettings.get('graphXAxisLabels'));
      if (e.detail.name === 'graphYAxisLabels') setYLabelStyle(ScryerSettings.get('graphYAxisLabels'));
    };
    window.addEventListener('scryer-setting-change', onChange);
    return () => window.removeEventListener('scryer-setting-change', onChange);
  }, []);

  return (
    <div className="overflow-x-auto">
      {/* viewBox padded 16px top/bottom beyond the integer grid (which spans
          y=20..380 in svg coords) so doodads attached to edge cells —
          crowns sitting -17px above row +6, chevrons sitting +14px below
          row -6 — render fully without clipping at the SVG border. */}
      <svg ref={svgRef} viewBox="0 -16 550 462" style={{ background: 'transparent', maxWidth: '100%', height: 'auto', display: 'block' }}>
        <rect x={chromeLeftX} y={chromeTopY}
              width={14 * scale} height={12 * scale}
              fill="#0d0d0d" stroke="none"/>
        {/* Clip rect = the integer grid (-7..7 class × -6..6 aspect).
            Used by overlays that may overflow it (rung circles, band
            annuli) so they stay inside the grid box. */}
        <defs>
          <clipPath id="gridClip">
            <rect x={chromeLeftX} y={chromeTopY}
                  width={14 * scale} height={12 * scale}/>
          </clipPath>
          <filter id="tintBlur" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="11"/>
          </filter>
        </defs>
        {gridTint && (
          <g clipPath="url(#gridClip)" opacity="0.30" pointerEvents="none">
            <g filter="url(#tintBlur)">
              {[-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7].flatMap(cv =>
                [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6].map(av => {
                  const color = gridTint(cv, av);
                  if (!color) return null;
                  const half = scale * 0.675;  // 1.35× cell, halved
                  return (
                    <rect key={`tint-${cv}-${av}`}
                          x={toSvgX(cv) - half}
                          y={toSvgY(av) - half}
                          width={half * 2} height={half * 2}
                          fill={color} stroke="none"/>
                  );
                })
              )}
            </g>
          </g>
        )}
        {/* grid lines */}
        {[-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7].map(v => (
          <line key={`v${v}`} x1={toSvgX(v)} y1={toSvgY(-6)} x2={toSvgX(v)} y2={toSvgY(6)} stroke="#444" strokeWidth="1"/>
        ))}
        {[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6].map(v => (
          <line key={`h${v}`} x1={toSvgX(-7)} y1={toSvgY(v)} x2={toSvgX(7)} y2={toSvgY(v)} stroke="#444" strokeWidth="1"/>
        ))}
        {/* axes */}
        <line x1={toSvgX(-7)} y1={toSvgY(0)} x2={toSvgX(7)}  y2={toSvgY(0)} stroke="#888" strokeWidth="2"/>
        <line x1={toSvgX(0)}  y1={toSvgY(-6)} x2={toSvgX(0)} y2={toSvgY(6)} stroke="#888" strokeWidth="2"/>

        {/* Y labels — aspect icons (matches rotation-graph.js pattern). */}
        {aspectOrder.map(asp => {
          const aspValue = aspectsNumeric[asp];
          const glowFilter = glowTable ? glowTable[asp] : null;
          const imgFailed = failedAspectImages.has(asp);
          const useIcon = yLabelStyle === 'icon' && !imgFailed;
          return (
            <g key={`y-label-${asp}`}>
              {useIcon ? (
                <image
                  href={`./images/aspects/no-bg/${asp.toLowerCase()}.svg`}
                  x={chromeLeftX - 34}
                  y={toSvgY(aspValue) - 12}
                  width="24"
                  height="24"
                  style={{ filter: glowFilter || 'none' }}
                  onError={() => setFailedAspectImages(prev => new Set([...prev, asp]))}
                />
              ) : (
                <text x={chromeLeftX - 22} y={toSvgY(aspValue) + 4}
                      textAnchor="middle" fontSize="9" fontFamily="Courier New"
                      fontWeight="bold" fill="#f8f8f8">
                  {aspectAbbrev[asp]}
                </text>
              )}
            </g>
          );
        })}
        {/* X labels. */}
        {Object.entries(classesNumeric).map(([cls, val]) => (
          xLabelStyle === 'icon' ? (
            <image key={cls}
                   href={`./images/classes/outline/${cls.toLowerCase()}.svg`}
                   x={toSvgX(val) - 12}
                   y={chromeBottomY + 12}
                   width="24"
                   height="24"/>
          ) : (
            <text key={cls} x={toSvgX(val)} y={chromeBottomY + 25}
                  textAnchor="middle" fontSize="11" fontFamily="Courier New" fontWeight="bold" fill="#f8f8f8">
              {classAbbrev[cls]}
            </text>
          )
        ))}

        {/* Per-cell rendering. */}
        {Object.entries(classesNumeric).flatMap(([cls, cv]) =>
          Object.entries(aspectsNumeric).map(([asp, av]) => {
            const cell = cellAt.get(`${cls}|${asp}`);
            const member = cell ? cell.representative : null;
            const isHovered = hover === `${cls}|${asp}`;
            const interactive = !!onToggle;
            return (
              <g key={`${cls}-${asp}`}>
                {interactive && (
                  <>
                    {/* Hit area. Left-click adds, right-click clears
                        every entry at this cell (dupes-allowed model,
                        May 2026). onContextMenu preventDefault so the
                        browser context menu doesn't fire. */}
                    <rect
                      x={toSvgX(cv) - scale/2} y={toSvgY(av) - scale/2}
                      width={scale} height={scale}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHover(`${cls}|${asp}`)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => onToggle(cls, asp, moonCursor)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (onClear) onClear(cls, asp);
                      }}
                    />
                    {/* Paint-cursor halo */}
                    {isHovered && (
                      <circle cx={toSvgX(cv)} cy={toSvgY(av)} r="9"
                              fill="none" stroke={MOON_COLORS[moonCursor]} strokeWidth="2" opacity="0.7" pointerEvents="none"/>
                    )}
                  </>
                )}
                {/* Member icon — pawn-style pixel art per moon. Pure
                    cells get their moon's icon; mixed-moon cells (dupes
                    across Prospit/Derse/Dual) show the Dual icon. Opacity
                    dimmed when a focus moon is set and the icon doesn't
                    contribute to it. In display mode (no onToggle) a
                    transparent hit-area drives per-player hover/click;
                    dupe cells pin to the representative member. */}
                {member && cell && (() => {
                  const iconMoon = cell.iconMoon;
                  const dim = focusMoon
                    && iconMoon !== focusMoon
                    && iconMoon !== 'Dual'
                    && cell.dual === 0;    // pure-prospit/derse only dims; mixed cells stay lit
                  const iconSize = 28;          // bumped from 22 — clearer at the new grid size
                  const href = iconMoon === 'Prospit'
                    ? './images/playericons-deco/prospit-player-icon.png'
                    : iconMoon === 'Derse'
                      ? './images/playericons-deco/derse-player-icon.png'
                      : './images/playericons-deco/dual-player-icon.png';
                  const idx = member._idx;
                  const isPinned  = pinnedPlayerIdx === idx;
                  const isHovered = hoveredPlayerIdx === idx;
                  const showRing  = isPinned || isHovered;
                  // Hex literals (not CSS vars) — SVG stroke= doesn't
                  // resolve var() reliably across all browsers. These
                  // mirror the --moon-prospit / --moon-derse values.
                  const ringColor = isPinned
                    ? '#ffffff'
                    : (iconMoon === 'Prospit' ? '#ffd66b'
                       : iconMoon === 'Derse' ? '#9a7ad8'
                       : '#f8f8f8');
                  const interactiveDisplay = !interactive && !!onPlayerHover;
                  const hasDupes = cell.total > 1;
                  return (
                    <>
                      {/* Selection ring drawn UNDER the icon so the
                          pixel art stays crisp on top. */}
                      {showRing && (
                        <circle cx={toSvgX(cv)} cy={toSvgY(av)}
                                r={iconSize / 2 + 3}
                                fill="none"
                                stroke={ringColor}
                                strokeWidth={isPinned ? 2 : 1.5}
                                strokeOpacity={isPinned ? 0.95 : 0.6}
                                pointerEvents="none"/>
                      )}
                      <image href={href}
                             x={toSvgX(cv) - iconSize / 2}
                             y={toSvgY(av) - iconSize / 2}
                             width={iconSize} height={iconSize}
                             opacity={dim ? 0.32 : 1}
                             style={{ imageRendering: 'pixelated' }}
                             pointerEvents="none"/>
                      {/* Dupe count badge — small circle bottom-right of
                          the icon. Visible whenever a cell holds more
                          than one member, in both entry and display
                          modes so the user can see at-a-glance that the
                          cell has been multi-populated. */}
                      {hasDupes && (
                        <g pointerEvents="none">
                          <circle cx={toSvgX(cv) + iconSize / 2 - 2}
                                  cy={toSvgY(av) + iconSize / 2 - 2}
                                  r="7"
                                  fill="#0d0d0d" stroke="#f8f8f8" strokeWidth="1"/>
                          <text x={toSvgX(cv) + iconSize / 2 - 2}
                                y={toSvgY(av) + iconSize / 2 + 1.3}
                                textAnchor="middle"
                                fontSize="10" fontFamily="Courier New"
                                fontWeight="bold" fill="#f8f8f8">
                            {cell.total}
                          </text>
                        </g>
                      )}
                      {/* Display-mode hit-area: catches hover + click,
                          forwards to ResultsView via the callbacks. */}
                      {interactiveDisplay && (
                        <rect
                          x={toSvgX(cv) - iconSize / 2}
                          y={toSvgY(av) - iconSize / 2}
                          width={iconSize} height={iconSize}
                          fill="transparent"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => onPlayerHover(idx)}
                          onMouseLeave={() => onPlayerHover(null)}
                          onClick={() => onPlayerClick && onPlayerClick(idx)}
                        />
                      )}
                    </>
                  );
                })()}
              </g>
            );
          })
        )}

        {/* Dupes-hover tooltip */}
        {(() => {
          if (!hover) return null;
          const cell = cellAt.get(hover);
          if (!cell || cell.total <= 1) return null;
          const [hCls, hAsp] = hover.split('|');
          const cv = classesNumeric[hCls];
          const av = aspectsNumeric[hAsp];
          // Three rows max (Prospit, Derse, Dual); skip rows with 0.
          const entries = [
            { moon: 'Prospit', count: cell.prospit,
              src: './images/moons/no_bg/prospit_no-bg.png' },
            { moon: 'Derse',   count: cell.derse,
              src: './images/moons/no_bg/derse_no-bg.png' },
            { moon: 'Dual',    count: cell.dual,
              src: './images/moons/no_bg/dual_no-bg.png' },
          ].filter(e => e.count > 0);
          const rowH = 16;
          const padX = 6, padY = 4;
          const w = 64;
          const h = entries.length * rowH + padY * 2;
          // Default tooltip sits above the cell. If the cell is in the
          // top two rows of the grid, flip it below so it doesn't
          // disappear past the SVG's top padding.
          const flipBelow = av >= 5;
          const cy = toSvgY(av);
          const boxX = toSvgX(cv) - w / 2;
          const boxY = flipBelow ? cy + 22 : cy - 22 - h;
          return (
            <g pointerEvents="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))' }}>
              <rect x={boxX} y={boxY} width={w} height={h}
                    rx="3" ry="3"
                    fill="#1a1a1a" stroke="#888" strokeWidth="1"/>
              {entries.map((e, i) => {
                const rowY = boxY + padY + i * rowH;
                return (
                  <g key={e.moon}>
                    <image href={e.src}
                           x={boxX + padX}
                           y={rowY}
                           width="13" height="13"
                           style={{ imageRendering: 'auto' }}/>
                    <text x={boxX + padX + 18}
                          y={rowY + 11}
                          fontSize="11" fontFamily="Courier New"
                          fontWeight="bold" fill="#f8f8f8">
                      x {e.count}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })()}

        {/* Stat overlays (drawn on top of member dots so markers remain visible) */}
        {overlays.map((ov, i) => {
          const color = ov.color || '#6dd1f4';
          if (ov.kind === 'point') {
            const cx = toSvgX(ov.x);
            const cy = toSvgY(ov.y);
            const r  = ov.radius || 5;
            if (ov.shape === 'square') {
              return <rect key={`ov-${i}`}
                           x={cx - r} y={cy - r} width={r * 2} height={r * 2}
                           fill={color} stroke="#000" strokeWidth="1"
                           pointerEvents="none"/>;
            }
            // default = diamond
            const pts = `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
            return <polygon key={`ov-${i}`} points={pts}
                            fill={color} stroke="#000" strokeWidth="1"
                            pointerEvents="none"/>;
          }
          if (ov.kind === 'marker') {
            const cv = classesNumeric[ov.class];
            const av = aspectsNumeric[ov.aspect];
            if (cv === undefined || av === undefined) return null;
            return <circle key={`ov-${i}`}
                           cx={toSvgX(cv)} cy={toSvgY(av)} r="11"
                           fill="none" stroke={color}
                           strokeWidth={ov.width ?? 2.5}
                           strokeDasharray={ov.dash ? '4 3' : undefined}
                           pointerEvents="none"/>;
          }
          if (ov.kind === 'glyph') {
            // Text annotation anchored beside a player marker. Used by
            // Wave 7f to mark Oddest-One-Out with "∃!" instead of a
            // ring around the player. dx is in pixels (svg units); a
            // positive value places the glyph to the right of the
            // player and anchors text-start, negative places it on
            // the left and anchors text-end. dy nudges vertically;
            // default 4 nudges down so the glyph baseline sits near
            // the player icon's vertical center.
            const cv = classesNumeric[ov.class];
            const av = aspectsNumeric[ov.aspect];
            if (cv === undefined || av === undefined) return null;
            const dx = ov.dx ?? 18;
            const dy = ov.dy ?? 4;
            const anchor = dx >= 0 ? 'start' : 'end';
            return (
              <text key={`ov-${i}`}
                    x={toSvgX(cv) + dx} y={toSvgY(av) + dy}
                    fill={color}
                    fontSize={ov.fontSize ?? 16}
                    fontFamily={ov.fontFamily ?? "'Cambria Math', 'Times New Roman', serif"}
                    fontWeight={ov.fontWeight ?? 'bold'}
                    textAnchor={anchor}
                    pointerEvents="none">
                {ov.text}
              </text>
            );
          }
          if (ov.kind === 'circle') {
            // Center + radius are in classpect-space; convert to pixels.
            const cx = toSvgX(ov.cx ?? 0);
            const cy = toSvgY(ov.cy ?? 0);
            const rPx = (ov.r || 1) * scale;
            return <circle key={`ov-${i}`}
                           cx={cx} cy={cy} r={rPx}
                           fill={ov.fill ?? 'none'}
                           fillOpacity={ov.fillOpacity ?? 0.05}
                           stroke={color}
                           strokeWidth={ov.width ?? 1.2}
                           strokeOpacity={ov.opacity ?? 0.7}
                           strokeDasharray={ov.dash ? '4 3' : undefined}
                           clipPath={ov.clip === 'grid' ? 'url(#gridClip)' : undefined}
                           pointerEvents="none"/>;
          }
          if (ov.kind === 'annulus') {
            // Annulus = thick stroked circle. The stroke width fills the
            // band between rInner and rOuter; the `r` attr is the midline.
            const cx = toSvgX(ov.cx ?? 0);
            const cy = toSvgY(ov.cy ?? 0);
            const rOut = (ov.rOuter || 0) * scale;
            const rIn  = (ov.rInner || 0) * scale;
            const rMid = (rOut + rIn) / 2;
            const w    = Math.max(0, rOut - rIn);
            if (w <= 0) return null;
            return <circle key={`ov-${i}`}
                           cx={cx} cy={cy} r={rMid}
                           fill="none"
                           stroke={color}
                           strokeWidth={w}
                           strokeOpacity={ov.opacity ?? 0.18}
                           clipPath={ov.clip === 'grid' ? 'url(#gridClip)' : undefined}
                           pointerEvents="none"/>;
          }
          if (ov.kind === 'crown') {
            // Crown image sitting just above the player's dot.
            // Prospit (Implicit leader) = gold crown; Derse (Explicit) =
            // purple/black crown; default = neutral. Pixel-art assets
            // courtesy of the user's playericons-deco folder.
            const cv = classesNumeric[ov.class];
            const av = aspectsNumeric[ov.aspect];
            if (cv === undefined || av === undefined) return null;
            const size = ov.size || 22;       // bumped from 18
            const cx = toSvgX(cv);
            const cy = toSvgY(av) - 17;       // raised to clear the bigger player icon
            const href = ov.tone === 'implicit'
              ? './images/playericons-deco/prospit-crown.png'
              : ov.tone === 'explicit'
                ? './images/playericons-deco/derse-crown.png'
                : './images/playericons-deco/neutral-crown.png';
            return (
              <image key={`ov-${i}`} href={href}
                     x={cx - size / 2} y={cy - size / 2}
                     width={size} height={size}
                     style={{ imageRendering: 'pixelated' }}
                     pointerEvents="none"/>
            );
          }
          if (ov.kind === 'moon-marker') {
            // Lunar-center marker — uses the dedicated griddecorators
            // 4-point star assets (gold for Prospit, magenta for Derse).
            // Sits at the lunar center's snapped grid intersection; the
            // parent already routes coincidence cases through `chevron`
            // instead, so the icon never has to dodge a player here.
            const cx0 = toSvgX(ov.x ?? 0);
            const cy0 = toSvgY(ov.y ?? 0) + (ov.pixelOffsetY || 0);
            const size = ov.size || 24;       // bumped from 18
            const href = ov.side === 'prospit'
              ? './images/griddecorators/lunarcenter_prospit.png'
              : './images/griddecorators/lunarcenter_derse.png';
            return (
              <image key={`ov-${i}`} href={href}
                     x={cx0 - size / 2} y={cy0 - size / 2}
                     width={size} height={size}
                     style={{ imageRendering: 'pixelated' }}
                     pointerEvents="none"/>
            );
          }
          if (ov.kind === 'chevron') {
            // Lunar-center marker variant: when the lunar center coincides
            // with a player's classpect we tuck a chevron BENEATH the
            // player instead of stacking the moon-center on top of them.
            const cv = classesNumeric[ov.class];
            const av = aspectsNumeric[ov.aspect];
            if (cv === undefined || av === undefined) return null;
            const w = ov.width  || 18;        // bumped from 14
            const h = ov.height || 10;        // bumped from 8
            const cx = toSvgX(cv);
            const cy = toSvgY(av) + 14;       // pushed lower to clear bigger player
            const href = ov.side === 'prospit'
              ? './images/playericons-deco/prospit-chevron.png'
              : './images/playericons-deco/derse-chevron.png';
            return (
              <image key={`ov-${i}`} href={href}
                     x={cx - w / 2} y={cy - h / 2}
                     width={w} height={h}
                     preserveAspectRatio="xMidYMid meet"
                     style={{ imageRendering: 'pixelated' }}
                     pointerEvents="none"/>
            );
          }
          if (ov.kind === 'session-center') {
            // Whole-session center marker (Stat B / Avatar) — the cyan
            // celtic-cross icon from griddecorators. Replaces the older
            // generic ring marker. Sits at the snapped representative
            // classpect cell.
            const cv = classesNumeric[ov.class];
            const av = aspectsNumeric[ov.aspect];
            if (cv === undefined || av === undefined) return null;
            const size = ov.size || 26;
            const cx = toSvgX(cv);
            const cy = toSvgY(av);
            return (
              <image key={`ov-${i}`}
                     href="./images/griddecorators/sessioncenter-icon.png"
                     x={cx - size / 2} y={cy - size / 2}
                     width={size} height={size}
                     style={{ imageRendering: 'pixelated' }}
                     pointerEvents="none"/>
            );
          }
          if (ov.kind === 'nexus') {
            const cx = toSvgX(0), cy = toSvgY(0);
            return (
              <g key={`ov-${i}`} pointerEvents="none">
                <circle cx={cx} cy={cy} r="9" fill="none" stroke={color} strokeWidth="2.5"/>
                <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} stroke={color} strokeWidth="1.5"/>
                <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke={color} strokeWidth="1.5"/>
              </g>
            );
          }
          if (ov.kind === 'line') {
            return <line key={`ov-${i}`}
                         x1={toSvgX(ov.x1)} y1={toSvgY(ov.y1)}
                         x2={toSvgX(ov.x2)} y2={toSvgY(ov.y2)}
                         stroke={color}
                         strokeWidth={ov.width ?? 1.5}
                         strokeOpacity={ov.opacity ?? 1}
                         strokeDasharray={ov.dash ? '4 3' : undefined}
                         pointerEvents="none"/>;
          }
          if (ov.kind === 'glow-line') {
            // Three stacked lines simulate a glow without an SVG filter
            // (filters can be flaky cross-browser at small sizes). The
            // outer two are wide and translucent; the inner is sharp.
            const x1 = toSvgX(ov.x1), y1 = toSvgY(ov.y1);
            const x2 = toSvgX(ov.x2), y2 = toSvgY(ov.y2);
            return (
              <g key={`ov-${i}`} pointerEvents="none">
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={color} strokeOpacity="0.18"
                      strokeWidth={ov.glowWidth ?? 14}
                      strokeLinecap="round"/>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={color} strokeOpacity="0.38"
                      strokeWidth={ov.midWidth ?? 6}
                      strokeLinecap="round"/>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={color} strokeOpacity="0.95"
                      strokeWidth={ov.width ?? 2}
                      strokeLinecap="round"/>
              </g>
            );
          }
          if (ov.kind === 'polygon') {
            if (!ov.points || ov.points.length < 2) return null;
            const pts = ov.points.map(([x, y]) => `${toSvgX(x)},${toSvgY(y)}`).join(' ');
            // n=2 draws as an open line (polyline); n>=3 closes into a polygon.
            if (ov.points.length === 2) {
              return <polyline key={`ov-${i}`} points={pts}
                               fill="none" stroke={color}
                               strokeWidth={ov.width ?? 1.5}
                               strokeOpacity={ov.opacity ?? 1}
                               strokeDasharray={ov.dash ? '5 3' : undefined}
                               pointerEvents="none"/>;
            }
            return <polygon key={`ov-${i}`} points={pts}
                            fill={ov.fill ?? 'none'}
                            fillOpacity={ov.fillOpacity ?? 0.15}
                            stroke={color}
                            strokeWidth={ov.width ?? 1.5}
                            strokeOpacity={ov.opacity ?? 0.9}
                            strokeDasharray={ov.dash ? '5 3' : undefined}
                            strokeLinejoin="round"
                            pointerEvents="none"/>;
          }
          return null;
        })}

        {/* Phantom members. */}
        {phantomMembers.map((ph, i) => {
          const size = 28;
          const href = ph.moon === 'Prospit'
            ? './images/playericons-deco/prospit-player-icon.png'
            : ph.moon === 'Derse'
              ? './images/playericons-deco/derse-player-icon.png'
              : './images/playericons-deco/dual-player-icon.png';
          const cx = toSvgX(ph.x);
          const cy = toSvgY(ph.y);
          const interactive = !!onPhantomClick;
          const isPinned    = pinnedPhantomIdx === i;
          return (
            <g key={`phantom-${i}`}>
              {isPinned && (
                <circle cx={cx} cy={cy}
                        r={size / 2 + 3}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={2}
                        strokeOpacity={0.95}
                        pointerEvents="none"/>
              )}
              <image href={href}
                     x={cx - size / 2}
                     y={cy - size / 2}
                     width={size} height={size}
                     style={{
                       imageRendering: 'pixelated',
                       cursor: interactive ? 'pointer' : 'default',
                     }}
                     opacity="0.9"
                     onClick={interactive ? () => onPhantomClick(i) : undefined}>
                <title>{ph.label}</title>
              </image>
            </g>
          );
        })}
      </svg>
      {hover && (
        <div className="text-xs mt-1 text-gray-400">
          {(() => {
            const [c, a] = hover.split('|');
            const cell = cellAt.get(hover);
            if (!cell) return `${c} of ${a} — empty (click to add ${moonCursor})`;
            // Dupes (May 2026): summarize per-moon counts under the grid.
            // Single-member cell renders as "Knight of Time (Prospit)";
            // multi-member cell renders as "Knight of Time × 3 (P×2, D×1)".
            const parts = [];
            if (cell.prospit) parts.push(`P×${cell.prospit}`);
            if (cell.derse)   parts.push(`D×${cell.derse}`);
            if (cell.dual)    parts.push(`B×${cell.dual}`);
            if (cell.total === 1) {
              return `${c} of ${a} (${cell.representative.moon})`;
            }
            return `${c} of ${a} × ${cell.total} (${parts.join(', ')})`;
          })()}
        </div>
      )}
    </div>
  );
});
