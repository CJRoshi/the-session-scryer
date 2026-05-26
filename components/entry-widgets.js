/* =========================================================================
   ENTRY WIDGETS
   The three entry surfaces for building a session: free-form text,
   click-to-paint grid, and paste-a-code field. Plus the read-only
   member list shown next to them.

   Extracted from session-prototype/index.html in the LOC-reduction pass.

   Dependencies (global, defined elsewhere):
     - MOON_COLORS, classesNumeric, aspectsNumeric (session-constants.js)
     - sortPlayers (session-parser.js)
     - useState (React hook, destructured in index.html's inline script)
   ========================================================================= */

const MoonCursor = ({ value, onChange }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm">Cursor:</span>
    {['Dual', 'Prospit', 'Derse'].map(m => (
      <button
        key={m}
        title={m}
        className={`moon-btn ${value === m ? 'active' : ''}`}
        style={{ backgroundColor: MOON_COLORS[m] }}
        onClick={() => onChange(m)}
      />
    ))}
    <span className="text-xs ml-1 text-gray-400">{value}</span>
  </div>
);

const TextEntry = ({ text, onTextChange, parseResult }) => (
  <div>
    <textarea
      className="w-full"
      rows="6"
      placeholder={`One player per line or comma-separated, e.g.\nderse nt time, d sr lgt\nProspit Heir of Breath\nWitch Space (Prospit)`}
      value={text}
      onChange={e => onTextChange(e.target.value)}
    />
    <div className="text-xs mt-2">
      {parseResult.errors.length === 0
        ? <span className="ok">{parseResult.players.length} player{parseResult.players.length === 1 ? '' : 's'} parsed.</span>
        : <span className="err">
            {parseResult.errors.map((e, i) => (
              <div key={i}>Line {e.line} ("{e.chunk}"): {e.errors.join('; ')}</div>
            ))}
          </span>}
    </div>
  </div>
);

const CodeIO = ({ code, onCodePaste, decodeErrors }) => {
  const [pasteValue, setPasteValue] = useState('');
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };
  return (
    <div className="space-y-3">
      <div>
        <div className="text-xs text-gray-400 mb-1">Current code (read-only):</div>
        <div className="flex gap-2 items-center">
          <input type="text" value={code} readOnly className="flex-1 font-mono"/>
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-xs rounded bg-blue-700 hover:bg-blue-600 disabled:opacity-50"
            disabled={!code}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Paste a code to load:</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={pasteValue}
            onChange={e => setPasteValue(e.target.value)}
            placeholder="e.g. 2C1572922D51"
            className="flex-1 font-mono"
          />
          <button
            onClick={() => { onCodePaste(pasteValue); }}
            className="px-3 py-1 text-xs rounded bg-green-700 hover:bg-green-600"
          >
            Load
          </button>
        </div>
        {decodeErrors.length > 0 && (
          <div className="text-xs err mt-1">
            {decodeErrors.map((e, i) => <div key={i}>{e}</div>)}
          </div>
        )}
      </div>
    </div>
  );
};

/* MemberList groups the session by (class, aspect, moon) — dupes within
   the same triple collapse to one row with an `(xN)` suffix. So a
   session with two Derse Knights of Time, one Prospit Knight of Time,
   and one Dual Knight of Time renders three rows (sorted Dual →
   Prospit → Derse by moonToCode):
     Knight of Time (Dual)
     Knight of Time (Prospit)
     Knight of Time (Derse) (x2)
   The X button removes that specific (class, aspect, moon) group; if
   onRemoveMoon isn't wired (older callers), falls back to onRemove,
   which wipes all moons of the classpect. */
const MemberList = ({ session, onRemove, onRemoveMoon }) => {
  if (session.length === 0) {
    return <div className="text-xs text-gray-500 italic">(no players yet)</div>;
  }
  // Group by (class|aspect|moon). sortPlayers gives the canonical
  // class/aspect/moon ordering; consecutive matches collapse into
  // one row with a count.
  const sorted = sortPlayers(session);
  const groups = [];
  for (const p of sorted) {
    const last = groups[groups.length - 1];
    if (last && last.class === p.class && last.aspect === p.aspect && last.moon === p.moon) {
      last.count += 1;
    } else {
      groups.push({ class: p.class, aspect: p.aspect, moon: p.moon, count: 1 });
    }
  }
  return (
    <ul className="text-sm space-y-1">
      {groups.map((g, i) => {
        const sum = classesNumeric[g.class] + aspectsNumeric[g.aspect];
        const handleRemove = onRemoveMoon
          ? () => onRemoveMoon(g.class, g.aspect, g.moon)
          : () => onRemove(g.class, g.aspect);
        return (
          <li key={`${g.class}|${g.aspect}|${g.moon}`} className="flex items-center gap-2">
            <span style={{ color: MOON_COLORS[g.moon], fontSize: '14px' }}>●</span>
            <span className="flex-1">
              {g.class} of {g.aspect} <span className="text-gray-500">({g.moon})</span>
              {g.count > 1 && <span className="text-gray-400"> (x{g.count})</span>}
            </span>
            <span className="text-xs text-gray-400">[{sum >= 0 ? '+' : ''}{sum}]</span>
            <button onClick={handleRemove}
                    title={g.count > 1
                      ? `Remove all ${g.count} ${g.moon} ${g.class}s of ${g.aspect}`
                      : `Remove ${g.moon} ${g.class} of ${g.aspect}`}
                    className="text-xs text-red-400 hover:text-red-300">×</button>
          </li>
        );
      })}
    </ul>
  );
};
