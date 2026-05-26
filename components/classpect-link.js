/* =========================================================================
   CLASSPECT LINK
   Single-anchor CC-style classpect link, mirroring the main Classpect
   Connector's title-case look. Class word renders in the link color
   (theme-dependent), "of" in dim, aspect word in its aspect-tinted color
   pulled from ASPECT_LINK_COLORS.

   target='grid' (default) scrolls back to the grid on click;
   target='cc' links out to the main site's classpect page in a new tab.

   Size variants (.is-small / .is-medium / .is-large) match the inline
   stat-row / scry-card / per-player-card use cases.

   Extracted from session-prototype/index.html in the LOC-reduction pass.
   ========================================================================= */

const ASPECT_LINK_COLORS = {
  // Mirrors components/constants.js → aspectColorsLight (the prototype
  // uses a light theme exclusively on surfaces where these would be rendered).
  Hope: "#d69500",     // Darker gold (was #ffc331)
  Light: "#c9b000",    // Darker yellow (was #dfd527)
  Life: "#67b240",
  Mind: "#36daa8",
  Breath: "#36abc0",
  Rage: "#b84ef5",
  Time: "#b70d0e",
  Blood: "#692b10",
  Heart: "#bd1864",
  Doom: "#3f6b3f",
  Void: "#001957",
  Space: "#000000"
};

const renderTextWithLinks = (text, opts = {}) => {
  if (typeof text !== 'string') return text;
  if (text.indexOf('[') === -1) return text;
  const inheritColor = !!opts.inheritColor;
  const parts = text.split(/(\[[^\]]+\])/);
  return parts.map((part, i) => {
    if (part.length >= 2 && part.startsWith('[') && part.endsWith(']')) {
      const inner = part.slice(1, -1).trim();
      if (inner.toLowerCase() === 'nexus') {
        return <ClasspectLink key={i} className="Nexus" aspectName={null} target="grid" size="small" inheritColor={inheritColor}/>;
      }
      const m = inner.match(/^(\w+)\s+of\s+(\w+)$/i);
      if (m) {
        const cls = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
        const asp = m[2][0].toUpperCase() + m[2].slice(1).toLowerCase();
        return <ClasspectLink key={i} className={cls} aspectName={asp} target="grid" size="small" inheritColor={inheritColor}/>;
      }
      // Unrecognized bracket content — render verbatim so authors
      // notice their syntax error.
      return <span key={i}>{part}</span>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const ClasspectLink = ({ className, aspectName, target = 'grid', size = null, onActivate = null, inheritColor = false }) => {
  // Nexus shorthand — when both args missing or explicitly nexus.
  const isNexus = !className || !aspectName ||
                  className.toLowerCase() === 'nexus' ||
                  aspectName.toLowerCase() === 'nexus';

  const href = target === 'cc'
    ? (isNexus
        ? 'https://cjroshi.github.io/the-classpect-connector/index.html'
        : `https://cjroshi.github.io/the-classpect-connector/index.html#/classpect/${className.toLowerCase()}-of-${aspectName.toLowerCase()}`)
    : '#';

  const handleClick = (e) => {
    if (target === 'grid') {
      e.preventDefault();
      let focused = false;
      if (!isNexus && typeof window.__cp_focusPlayer === 'function') {
        focused = window.__cp_focusPlayer(className, aspectName);
      }
      if (!focused) {
        const host = document.querySelector('.grid-host');
        if (host && host.scrollIntoView) {
          host.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      if (onActivate) onActivate();
    }
  };

  const classes = [
    'cc-classpect-link',
    isNexus ? 'is-nexus' : '',
    inheritColor ? 'is-inherit-color' : '',
    size === 'small'  ? 'is-small'  : '',
    size === 'medium' ? 'is-medium' : '',
    size === 'large'  ? 'is-large'  : ''
  ].filter(Boolean).join(' ');

  if (isNexus) {
    return (
      <a className={classes}
         href={href}
         target={target === 'cc' ? '_blank' : undefined}
         rel={target === 'cc' ? 'noopener noreferrer' : undefined}
         onClick={handleClick}>
        Nexus
      </a>
    );
  }

  const aspectColor = ASPECT_LINK_COLORS[aspectName] || '#ffffff';

  return (
    <a className={classes}
       href={href}
       target={target === 'cc' ? '_blank' : undefined}
       rel={target === 'cc' ? 'noopener noreferrer' : undefined}
       onClick={handleClick}>
      <span className="ccl-class">{className}</span>
      <span className="ccl-of">of</span>
      <span className="ccl-aspect" style={inheritColor ? undefined : { color: aspectColor }}>{aspectName}</span>
    </a>
  );
};
