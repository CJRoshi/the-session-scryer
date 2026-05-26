/* =========================================================================
   SCRYER FOOTER
   Bottom-of-page chrome. Mirrors the Classpect Connector's Footer
   component (../components/footer.js).
   ========================================================================= */

const ScryerFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{
      marginTop: '48px',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: '20px 32px',
        borderRadius: '16px',
        maxWidth: '800px',
        margin: '0 auto',
        backdropFilter: 'blur(8px)',
      }}>
        <p style={{
          fontFamily: "'Courier New', monospace",
          color: '#ffffff',
          fontSize: '0.875rem',
          marginBottom: '8px',
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        }}>
          <strong>Homestuck</strong> and all related characters and concepts, including the Extended Zodiac, are © Andrew Hussie. <strong>Homestuck: Beyond Canon</strong> and its related content belong to Furthest Ring Studios.
        </p>
        <p style={{
          fontFamily: "'Courier New', monospace",
          color: '#eeeeee',
          fontSize: '0.75rem',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)',
        }}>
          The Session Scryer by Nino Roshi, {currentYear}. Fan-made analysis tool.
        </p>
      </div>
    </div>
  );
};

window.ScryerFooter = ScryerFooter;
