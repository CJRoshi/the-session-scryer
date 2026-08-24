/* =========================================================================
   SCRYER HEADER
   The page-level header bar above the Scryer's entry/inside frames.
   Mirrors the Classpect Connector's Header (../components/header.js):
   logo + Typostuck title on the left, nav links on the right, mobile
   hamburger menu, dark semi-transparent nav buttons, green FRAFpost
   accent. Sits inside .app-chrome so it fades on the dive.

   Color choices:
     - Header bg picks a saturated branded color (NOT a parchment
       cream) so it matches the CC header's energy. Steel-blue tied to
       the cueball's blue eye, light enough that the Regular logo's
       black ring + orbs read with full contrast.
     - Border is a darker shade of the header bg (CC convention).
     - Nav buttons use rgba(0,0,0,0.2) on the bg, same as CC.
     - FRAFpost uses CC's signature #00e371 green accent.

   Props:
     children?  — extra slot content (e.g. dev SelfTestPanel) rendered
                  beneath the title. Optional.
   ========================================================================= */

const ScryerHeader = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  /* Deep slate-blue color. */
  const headerBg     = '#252d39';
  const borderColor  = '#3c6cb8';
  /* CC defaults textColor on a light bg to '#000'; mid-tone
     bg so white-ish reads better. Title and body all share this. */
  const textColor    = '#f4f4f4';

  /* Logo path. */
  const logoSrc = './images/logos/ScryerLogoRegular.png';

  /* Nav-link styling mirrors CC's navLinkStyle: dark semi-transparent
     background, rounded, current-textColor text. */
  const navLinkStyle = {
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: textColor,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '4px',
    padding: '8px 12px',
    fontFamily: "'Typostuck', 'Courier New', monospace",
  };
  /* FRAFpost accent — same green CC uses for the external forum link. */
  const frafStyle = {
    ...navLinkStyle,
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: '#00e371',
  };

  /* Connector accent */
  const connectorStyle = {
    ...navLinkStyle,
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: '#ffc266',
  };
  const connectorHref = 'https://cjroshi.github.io/the-classpect-connector/index.html#/';

  /* Nav links. Settings intentionally excluded — gets its own square
     gear button at the far right of the header. Connector also lifted
     out (rendered separately with connectorStyle, second-to-last, so
     the two external-site pills read as a matched pair). */
  const navLinks = [
    { label: 'FAQ',       href: 'https://cjroshi.github.io/the-classpect-connector/faq.html'     },
    { label: 'Theory',    href: 'https://cjroshi.github.io/the-classpect-connector/theory.html'  },
    { label: 'Rungs',     href: 'https://cjroshi.github.io/the-classpect-connector/rungs.html'   },
    { label: 'Credits',   href: 'https://cjroshi.github.io/the-classpect-connector/credits.html' },
    { label: 'About',     href: './about.html',    local: true                                   },
  ];

  const gearButtonStyle = {
    background: 'rgba(0,0,0,0.25)',
    border: 'none',
    borderRadius: '6px',
    padding: 0,
    cursor: 'pointer',
    color: textColor,
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    flexShrink: 0,
  };
  const gearIconSvg = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61
               l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41
               h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87
               C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58
               c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54
               c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96
               c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6
               s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
    </svg>
  );

  /* Title style — font-size now lives in the embedded <style> below
     (under .scryer-header-title) so a @media query can scale it down on
     narrow viewports. Inline styles take precedence over external CSS,
     so anything we want responsive has to come out of this object and
     into the class-targeted rule. */
  const titleStyle = {
    fontFamily: "'Typostuck', 'Courier New', monospace",
    fontWeight: 'normal',
    lineHeight: 1.1,
    color: textColor,
    textDecoration: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  return (
    <header style={{
      backgroundColor: headerBg,
      padding: '14px 20px',
      marginBottom: '16px',
      borderBottom: `2px solid ${borderColor}`,
      position: 'relative',
      zIndex: 10
    }}>
      {/* Mobile scaling rules. Rendered alongside the markup so the
          component carries its own responsive behavior — every page
          that mounts ScryerHeader (index, scry, about) gets these
          rules automatically, no per-page CSS work needed.
          - Title shrinks 2.25rem → 1.4rem at ≤480px so "The Session
            Scryer" stops ellipsizing to "The Sessio..." on narrow
            phones.
          - Logo shrinks 72px → 48px at the same break so the chrome
            stays proportional. */}
      <style>{`
        .scryer-header-title { font-size: 2.25rem; }
        .scryer-header-logo  { width: 72px; height: 72px; }
        /* Two-step shrink: intermediate (iPad portrait, narrow laptop)
           uses a smaller title that still reads as the page brand;
           full mobile (phones) drops further so the title fits beside
           a small logo + hamburger.
           Phase H second pass: bumped the intermediate break from
           900px to 1280px to match the scryer-scene's mobile-layout
           breakpoint, since iPad portrait at 1024–1253 CSS px was
           ellipsizing "The Session Scryer" to "The Session Scr..." */
        @media (max-width: 1280px) {
          .scryer-header-title { font-size: 1.75rem; }
          .scryer-header-logo  { width: 56px; height: 56px; }
        }
        @media (max-width: 480px) {
          .scryer-header-title { font-size: 1.4rem; }
          .scryer-header-logo  { width: 48px; height: 48px; }
        }
      `}</style>
      <div className="flex items-center justify-between"
           style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="flex items-center" style={{ gap: '16px', minWidth: 0 }}>
          <a href="./index.html" style={{ cursor: 'pointer', flexShrink: 0 }}>
            <img
              className="scryer-header-logo"
              src={logoSrc}
              alt="Scryer logo"
              style={{
                imageRendering: 'pixelated',
                display: 'block',
              }}
            />
          </a>
          <a href="./index.html" className="scryer-header-title" style={titleStyle}>
            The Session Scryer
          </a>
        </div>

        <div className="hidden md:flex items-center" style={{ gap: '8px', flexShrink: 0 }}>
          {navLinks.map(link => (
            <a key={link.label}
               href={link.href}
               target={link.local ? undefined : '_blank'}
               rel={link.local ? undefined : 'noopener noreferrer'}
               className="hover:opacity-80"
               style={navLinkStyle}>
              {link.label}
            </a>
          ))}
          <a href={connectorHref}
             target="_blank"
             rel="noopener noreferrer"
             className="hover:opacity-80"
             style={connectorStyle}>
            Connector
          </a>
          <a href="https://www.fruityrumpus.com/forums/t/classpecting-with-graphs-rotations-and-groups"
             target="_blank"
             rel="noopener noreferrer"
             className="hover:opacity-80"
             style={frafStyle}>
            FRAFpost
          </a>
          {/* Settings gear — square icon button at the far right of the
              desktop nav row, distinct from the text pills. */}
          <a href="./settings.html"
             aria-label="Settings"
             title="Settings"
             style={gearButtonStyle}
             className="hover:opacity-80">
            {gearIconSvg}
          </a>
        </div>

        {/* Mobile: gear + hamburger side by side. */}
        <div className="md:hidden" style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <a href="./settings.html"
               aria-label="Settings"
               title="Settings"
               style={gearButtonStyle}
               className="hover:opacity-80">
              {gearIconSvg}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              style={gearButtonStyle}>
              {menuOpen ? (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden"
             style={{
               borderTop: `1px solid rgba(0,0,0,0.25)`,
               marginTop: '10px',
               paddingTop: '8px',
             }}>
          <div className="flex flex-col"
               style={{ gap: '4px', maxWidth: '1100px', margin: '0 auto' }}>
            {navLinks.map(link => (
              <a key={link.label}
                 href={link.href}
                 target={link.local ? undefined : '_blank'}
                 rel={link.local ? undefined : 'noopener noreferrer'}
                 onClick={() => setMenuOpen(false)}
                 className="hover:opacity-80"
                 style={{
                   ...navLinkStyle,
                   display: 'flex',
                   alignItems: 'center',
                   minHeight: '44px',
                   padding: '0 16px',
                   fontSize: '1.1rem',
                 }}>
                {link.label}
              </a>
            ))}
            <a href={connectorHref}
               target="_blank"
               rel="noopener noreferrer"
               onClick={() => setMenuOpen(false)}
               className="hover:opacity-80"
               style={{
                 ...connectorStyle,
                 display: 'flex',
                 alignItems: 'center',
                 minHeight: '44px',
                 padding: '0 16px',
                 fontSize: '1.1rem',
               }}>
              Connector ↗
            </a>
            <a href="https://www.fruityrumpus.com/forums/t/classpecting-with-graphs-rotations-and-groups"
               target="_blank"
               rel="noopener noreferrer"
               onClick={() => setMenuOpen(false)}
               className="hover:opacity-80"
               style={{
                 ...frafStyle,
                 display: 'flex',
                 alignItems: 'center',
                 minHeight: '44px',
                 padding: '0 16px',
                 fontSize: '1.1rem',
               }}>
              FRAFpost ↗
            </a>
          </div>
        </div>
      )}

      {children && (
        <div style={{
          marginTop: '10px',
          paddingTop: '8px',
          borderTop: `1px solid rgba(0,0,0,0.25)`,
          maxWidth: '1100px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {children}
        </div>
      )}
    </header>
  );
};

window.ScryerHeader = ScryerHeader;
