/* =========================================================================
   LUNAR COMPONENTS
   Per-moon stat card (LunarCard) and the moon-disc twin (LunarMoons),
   extracted from index.html in the LOC-reduction pass.

   LunarCard: renders the prose block for one moon — header / activity /
              center / rep — with optional per-line speaker overrides
              from a special-session registry (Wave 8b).
   LunarMoons: renders the two pixel-art moon discs flanking the
              lunar cards. Click toggles focus; hover scopes overlays
              to that moon transiently.

   Dependencies (global, defined elsewhere): ClasspectLink (classpect-link.js),
   computeRepresentativeRung (session-stats.js).
   ========================================================================= */

/* LunarCard */
const LunarCard = ({ side, luna, otherCentroid, isActive, isDimmed, lunarOverride = null, charLookup = {} }) => {
  if (!luna) return null;
  const data = side === 'prospit' ? luna.prospit : luna.derse;
  const cen  = data.centroid;
  const bal  = data.balance;
  const rep  = computeRepresentativeRung(data.members);
  const dual = luna.counts.dual;
  const pure = side === 'prospit' ? luna.counts.prospitPure : luna.counts.dersePure;
  const total = pure + dual;

  const kingdomName = side === 'prospit' ? 'kingdom of light' : 'kingdom of darkness';
  const sideName    = side === 'prospit' ? 'Prospit' : 'Derse';

  // Header: natural-prose sentence. Singular/plural agreement matters
  // here ("there is 1 dreamer" vs "there are 4 dreamers"); dual clause
  // is elided entirely when no one's on both moons.
  const verb       = total === 1 ? 'is' : 'are';
  const dreamerSfx = total === 1 ? '' : 's';
  const dualClause = dual > 0
    ? `, ${dual} happening to be on both moons`
    : '';

  // Interesting.
  const offType = bal && bal.direction && bal.band && bal.band.max >= 2 && (
    (side === 'prospit' && bal.direction === 'Active') ||
    (side === 'derse'   && bal.direction === 'Passive')
  );

  const centerName = side === 'prospit' ? 'center of brilliance' : 'core of darkness';
  const bothNexus = cen.isNexus && otherCentroid && otherCentroid.isNexus;
  const rungArticle = rep && rep.rungName.startsWith('The ') ? '' : 'the ';

  const renderLine = (lineKey) => {
    const ov = lunarOverride && lunarOverride[lineKey];
    if (!ov || !ov.text) return null;
    if (!ov.speaker) {
      return <span className="narrator-text" style={{ whiteSpace: 'pre-wrap' }}>{renderTextWithLinks(ov.text)}</span>;
    }
    const speaker = charLookup[ov.speaker];
    const color = speaker ? speaker.color : '#f8f8f8';
    return <span style={{ color, whiteSpace: 'pre-wrap', fontWeight: 'bold' }}>{renderTextWithLinks(ov.text, { inheritColor: true })}</span>;
  };
  const ovHeader   = renderLine('header');
  const ovActivity = renderLine('activity');
  const ovCenter   = renderLine('center');
  const ovRep      = renderLine('rep');

  const stateClass = `lunar-card ${side}${isActive ? ' active' : ''}${isDimmed ? ' dimmed' : ''}`;
  return (
    <div className={stateClass}>
      <div className="lunar-card-head">
        {ovHeader || (
          <>
            For the <span className="kingdom">{kingdomName}</span>, there {verb}{' '}
            <span className="v">{total}</span> dreamer{dreamerSfx}{dualClause}.
          </>
        )}
      </div>
      <div className="lunar-card-line">
        {ovActivity || (
          <>
            Its activity seems <span className="v">{bal.label}</span>
            {offType && <span className="reaction">... hm</span>}.
          </>
        )}
      </div>
      <div className="lunar-card-line">
        {ovCenter || (
          bothNexus
            ? <>As expected, they <span className="v">meet on the Battlefield</span>.</>
            : cen.isNexus
              ? <>The {centerName} is the <ClasspectLink className="Nexus" aspectName={null} target="grid" size="small"/>.</>
              : <>The {centerName} is the <ClasspectLink className={cen.repClass} aspectName={cen.repAspect} target="grid" size="small"/>.</>
        )}
      </div>
      {(ovRep || rep) && (
        <div className="lunar-card-line">
          {ovRep || (
            <>
              The disposition of the {sideName} dreamers could be represented by {rungArticle}
              <span className="v" style={{ color: rep.band.textColor || rep.band.color }}>{rep.rungName}</span>.{' '}
              <span style={{ color: '#888', fontWeight: 'normal' }}>(#{rep.finalRung})</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

/* Single-moon display */
const LunarMoon = ({ side, luna, focus = 'all', onFocus, onHover }) => {
  if (!luna) return null;
  const sideName = side === 'prospit' ? 'Prospit' : 'Derse';
  const otherSide = side === 'prospit' ? 'derse' : 'prospit';
  const fmtCount = () => {
    const pure = side === 'prospit' ? luna.counts.prospitPure : luna.counts.dersePure;
    const dual = luna.counts.dual;
    if (dual === 0) return String(pure);
    return `${pure} + ${dual}`;
  };
  const enabled = !!luna && !!onFocus;
  const handleClick = () => {
    if (!enabled) return;
    onFocus(focus === side ? 'all' : side);
  };
  const handleEnter = () => { if (luna && onHover) onHover(side); };
  const handleLeave = () => { if (luna && onHover) onHover(null); };
  const cen = luna[side].centroid;
  const action = enabled
    ? (focus === side ? `${sideName} (focused — click to clear)` : `Focus ${sideName}`)
    : sideName;
  const trueXY = `True centroid: (${cen.meanX.toFixed(2)}, ${cen.meanY.toFixed(2)})`;
  const snapped = cen.isNexus ? 'Snaps to Nexus.' : `Snaps to ${cen.label}.`;
  const title = `${action}\n${trueXY}\n${snapped}`;
  const cls = `moon-display ${side}${focus === side ? ' focused' : ''}${focus === otherSide ? ' dimmed' : ''}${enabled ? ' interactive' : ''}`;
  const src = side === 'prospit'
    ? './images/moons/no_bg/prospit_no-bg.png'
    : './images/moons/no_bg/derse_no-bg.png';
  return (
    <div className={cls}
         title={title}
         onClick={handleClick}
         onMouseEnter={handleEnter}
         onMouseLeave={handleLeave}>
      <div>
        <div className="moon-disc">
          <img src={src} alt={sideName}/>
        </div>
        <div className="moon-name">{sideName}</div>
        <div className="moon-count">{fmtCount()}</div>
      </div>
    </div>
  );
};

/* Legacy two-moon wrapper */
const LunarMoons = ({ luna, focus = 'all', onFocus, onHover }) => {
  const fmtCount = side => {
    if (!luna) return '—';
    const pure = side === 'prospit' ? luna.counts.prospitPure : luna.counts.dersePure;
    const dual = luna.counts.dual;
    if (dual === 0) return String(pure);
    return `${pure} + ${dual}`;
  };
  // Click toggles focus to that moon, or back to 'all' if it was already
  // focused. No-op (and visually inert) when there's no lunar split yet.
  const enabled = !!luna && !!onFocus;
  const handleClick = side => () => {
    if (!enabled) return;
    onFocus(focus === side ? 'all' : side);
  };
  // Hover scopes the subsession overlays onto the hovered moon (without
  // committing to a click). Hovering Prospit while Derse is focused
  // temporarily swaps the view to Prospit until the cursor leaves.
  const handleEnter = side => () => {
    if (!luna || !onHover) return;
    onHover(side);
  };
  const handleLeave = () => {
    if (!luna || !onHover) return;
    onHover(null);
  };
  // Build a richer hover title showing the moon's true centroid + snap.
  const buildTitle = (sideKey, sideName) => {
    if (!luna) return sideName;
    const cen = luna[sideKey].centroid;
    const action = enabled
      ? (focus === sideKey ? `${sideName} (focused — click to clear)` : `Focus ${sideName}`)
      : sideName;
    const trueXY = `True centroid: (${cen.meanX.toFixed(2)}, ${cen.meanY.toFixed(2)})`;
    const snapped = cen.isNexus
      ? 'Snaps to Nexus.'
      : `Snaps to ${cen.label}.`;
    return `${action}\n${trueXY}\n${snapped}`;
  };
  const pClass = `moon-display prospit${focus === 'prospit' ? ' focused' : ''}${focus === 'derse' ? ' dimmed' : ''}${enabled ? ' interactive' : ''}`;
  const dClass = `moon-display derse${focus === 'derse' ? ' focused' : ''}${focus === 'prospit' ? ' dimmed' : ''}${enabled ? ' interactive' : ''}`;
  return (
    <div className="lunar-moons">
      <div className={pClass}
           title={buildTitle('prospit', 'Prospit')}
           onClick={handleClick('prospit')}
           onMouseEnter={handleEnter('prospit')}
           onMouseLeave={handleLeave}>
        <div>
          <div className="moon-disc">
            <img src="./images/moons/no_bg/prospit_no-bg.png" alt="Prospit"/>
          </div>
          <div className="moon-name">Prospit</div>
          <div className="moon-count">{fmtCount('prospit')}</div>
        </div>
      </div>
      <div className={dClass}
           title={buildTitle('derse', 'Derse')}
           onClick={handleClick('derse')}
           onMouseEnter={handleEnter('derse')}
           onMouseLeave={handleLeave}>
        <div>
          <div className="moon-disc">
            <img src="./images/moons/no_bg/derse_no-bg.png" alt="Derse"/>
          </div>
          <div className="moon-name">Derse</div>
          <div className="moon-count">{fmtCount('derse')}</div>
        </div>
      </div>
    </div>
  );
};
