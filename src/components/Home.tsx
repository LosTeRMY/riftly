import { useState } from 'react';

const REGIONS = ['EUW', 'NA', 'KR', 'EUNE'];

const TRENDING = [
  { label: 'Faker#KR1', href: '#' },
  { label: 'Caps#EUW', href: '#' },
];

export default function Home() {
  const [region, setRegion] = useState('EUW');
  const [query, setQuery] = useState('');

  return (
    <main style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 2rem',
      position: 'relative',
      overflow: 'hidden',  
    }}>

      {/* Glow — atmosphérique, discret, décroissance lente */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1100px',
        height: '800px',
        background: `radial-gradient(ellipse at center,
          rgba(0, 255, 148, 0.042) 0%,
          rgba(0, 255, 148, 0.034) 10%,
          rgba(0, 255, 148, 0.024) 22%,
          rgba(0, 255, 148, 0.016) 35%,
          rgba(0, 255, 148, 0.009) 48%,
          rgba(0, 255, 148, 0.004) 60%,
          rgba(0, 255, 148, 0.001) 72%,
          transparent 82%)`,
        pointerEvents: 'none',
      }} />



      <div style={{
        width: '100%',
        maxWidth: '48rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* Titre — text-5xl md:text-7xl font-bold text-primary tracking-tight */}
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(3rem, 7vw, 4.5rem)',
          fontWeight: 700,
          color: '#f2fff1',
          letterSpacing: '-0.02em',
          marginBottom: '3rem',
          textAlign: 'center',
          lineHeight: 1.1,
        }}>
          Track your game
        </h1>

        {/* Search bar — bg-surface-container-low p-2 gap-2 rounded-xl border border-outline-variant/30 */}
        <div
          className="glow-effect"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#1b1b20',
            border: '1px solid rgba(59, 75, 62, 0.3)',
            borderRadius: '0.5rem',
            transition: 'box-shadow 0.5s',
          }}
        >
          {/* Region selector — bg-surface-container rounded-lg px-4 py-4 w-32 */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{
                appearance: 'none',
                width: '8rem',
                backgroundColor: '#1f1f25',
                color: '#e4e1e9',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.875rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '1rem 2.5rem 1rem 1rem',
                borderRadius: '0.25rem',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div style={{
              position: 'absolute',
              top: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              paddingRight: '0.75rem',
              pointerEvents: 'none',
              color: '#b9cbbb',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>expand_more</span>
            </div>
          </div>

          {/* Input — flex-grow text-lg px-4 py-4 */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Summoner Name + #TAG"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e4e1e9',
              fontFamily: 'Manrope, sans-serif',
              fontSize: '1.125rem',
              padding: '1rem',
            }}
          />

          {/* Button — bg-primary-container text-on-primary-container px-8 py-4 rounded-lg shadow */}
          <button
            className="group"
            style={{
              flexShrink: 0,
              backgroundColor: '#00ff94',
              color: '#00713f',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '1rem 2rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 0 20px rgba(0, 255, 148, 0.2)',
              transition: 'background-color 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f2fff1')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#00ff94')}
          >
            Search
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        </div>

        {/* Trending — mt-8 text-sm text-on-surface-variant */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.875rem',
          color: '#b9cbbb',
        }}>
          <span style={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.15em', opacity: 0.5 }}>
            Trending:
          </span>
          {TRENDING.map((item, i) => (
            <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a
                href={item.href}
                style={{ color: '#b9cbbb', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#00ff94')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#b9cbbb')}
              >
                {item.label}
              </a>
              {i < TRENDING.length - 1 && <span style={{ opacity: 0.3 }}>•</span>}
            </span>
          ))}
        </div>

      </div>
    </main>
  );
}
