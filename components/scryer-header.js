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

  /* Deep slate-blue branded color, slightly darker than the previous
     pass so the logo's black ring orbs stand out cleanly against it
     (still keeps enough lightness that the black isn't lost to the
     bg). Border is a brighter cueball-blue rim — like the logo's eye
     leaking out into the page chrome. */
  const headerBg     = '#252d39';
  const borderColor  = '#3c6cb8';
  /* CC defaults textColor on a light bg to '#000'; ours is mid-tone
     bg so white-ish reads better. Title and body all share this. */
  const textColor    = '#f4f4f4';

  /* Logo path. Regular variant has black ring + orbs that demand a
     mid-tone bg to read (Bright is reserved for dark-mode contexts).
     Pixel-art rendering on the <img> keeps the ring's pixel hits
     crisp at the small 48px display size. */
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

  /* Nav links. */
  const navLinks = [
    { label: 'Connector', href: 'https://cjroshi.github.io/the-classpect-connector/index.html#/' },
    { label: 'FAQ',       href: 'https://cjroshi.github.io/the-classpect-connector/faq.html'     },
    { label: 'Theory',    href: 'https://cjroshi.github.io/the-classpect-connector/theory.html'  },
    { label: 'Rungs',     href: 'https://cjroshi.github.io/the-classpect-connector/rungs.html'   },
    { label: 'Credits',   href: 'https://cjroshi.github.io/the-classpect-connector/credits.html' },
    { label: 'About',     href: './about.html', local: true                                      },
  ];

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
          <a href="https://www.fruityrumpus.com/forums/t/classpecting-with-graphs-rotations-and-groups"
             target="_blank"
             rel="noopener noreferrer"
             className="hover:opacity-80"
             style={frafStyle}>
            FRAFpost
          </a>
        </div>

        <div className="md:hidden" style={{ flexShrink: 0 }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{
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
            }}>
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
