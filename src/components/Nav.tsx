const NAV_LINKS = ['Live Game', 'Champions', 'Leaderboards', 'Pro View'];

export default function Nav() {
  return (
    <nav
      style={{
        borderBottom: '1px solid #1b1b20',
        backgroundColor: '#131318',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        height: '4rem',
      }}
      role="navigation"
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          color: '#00FF94',
          fontSize: '1.5rem',
          fontWeight: 900,
          letterSpacing: '-0.04em',
        }}
      >
        RIFTLY
      </span>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '0' }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontFamily: 'Manrope, sans-serif',
              color: '#b9cbbb',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0 1.25rem',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              transition: 'color 0.2s, background-color 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#fff';
              (e.currentTarget as HTMLElement).style.backgroundColor = '#1b1b20';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#b9cbbb';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button
          style={{ color: '#b9cbbb', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#00FF94')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#b9cbbb')}
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', display: 'block' }}>notifications</span>
        </button>
        <button
          style={{ color: '#b9cbbb', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#00FF94')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#b9cbbb')}
          aria-label="Settings"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', display: 'block' }}>settings</span>
        </button>
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1px solid #3b4b3e',
            cursor: 'pointer',
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh3Xenpj53jP2WJiVBJVccUACpn74XsTq8GOFfBSpmwMiroBxwAiIoeqet6mmOQw-T8c-a9xTrYpKzG5hT_C_94TQSKFYODxbSmhP16ZHXaaRyarsepIOdJCl0cuEa8xe_2mEmzaJOHA4Xl1MHJI7j8S1tEyr_KCUm5_-nKiUQzZR4t-SuObv2ynIgJtEvJ5E6G4F5lOWX2CCBbXsR8VBLinDNJB8V2BoCSirnj-nNDj-kARYxSq2z_yiqqpAV0IBVsaSi98KS_8Mb"
            alt="Summoner Profile Avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </nav>
  );
}
