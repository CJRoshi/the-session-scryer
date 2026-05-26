/* =========================================================================
   UI ELEMENTS
   ========================================================================= */

const InfoTooltip = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(s => !s)}
        style={{ cursor: 'help', color: '#6dd1f4', userSelect: 'none' }}
        aria-label="More info"
      >
        &nbsp;ⓘ
      </span>
      {show && (
        <div style={{
          position: 'absolute',
          zIndex: 20,
          left: 0,
          top: '100%',
          marginTop: '4px',
          padding: '8px 10px',
          backgroundColor: '#0d0d0d',
          border: '1px solid #555',
          borderRadius: '4px',
          fontSize: '11px',
          fontFamily: 'Courier New, monospace',
          whiteSpace: 'nowrap',
          color: '#ccc',
          boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
        }}>
          {children}
        </div>
      )}
    </span>
  );
};

const layerImageForRung = (rung) => {
  if (!rung) return null;
  if (rung <= 5)  return './images/rungs-layers/skaia-icon.png';
  if (rung <= 10) return './images/rungs-layers/gate-icon.png';
  if (rung <= 15) return './images/rungs-layers/land-icon.png';
  if (rung <= 20) return './images/rungs-layers/veil-icon.png';
  if (rung <= 22) return './images/rungs-layers/FR_1.png';
  if (rung <= 24) return './images/rungs-layers/FR_2.png';
  return                './images/rungs-layers/FR_3.png';
};

const LayerOrb = ({ position, rung, bandName, imageOverride = null, onMouseEnter, onMouseLeave, onClick, isPinned = false }) => {
  const imageSrc = imageOverride || layerImageForRung(rung);
  const cls = `orb o-${position} layer-orb${onClick ? ' clickable' : ''}${isPinned ? ' pinned' : ''}`;
  return (
    <div className={cls}
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         onClick={onClick}
         title={bandName || undefined}>
      {imageSrc && (
        <img className="layer-orb-img"
             src={imageSrc}
             alt={bandName || ''}/>
      )}
    </div>
  );
};

const Orb = ({ position, label, value, sub, valueColor, onMouseEnter, onMouseLeave, onClick, isPinned = false }) => {
  const isEmpty = value === null || value === undefined || value === '';
  const cls = `orb o-${position}${onClick ? ' clickable' : ''}${isPinned ? ' pinned' : ''}`;
  return (
    <div className={cls}
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         onClick={onClick}>
      <div>
        <div className="orb-label">{label}</div>
        <div className={`orb-value${isEmpty ? ' dim' : ''}`}
             style={!isEmpty && valueColor ? { color: valueColor } : undefined}>
          {isEmpty ? '—' : value}
        </div>
        {sub ? <div className="orb-sub">{sub}</div> : null}
      </div>
    </div>
  );
};

const ScryCard = ({ label, value, note, valueColor, onMouseEnter, onMouseLeave }) => {
  const isEmpty = value === null || value === undefined || value === '';
  return (
    <div className="scry-card"
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}>
      <div className="card-label">{label}</div>
      <div className={`card-value${isEmpty ? ' dim' : ''}`}
           style={!isEmpty && valueColor ? { color: valueColor } : undefined}>
        {isEmpty ? '—' : value}
      </div>
      <div className="card-note">{note}</div>
    </div>
  );
};
