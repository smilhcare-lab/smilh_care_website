import { Link } from 'react-router-dom'
import LogoWordmark from './LogoWordmark'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--navy-deep)', color: 'white', paddingTop: '4rem', paddingBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(232,25,75,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(42,63,153,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container-sc" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="footer-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginBottom: '3rem' }}
        >

          {/* Brand */}
          <div className="footer-brand">
            <div style={{ marginBottom: '1rem' }}>
              <LogoWordmark variant="white" height={44} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', fontSize: '0.875rem', maxWidth: '240px', marginBottom: '1.25rem' }}>
              Votre partenaire de confiance pour les services à domicile. Bienveillance, professionnalisme et disponibilité 7j/7.
            </p>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {[
                { href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
                { href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', marginBottom: '1.25rem', color: 'white' }}>Nos Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {["Aide aux personnes âgées", "Ménage & repassage", "Garde d'enfants", "Accompagnement", "Assistance administrative"].map(s => (
                <li key={s}>
                  <Link
                    to="/services"
                    style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" style={{ flexShrink: 0 }}><circle cx="3" cy="3" r="2.5" fill="#E8194B" /></svg>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', marginBottom: '1.25rem', color: 'white' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {[['/', 'Accueil'], ['/services', 'Services'], ['/pourquoi-nous', 'Pourquoi Nous'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', marginBottom: '1.25rem', color: 'white' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13.68a19.79 19.79 0 01-3.07-8.67A2 2 0 012 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17z" /></svg>, text: 'Disponible 7j/7' },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, text: 'contact@smilhcare.com' },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>, text: 'France — Service National' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <span style={{ color: 'var(--crimson)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
            © {year} Smile Care. Tous droits réservés.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
            Plus qu'un service, une présence.
          </p>
        </div>
      </div>
    </footer>
  )
}
