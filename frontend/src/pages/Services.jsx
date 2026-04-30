import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const SERVICES = [
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
    number: '01',
    title: 'Aide aux personnes âgées et en situation de handicap',
    tagline: 'Une présence qui rassure, chaque jour.',
    desc: "Nous assurons une assistance au quotidien ainsi qu'une présence rassurante. Notre objectif est d'accompagner chaque personne dans les gestes de la vie courante afin de maintenir son autonomie et son bien-être à domicile.",
    details: [
      "Aide à la toilette et à l'habillage",
      'Préparation et aide aux repas',
      'Accompagnement pour les sorties',
      'Présence et compagnie',
      'Surveillance et sécurité au domicile',
      'Stimulation cognitive et activités',
    ],
    color: '#1B2F7E',
    bg: '#eef1ff',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    number: '02',
    title: 'Ménage et repassage',
    tagline: 'Un intérieur propre, un esprit serein.',
    desc: "Nous prenons en charge l'entretien complet de votre logement avec sérieux, efficacité et discrétion. Pour un intérieur propre, sain et agréable à vivre.",
    details: [
      'Nettoyage complet des pièces',
      'Aspiration et lavage des sols',
      'Nettoyage des sanitaires et cuisine',
      'Repassage et pliage du linge',
      'Rangement et organisation',
      'Nettoyage des vitres',
    ],
    color: '#E8194B',
    bg: '#fff0f3',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    number: '03',
    title: "Garde d'enfants",
    tagline: 'Sécurité, sourire et épanouissement.',
    desc: "Nous proposons une garde responsable, bienveillante et adaptée aux besoins de chaque enfant. Nous veillons à leur sécurité, leur confort et leur épanouissement dans un environnement chaleureux.",
    details: [
      'Garde à domicile (matin, soir, nuit)',
      'Aide aux devoirs',
      "Activités d'éveil et jeux",
      'Repas et bains',
      'Accompagnement école / crèche',
      'Garde de nuit ponctuelle',
    ],
    color: '#1B2F7E',
    bg: '#eef1ff',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    number: '04',
    title: 'Accompagnement',
    tagline: 'À vos côtés, partout où vous en avez besoin.',
    desc: 'Nous vous accompagnons dans vos déplacements du quotidien : courses, sorties, rendez-vous médicaux ou administratifs. Nous sommes à vos côtés partout où vous en avez besoin.',
    details: [
      'Courses alimentaires et commissions',
      'Rendez-vous médicaux',
      'Rendez-vous administratifs',
      'Sorties culturelles et loisirs',
      'Promenades et activités extérieures',
      'Démarches en mairie ou préfecture',
    ],
    color: '#E8194B',
    bg: '#fff0f3',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
    number: '05',
    title: 'Assistance administrative',
    tagline: "Simplifier vos démarches, c'est notre rôle.",
    desc: "Nous vous aidons dans vos démarches administratives complexes. De la carte Vitale à la régularisation de séjour, nous vous accompagnons pas à pas.",
    details: [
      'Demande / renouvellement carte Vitale',
      "Carte d'identité & permis de conduire",
      'Titre de séjour & carte de résidence',
      'Aide à la régularisation de séjour',
      'Courriers administratifs',
      'Démarches en ligne',
    ],
    color: '#1B2F7E',
    bg: '#eef1ff',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    number: '06',
    title: 'Accompagnement personnalisé',
    tagline: 'Sur mesure, parce que chacun est unique.',
    desc: "Vous avez un besoin spécifique qui ne rentre pas dans une case ? Nous sommes à l'écoute pour construire avec vous une solution sur mesure, adaptée à votre situation personnelle.",
    details: [
      'Évaluation personnalisée de vos besoins',
      "Plan d'accompagnement sur mesure",
      'Flexibilité des horaires',
      'Suivi régulier et ajustements',
      'Coordination avec la famille',
      'Devis gratuit sans engagement',
    ],
    color: '#E8194B',
    bg: '#fff0f3',
  },
]

export default function Services() {
  const revealRef = useReveal()
  const [activeService, setActiveService] = useState(null)

  return (
    <div ref={revealRef} style={{ paddingTop: '72px' }}>

      {/* ═══════ HERO ═══════ */}
      <section style={{
        padding: '6rem 0 5rem',
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(232,25,75,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Dot pattern */}
        <div style={{ position: 'absolute', top: '20%', left: '5%', opacity: 0.1, pointerEvents: 'none' }}>
          {[...Array(4)].map((_, r) => (
            <div key={r} style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              {[...Array(8)].map((_, c) => (
                <div key={c} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'white' }} />
              ))}
            </div>
          ))}
        </div>

        <div className="container-sc" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(232,25,75,0.2)', borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '1.5rem' }}>
            <span style={{ color: '#ff6b8a', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>6 Prestations</span>
          </div>
          <h1 className="animate-fade-up delay-100" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', color: 'white', marginBottom: '1.25rem', lineHeight: '1.15' }}>
            Des services pensés<br />
            <em style={{ color: '#ff6b8a', fontStyle: 'italic' }}>pour votre quotidien</em>
          </h1>
          <p className="animate-fade-up delay-200" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
            Chaque prestation Smile Care est conçue pour améliorer votre vie à domicile, avec professionnalisme et le sourire.
          </p>
          <div className="animate-fade-up delay-300">
            <Link to="/contact" className="btn-primary">
              Demande de devis gratuit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* Wave bottom */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#faf8f5" />
          </svg>
        </div>
      </section>

      {/* ═══════ SERVICES GRID ═══════ */}
      <section style={{ padding: '5rem 0 7rem', background: 'var(--cream)' }}>
        <div className="container-sc">
          <div
            className="services-grid-2col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`reveal reveal-delay-${(i % 2) + 1}`}
                style={{
                  background: 'white',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  border: `1px solid ${activeService === i ? s.color + '40' : 'var(--border)'}`,
                  boxShadow: activeService === i ? `0 20px 60px ${s.color}18` : '0 4px 20px rgba(0,0,0,0.04)',
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  transform: activeService === i ? 'translateY(-6px)' : 'translateY(0)',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Card header */}
                <div style={{ background: s.bg, padding: '2rem 2rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -10, fontFamily: 'DM Serif Display, serif', fontSize: '6rem', color: s.color, opacity: 0.07, fontWeight: 700, lineHeight: 1 }}>
                    {s.number}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'white', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>{s.icon}</div>
                      <span style={{ background: s.color, color: 'white', borderRadius: '100px', padding: '0.25rem 0.75rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {s.number}
                      </span>
                    </div>
                    <div style={{ color: s.color, opacity: 0.4, transition: 'all 0.3s', transform: activeService === i ? 'translate(3px, -3px)' : 'none' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '1.75rem 2rem 2rem' }}>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '0.4rem', lineHeight: '1.3' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: s.color, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em', marginBottom: '1rem', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
                    {s.tagline}
                  </p>
                  <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    {s.desc}
                  </p>

                  {/* Details list */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {s.details.map(d => (
                      <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--ink)' }}>
                        <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section style={{ padding: '5rem 0 7rem', background: 'white' }}>
        <div className="container-sc">
          <div
            className="reveal"
            style={{
              background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%)',
              borderRadius: '32px',
              padding: '4rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(232,25,75,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Vous avez un besoin spécifique ?</p>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'white', marginBottom: '1rem' }}>
              Obtenez votre devis gratuit
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
              Contactez-nous et nous vous proposerons une solution personnalisée adaptée à votre situation, sans engagement.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <Link to="/contact" className="btn-primary">
                Demander un devis
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/pourquoi-nous" className="btn-outline-white">
                Pourquoi nous choisir ?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
