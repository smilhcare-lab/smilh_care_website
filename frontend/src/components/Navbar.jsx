import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoWordmark from './LogoWordmark'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/services', label: 'Services' },
    { to: '/pourquoi-nous', label: 'Pourquoi Nous' },
  ]

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        background: scrolled ? 'rgba(250,248,245,0.97)' : 'rgba(250,248,245,0.97)',
        backdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(232,230,225,0.9)' : '1px solid rgba(232,230,225,0.5)',
        boxShadow: scrolled ? '0 4px 30px rgba(27,47,126,0.08)' : 'none',
      }}
    >
      <div className="container-sc" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <LogoWordmark variant="color" height={44} />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hidden-mobile">
          <Link to="/contact" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
            Devis gratuit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem',
            flexDirection: 'column', gap: '5px', zIndex: 1001,
          }}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: 'var(--navy)', borderRadius: '2px',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: 'var(--navy)', borderRadius: '2px',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: 'var(--navy)', borderRadius: '2px',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={{
        position: 'absolute', top: '100%', left: 0, right: 0,
        background: 'rgba(250,248,245,0.98)', backdropFilter: 'blur(20px)',
        borderBottom: menuOpen ? '1px solid var(--border)' : 'none',
        padding: menuOpen ? '1.5rem' : '0',
        maxHeight: menuOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: menuOpen ? '0 20px 60px rgba(27,47,126,0.1)' : 'none',
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {[...links, { to: '/contact', label: 'Contact' }].map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                padding: '0.875rem 1rem', borderRadius: '12px',
                color: location.pathname === l.to ? 'var(--crimson)' : 'var(--ink)',
                background: location.pathname === l.to ? 'var(--crimson-pale)' : 'transparent',
                fontWeight: 500, textDecoration: 'none', fontSize: '1rem',
                transition: 'all 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn-primary"
            style={{ marginTop: '0.75rem', justifyContent: 'center' }}
          >
            Devis gratuit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  )
}
