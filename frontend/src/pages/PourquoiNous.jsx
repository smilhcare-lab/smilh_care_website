import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const REASONS = [
  {
    number: '01',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" /></svg>,
    title: 'Écoute & accompagnement personnalisé',
    desc: 'Nous prenons le temps de comprendre votre situation unique avant toute intervention. Chaque client bénéficie d\'une évaluation personnalisée et d\'un plan d\'accompagnement sur mesure.',
    color: 'var(--navy)',
    bg: '#eef1ff',
  },
  {
    number: '02',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    title: 'Professionnalisme & discrétion',
    desc: 'Nos intervenants sont sélectionnés pour leur sérieux, leur savoir-faire et leur sens de la discrétion. Chaque prestation est réalisée avec rigueur et respect de votre espace privé.',
    color: 'var(--crimson)',
    bg: '#fff0f3',
  },
  {
    number: '03',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    title: 'Services fiables & adaptés',
    desc: "Nos services s'adaptent à l'évolution de vos besoins. Que votre situation change ou que vos attentes évoluent, nous ajustons notre accompagnement en conséquence.",
    color: 'var(--navy)',
    bg: '#eef1ff',
  },
  {
    number: '04',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
    title: 'Relation de confiance durable',
    desc: 'Nous construisons une relation de confiance sur le long terme avec chaque client. La régularité de nos intervenants vous permet de tisser un lien humain authentique et rassurant.',
    color: 'var(--crimson)',
    bg: '#fff0f3',
  },
  {
    number: '05',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    title: 'Disponibilité 7j/7',
    desc: 'Parce que les besoins n\'ont pas d\'horaires, Smile Care est disponible tous les jours de la semaine. Réponse garantie sous 24h pour toute demande, et intervention flexible selon vos disponibilités.',
    color: 'var(--navy)',
    bg: '#eef1ff',
  },
]

const COMMITMENTS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    label: 'Évaluation gratuite', desc: 'Un premier entretien sans engagement pour comprendre vos besoins.'
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    label: 'Réponse en 24h', desc: 'Nous vous recontactons rapidement pour organiser votre accompagnement.'
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>,
    label: 'Flexibilité totale', desc: 'Modifications, annulations, ajustements — sans frais cachés.'
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
    label: 'Confidentialité', desc: 'Vos informations personnelles restent strictement confidentielles.'
  },
]

export default function PourquoiNous() {
  const revealRef = useReveal()

  return (
    <div ref={revealRef} style={{ paddingTop: '72px' }}>

      {/* ═══════ HERO ═══════ */}
      <section style={{
        padding: '6rem 0 5rem',
        background: 'var(--cream)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(27,47,126,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Large background SC watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontFamily: 'DM Serif Display, serif', fontSize: '30vw',
          color: 'rgba(27,47,126,0.03)', fontWeight: 700, lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          SC
        </div>

        <div className="container-sc" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <div className="animate-fade-up" style={{ marginBottom: '1.25rem' }}>
              <div className="divider" style={{ margin: '0 auto' }} />
            </div>
            <h1 className="animate-fade-up delay-100" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', color: 'var(--ink)', marginBottom: '1.25rem', lineHeight: '1.15' }}>
              Pourquoi choisir<br />
              <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>Smile Care ?</em>
            </h1>
            <p className="animate-fade-up delay-200" style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.75', maxWidth: '580px', margin: '0 auto 2.5rem' }}>
              Chez Smile Care, nous ne nous contentons pas de fournir un service. Nous nous engageons à construire une relation de confiance durable, fondée sur le respect et la bienveillance.
            </p>
            <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                Nous contacter
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/services" className="btn-outline">
                Nos services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 5 REASONS ═══════ */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container-sc">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {REASONS.map((r, i) => (
              <div
                key={r.title}
                className={`reveal reveal-delay-${(i % 3) + 1} reasons-block`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 2.5fr' : '2.5fr 1fr',
                  gap: '0',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  minHeight: '200px',
                }}
              >
                {/* Number panel */}
                <div
                  className="number-panel"
                  style={{
                    background: i % 2 === 0 ? r.color : 'white',
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    order: i % 2 === 0 ? 0 : 1,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', bottom: '-20px', right: '-10px',
                    fontFamily: 'DM Serif Display, serif', fontSize: '8rem',
                    color: i % 2 === 0 ? 'rgba(255,255,255,0.07)' : 'rgba(27,47,126,0.06)',
                    lineHeight: 1, fontWeight: 700,
                  }}>
                    {r.number}
                  </div>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: i % 2 === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(27,47,126,0.1)', color: i % 2 === 0 ? 'white' : r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>{r.icon}</div>
                  <span style={{
                    fontFamily: 'DM Serif Display, serif',
                    fontSize: '3rem',
                    color: i % 2 === 0 ? 'white' : r.color,
                    lineHeight: 1,
                    fontWeight: 400,
                  }}>
                    {r.number}
                  </span>
                </div>

                {/* Content panel */}
                <div
                  className="content-panel"
                  style={{
                    background: r.bg,
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    order: i % 2 === 0 ? 1 : 0,
                  }}
                >
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '1rem', lineHeight: '1.3' }}>
                    {r.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '0.95rem', maxWidth: '520px' }}>
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ COMMITMENTS GRID ═══════ */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container-sc">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="divider" style={{ margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--ink)' }}>
              Nos engagements concrets
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {COMMITMENTS.map((c, i) => (
              <div
                key={c.label}
                className={`card-hover reveal reveal-delay-${i + 1}`}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '2rem',
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '20px',
                  background: i % 2 === 0 ? 'var(--navy-pale)' : 'var(--crimson-pale)',
                  color: i % 2 === 0 ? 'var(--navy)' : 'var(--crimson)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  {c.icon}
                </div>
                <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.6rem' }}>
                  {c.label}
                </h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ BANNER / CTA ═══════ */}
      <section style={{
        padding: '7rem 0',
        background: 'linear-gradient(135deg, var(--crimson) 0%, #c4103a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Large quotation mark watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'DM Serif Display, serif', fontSize: '40vw', color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>"</div>

        <div className="container-sc" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="reveal">
            <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Notre philosophie
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', lineHeight: '1.3', maxWidth: '700px', margin: '0 auto 1.5rem', fontWeight: 600 }}>
              "Smile Care, plus qu'un service :<br />une présence qui fait la différence."
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 3rem' }}>
              Avec Smile Care, vous bénéficiez d'un accompagnement personnalisé et d'une présence rassurante au quotidien. Nous sommes là pour vous simplifier la vie… avec le sourire.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '1rem 2.5rem', background: 'white', color: 'var(--crimson)',
                fontWeight: 700, fontSize: '0.95rem', borderRadius: '100px',
                textDecoration: 'none', transition: 'all 0.3s',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)'; }}
              >
                Demander un devis gratuit
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/services" className="btn-outline-white">
                Voir nos services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
