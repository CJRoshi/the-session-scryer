/* =========================================================================
   SCRYING INTERIOR — React component
   ========================================================================= */

const SCRYINT_PENTAGON_POINTS = '500,980 957,648 782,112 218,112 43,648';
const SCRYINT_VIEWBOX = '0 0 1000 1080';

/* 5-fold radial guide lines from the center to each vertex — gives a
   subtle "scrying sigil" texture inside the pentagon when showGuides
   is enabled. */
const SCRYINT_GUIDES = [
  { x2: 500, y2: 980 },   // → bottom apex
  { x2: 957, y2: 648 },   // → mid-right
  { x2: 782, y2: 112 },   // → top-right
  { x2: 218, y2: 112 },   // → top-left
  { x2: 43,  y2: 648 },   // → mid-left
];

const ScryingInterior = ({
  className = 'scrying-interior-pentagon',
  color = '#0000FF',
  glow = 1,
  showGuides = false,
  style,
  ...rest
}) => {
  const mergedStyle = {
    '--scryint-color': color,
    '--scryint-glow':  glow,
    ...style,
  };

  return (
    <svg className={className}
         viewBox={SCRYINT_VIEWBOX}
         preserveAspectRatio="xMidYMid meet"
         style={mergedStyle}
         aria-hidden="true"
         {...rest}>
      <polygon className="scrying-interior-pentagon-poly"
               points={SCRYINT_PENTAGON_POINTS}/>
      {showGuides && (
        <g className="scrying-interior-guides">
          {SCRYINT_GUIDES.map((g, i) => (
            <line key={i} x1="500" y1="500" x2={g.x2} y2={g.y2}/>
          ))}
        </g>
      )}
    </svg>
  );
};

/* Expose on window for text/babel scripts that destructure it */
window.ScryingInterior = ScryingInterior;
window.ScryingInteriorPentagonPoints = SCRYINT_PENTAGON_POINTS;
