import { Link } from 'react-router-dom'
import LogoWordmark from './LogoWordmark'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--navy-deep)', color: 'white', paddingTop: '5rem', paddingBottom: '2rem', position: 'relative', overflow: 'hidden' }}>

      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(232,25,75,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(42,63,153,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-sc" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <LogoWordmark variant="white" height={48} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', fontSize: '0.9rem', maxWidth: '260px' }}>
              Votre partenaire de confiance pour les services à domicile. Bienveillance, professionnalisme et disponibilité 7j/7.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {/* Facebook */}
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              {/* Instagram */}
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', marginBottom: '1.25rem', color: 'white' }}>Nos Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Aide aux personnes âgées', 'Ménage & repassage', 'Garde d\'enfants', 'Accompagnement', 'Assistance administrative'].map(s => (
                <li key={s}>
                  <Link to="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="4" cy="4" r="3" fill="#E8194B" />
                    </svg>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', marginBottom: '1.25rem', color: 'white' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[['/', 'Accueil'], ['/services', 'Services'], ['/pourquoi-nous', 'Pourquoi Nous'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', marginBottom: '1.25rem', color: 'white' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--crimson)', marginTop: '2px', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13.68a19.79 19.79 0 01-3.07-8.67A2 2 0 012 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17z" /></svg>
                </span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Disponible 7j/7</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--crimson)', marginTop: '2px', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>contact@smilhcare.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--crimson)', marginTop: '2px', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>France — Service National</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            © {year} Smile Care. Tous droits réservés.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            Plus qu'un service, une présence.
          </p>
        </div>
      </div>
    </footer>
  )
}
