import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── Animated counter ── */
function Counter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 4)
          setCount(Math.round(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Healthcare SVG illustration (replaces hero.png) ── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 500" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      {/* Background */}
      <rect width="480" height="500" fill="#EEF1FF" />

      {/* Soft blobs */}
      <circle cx="380" cy="80" r="110" fill="rgba(27,47,126,0.07)" />
      <circle cx="80" cy="400" r="90" fill="rgba(232,25,75,0.06)" />
      <circle cx="240" cy="260" r="200" fill="rgba(255,255,255,0.5)" />

      {/* Caregiver figure */}
      {/* Body */}
      <ellipse cx="200" cy="360" rx="52" ry="70" fill="#1B2F7E" opacity="0.92" />
      {/* Scrubs detail */}
      <rect x="174" y="310" width="52" height="8" rx="4" fill="white" opacity="0.2" />
      {/* Head */}
      <circle cx="200" cy="240" r="38" fill="#FDDBB8" />
      {/* Hair */}
      <ellipse cx="200" cy="215" rx="38" ry="20" fill="#3D2B1F" />
      {/* Face features */}
      <circle cx="190" cy="244" r="4" fill="#5D3E2A" />
      <circle cx="210" cy="244" r="4" fill="#5D3E2A" />
      <path d="M191 258 Q200 266 209 258" stroke="#5D3E2A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Arms */}
      <ellipse cx="152" cy="325" rx="18" ry="38" fill="#1B2F7E" opacity="0.85" transform="rotate(-15 152 325)" />
      <ellipse cx="248" cy="320" rx="18" ry="38" fill="#1B2F7E" opacity="0.85" transform="rotate(15 248 320)" />
      {/* Hands */}
      <circle cx="143" cy="362" r="13" fill="#FDDBB8" />
      <circle cx="257" cy="355" r="13" fill="#FDDBB8" />

      {/* Elderly patient seated */}
      {/* Chair */}
      <rect x="270" y="340" width="90" height="10" rx="5" fill="#C8C0B8" />
      <rect x="270" y="350" width="10" height="50" rx="5" fill="#C8C0B8" />
      <rect x="350" y="350" width="10" height="50" rx="5" fill="#C8C0B8" />
      <rect x="345" y="285" width="10" height="65" rx="5" fill="#C8C0B8" />
      {/* Body */}
      <ellipse cx="315" cy="325" rx="38" ry="50" fill="#E8E0D8" />
      <ellipse cx="315" cy="360" rx="32" ry="42" fill="#D4CAC0" />
      {/* Head */}
      <circle cx="315" cy="280" r="30" fill="#FDDBB8" />
      {/* White hair */}
      <ellipse cx="315" cy="258" rx="30" ry="16" fill="white" opacity="0.9" />
      {/* Face */}
      <circle cx="307" cy="284" r="3" fill="#7A5C4A" />
      <circle cx="323" cy="284" r="3" fill="#7A5C4A" />
      <path d="M308 295 Q315 301 322 295" stroke="#7A5C4A" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Wrinkles */}
      <path d="M303 278 Q307 275 311 278" stroke="#C0A090" strokeWidth="1.5" fill="none" />
      <path d="M319 278 Q323 275 327 278" stroke="#C0A090" strokeWidth="1.5" fill="none" />

      {/* Medical cross on caregiver shirt */}
      <rect x="193" y="308" width="14" height="4" rx="2" fill="#E8194B" />
      <rect x="198" y="303" width="4" height="14" rx="2" fill="#E8194B" />

      {/* Heart icon floating */}
      <g transform="translate(100,140)" opacity="0.9">
        <circle cx="28" cy="28" r="28" fill="white" />
        <path d="M28 38 C28 38 14 28 14 20 C14 15.5 17.5 12 22 12 C24.5 12 26.8 13.2 28 15 C29.2 13.2 31.5 12 34 12 C38.5 12 42 15.5 42 20 C42 28 28 38 28 38Z" fill="#E8194B" />
      </g>

      {/* Pill / medicine icon */}
      <g transform="translate(360,180)" opacity="0.85">
        <circle cx="22" cy="22" r="22" fill="white" />
        <ellipse cx="22" cy="22" rx="10" ry="16" fill="#E8194B" opacity="0.15" transform="rotate(40 22 22)" />
        <rect x="12" y="20" width="20" height="4" rx="2" fill="white" transform="rotate(40 22 22)" />
        <ellipse cx="22" cy="22" rx="10" ry="16" stroke="#1B2F7E" strokeWidth="2" fill="none" transform="rotate(40 22 22)" />
      </g>

      {/* Stethoscope icon */}
      <g transform="translate(360,300)" opacity="0.85">
        <circle cx="22" cy="22" r="22" fill="white" />
        <path d="M14 14 Q14 24 22 24 Q30 24 30 14" stroke="#1B2F7E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <line x1="22" y1="24" x2="22" y2="32" stroke="#1B2F7E" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="22" cy="34" r="4" fill="#E8194B" />
      </g>

      {/* Hand holding hand */}
      <g transform="translate(108,310)" opacity="0.7">
        <circle cx="20" cy="20" r="20" fill="white" />
        <path d="M10 20 Q15 14 20 18 Q25 14 30 20" stroke="#E8194B" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M12 22 Q20 30 28 22" stroke="#1B2F7E" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Decorative dots */}
      {[40, 60, 80].map(x => (
        <circle key={x} cx={x} cy={160 + (x - 40)} r="3.5" fill="#1B2F7E" opacity="0.15" />
      ))}
      {[400, 420, 440].map(x => (
        <circle key={x} cx={x} cy={440 + (x - 400) * 0.5} r="3.5" fill="#E8194B" opacity="0.15" />
      ))}

      {/* Bottom wave */}
      <path d="M0 470 Q120 450 240 465 Q360 480 480 460 L480 500 L0 500Z" fill="rgba(27,47,126,0.06)" />
    </svg>
  )
}

const SERVICES_PREVIEW = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>, title: 'Aide aux personnes âgées', desc: 'Présence rassurante et assistance personnalisée pour préserver l\'autonomie à domicile.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, title: 'Ménage & repassage', desc: 'Entretien complet de votre logement, réalisé avec soin, discrétion et efficacité.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>, title: 'Garde d\'enfants', desc: 'Une garde bienveillante, adaptée à chaque enfant, dans un environnement chaleureux.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, title: 'Accompagnement', desc: 'Courses, sorties, rendez-vous médicaux — nous sommes à vos côtés partout.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>, title: 'Assistance administrative', desc: 'Simplification de vos démarches : Carte Vitale, titre de séjour, CNI et plus.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: 'Accompagnement personnalisé', desc: 'Chaque client est unique. Nous adaptons chaque prestation à vos besoins spécifiques.' },
]

const VALUES = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>, title: 'Bienveillance', desc: 'L\'humain est au cœur de chaque accompagnement.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>, title: 'Professionnalisme', desc: 'Des prestations sérieuses, ponctuelles et de qualité.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>, title: 'Proximité', desc: 'À l\'écoute permanente de vos besoins.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>, title: 'Confiance', desc: 'Une relation durable construite sur la transparence.' },
]

export default function Home() {
  const revealRef = useReveal()
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={revealRef}>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--cream)',
      }}>
        {/* BG shapes */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(27,47,126,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(232,25,75,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Dots — desktop only */}
        <div className="hidden-mobile" style={{ position: 'absolute', top: '15%', right: '5%', opacity: 0.3, pointerEvents: 'none' }}>
          {[...Array(6)].map((_, r) => (
            <div key={r} style={{ display: 'flex', gap: '18px', marginBottom: '18px' }}>
              {[...Array(6)].map((_, c) => (
                <div key={c} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--navy)' }} />
              ))}
            </div>
          ))}
        </div>

        <div className="container-sc" style={{ paddingTop: '80px', paddingBottom: '60px', width: '100%' }}>
          <div
            className="hero-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          >

            {/* Left: Text */}
            <div className="hero-text-col">
              {/* Badge */}
              <div
                className={heroVisible ? 'animate-fade-up' : ''}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(232,25,75,0.08)', borderRadius: '100px',
                  padding: '0.4rem 1rem', marginBottom: '1.5rem',
                  opacity: heroVisible ? undefined : 0,
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--crimson)', display: 'inline-block' }} className="animate-pulse-ring" />
                <span style={{ color: 'var(--crimson)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Disponible 7j/7
                </span>
              </div>

              {/* Headline */}
              <h1
                className={heroVisible ? 'animate-fade-up delay-100' : ''}
                style={{
                  fontFamily: 'DM Serif Display, serif',
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  lineHeight: '1.12',
                  color: 'var(--ink)',
                  marginBottom: '1.25rem',
                  opacity: heroVisible ? undefined : 0,
                }}
              >
                Votre bien-être<br />
                à domicile,<br />
                <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>notre priorité.</em>
              </h1>

              {/* Sub */}
              <p
                className={heroVisible ? 'animate-fade-up delay-200' : ''}
                style={{
                  fontSize: '1rem', lineHeight: '1.75', color: 'var(--muted)',
                  maxWidth: '480px', marginBottom: '2rem',
                  opacity: heroVisible ? undefined : 0,
                }}
              >
                Chez Smile Care, nous mettons tout en œuvre pour vous offrir des services à domicile fiables, humains et adaptés à vos besoins — avec le sourire.
              </p>

              {/* CTAs */}
              <div
                className={`hero-ctas ${heroVisible ? 'animate-fade-up delay-300' : ''}`}
                style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '2.5rem', opacity: heroVisible ? undefined : 0 }}
              >
                <Link to="/contact" className="btn-primary">
                  Demande de devis gratuit
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link to="/services" className="btn-outline">
                  Nos services
                </Link>
              </div>

              {/* Trust badges */}
              <div
                className={`hero-trust-badges ${heroVisible ? 'animate-fade-up delay-400' : ''}`}
                style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', opacity: heroVisible ? undefined : 0 }}
              >
                {[
                  { icon: '✓', text: 'Écoute & accompagnement' },
                  { icon: '✓', text: 'Discrétion garantie' },
                  { icon: '✓', text: 'Réponse sous 24h' },
                ].map(b => (
                  <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'rgba(232,25,75,0.1)', color: 'var(--crimson)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                    }}>{b.icon}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500 }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Illustration card */}
            <div
              className={`hero-img-col ${heroVisible ? 'animate-scale-in delay-200' : ''}`}
              style={{ opacity: heroVisible ? undefined : 0, position: 'relative' }}
            >
              {/* Main illustration */}
              <div style={{
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(27,47,126,0.18)',
              }}>
                <HeroIllustration />
                {/* Overlay gradient */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(27,47,126,0.2) 0%, transparent 60%)',
                }} />
              </div>

              {/* Floating stat card */}
              <div
                className="animate-float hero-float-stat"
                style={{
                  position: 'absolute', bottom: '-24px', left: '-32px',
                  background: 'white', borderRadius: '20px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 20px 60px rgba(27,47,126,0.15)',
                  display: 'flex', flexDirection: 'column', gap: '0.25rem', zIndex: 2,
                }}
              >
                <span className="float-num" style={{ fontSize: '2rem', fontFamily: 'DM Serif Display, serif', color: 'var(--navy)', lineHeight: 1 }}>
                  <Counter target={100} suffix="%" />
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>Clients satisfaits</span>
              </div>

              {/* Floating badge top-right */}
              <div
                className="animate-float hero-float-badge"
                style={{
                  position: 'absolute', top: '24px', right: '-20px',
                  background: 'var(--crimson)', borderRadius: '16px',
                  padding: '0.75rem 1rem', color: 'white',
                  boxShadow: '0 12px 40px rgba(232,25,75,0.35)',
                  animationDelay: '1.5s', zIndex: 2,
                }}
              >
                <div className="badge-num" style={{ fontSize: '1.5rem', fontFamily: 'DM Serif Display, serif', lineHeight: 1 }}>6</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.04em', opacity: 0.9 }}>Services</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue — hidden on mobile to save space */}
        <div className="hidden-mobile" style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Découvrir</span>
          <div style={{ width: '28px', height: '44px', border: '2px solid var(--border)', borderRadius: '14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6px' }}>
            <div style={{ width: '4px', height: '10px', borderRadius: '2px', background: 'var(--navy)', animation: 'scrollDot 1.8s ease-in-out infinite' }} />
          </div>
          <style>{`@keyframes scrollDot { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(12px); opacity: 0.3; } }`}</style>
        </div>
      </section>

      {/* ═══ MARQUEE STRIP ═══ */}
      <div style={{ background: 'var(--navy)', padding: '0.875rem 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '0' }} className="animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '0', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {['Aide à domicile', 'Bienveillance', 'Ménage & Repassage', 'Garde d\'enfants', 'Accompagnement', 'Discrétion', 'Assistance administrative', 'Disponible 7j/7', 'Confiance', 'Proximité'].map(t => (
                <span key={t} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 1.5rem' }}>
                  {t}
                  <span style={{ color: 'var(--crimson)', marginLeft: '1.5rem' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <section className="section-py-5" style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container-sc">
          <div
            className="stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}
          >
            {[
              { value: 6, suffix: '', label: 'Services disponibles', color: 'var(--navy)' },
              { value: 7, suffix: 'j/7', label: 'Disponibilité', color: 'var(--crimson)' },
              { value: 100, suffix: '%', label: 'Satisfaction client', color: 'var(--navy)' },
              { value: 24, suffix: 'h', label: 'Réponse garantie', color: 'var(--crimson)' },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`reveal reveal-delay-${i + 1}`}
                style={{ textAlign: 'center', padding: '1.75rem 1.25rem', borderRadius: '20px', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', bottom: 0, right: 0, fontFamily: 'DM Serif Display, serif', fontSize: '4rem', color: s.color, opacity: 0.04, lineHeight: 1, userSelect: 'none' }}>
                  {s.value}{s.suffix}
                </div>
                <div className="stat-num" style={{ fontFamily: 'DM Serif Display, serif', fontSize: '2.8rem', color: s.color, lineHeight: 1, marginBottom: '0.5rem' }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES PREVIEW ═══ */}
      <section className="section-py-7" style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container-sc">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
            <div className="divider" style={{ margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--ink)', marginBottom: '1rem' }}>
              Des services sur mesure<br />
              <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>pour vous simplifier la vie</em>
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              Chaque prestation est pensée pour répondre à vos besoins spécifiques, avec professionnalisme et discrétion.
            </p>
          </div>

          {/* Grid */}
          <div
            className="services-preview-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}
          >
            {SERVICES_PREVIEW.map((s, i) => (
              <div
                key={s.title}
                className={`card-hover reveal reveal-delay-${(i % 3) + 1}`}
                style={{
                  background: 'white', borderRadius: '20px', padding: '1.75rem',
                  border: '1px solid var(--border)', cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(232,25,75,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-8px', right: '1rem', fontFamily: 'DM Serif Display, serif', fontSize: '4rem', color: 'var(--navy)', opacity: 0.04, lineHeight: 1, userSelect: 'none' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--navy-pale)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.6rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: '1.65' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center' }}>
            <Link to="/services" className="btn-primary">
              Voir tous nos services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY US TEASER ═══ */}
      <section className="section-py-7" style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container-sc">
          <div
            className="values-why-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          >
            {/* Left: values grid */}
            <div>
              <div
                className="values-inner-grid"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}
              >
                {VALUES.map((v, i) => (
                  <div
                    key={v.title}
                    className={`reveal reveal-delay-${i + 1}`}
                    style={{
                      background: i % 2 === 0 ? 'var(--navy)' : 'var(--navy-pale)',
                      borderRadius: '18px', padding: '1.5rem',
                      color: i % 2 === 0 ? 'white' : 'var(--ink)',
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: i % 2 === 0 ? 'rgba(255,255,255,0.15)' : 'var(--navy-pale)', color: i % 2 === 0 ? 'white' : 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>{v.icon}</div>
                    <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', marginBottom: '0.4rem', color: i % 2 === 0 ? 'white' : 'var(--navy)' }}>{v.title}</h4>
                    <p style={{ fontSize: '0.82rem', opacity: i % 2 === 0 ? 0.75 : undefined, color: i % 2 === 0 ? undefined : 'var(--muted)', lineHeight: '1.6' }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: text */}
            <div>
              <div className="reveal">
                <div className="divider" style={{ marginBottom: '1.25rem' }} />
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--ink)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
                  Pourquoi choisir<br />
                  <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>Smile Care ?</em>
                </h2>
                <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  Nous ne sommes pas seulement un service — nous sommes une présence rassurante. Chaque accompagnement est réalisé avec écoute, respect et discrétion.
                </p>
                <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  Notre équipe s'engage à garantir votre confort et votre tranquillité d'esprit, en adaptant chaque prestation à votre situation personnelle.
                </p>
                <Link to="/pourquoi-nous" className="btn-outline">
                  Nos engagements
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="section-py-7" style={{ padding: '6rem 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(232,25,75,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-sc" style={{ position: 'relative', zIndex: 1 }}>
          <div className="testimonial-inner reveal" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '6rem', color: 'var(--crimson)', lineHeight: 0.5, marginBottom: '2rem', opacity: 0.4 }}>"</div>
            <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 3vw, 1.9rem)', color: 'white', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '2rem' }}>
              Service sérieux, personne très attentionnée. Notre mère a retrouvé le sourire depuis que Smile Care l'accompagne chaque semaine. Une vraie présence, une vraie confiance.
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', color: 'white', flexShrink: 0 }}>M</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Marie D.</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>Cliente Smile Care</div>
              </div>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#fbbf24', fontSize: '0.95rem' }}>★</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA BAND ═══ */}
      <section className="section-py-6" style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container-sc">
          <div
            className="reveal cta-band-box"
            style={{
              background: 'white', borderRadius: '28px', padding: '3.5rem',
              border: '1px solid var(--border)', position: 'relative',
              overflow: 'hidden', boxShadow: '0 20px 80px rgba(27,47,126,0.08)',
            }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(232,25,75,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div
              className="cta-band-inner"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}
            >
              <div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                  Prêt à simplifier votre quotidien ?
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                  Devis gratuit, réponse sous 24h. Sans engagement.
                </p>
              </div>
              <Link to="/contact" className="btn-primary" style={{ flexShrink: 0, fontSize: '0.95rem', padding: '0.9rem 2rem' }}>
                Contactez-nous
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
