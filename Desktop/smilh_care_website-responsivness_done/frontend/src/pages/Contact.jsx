import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import LogoWordmark from '../components/LogoWordmark'

const SERVICES = [
  'Aide aux personnes âgées et en situation de handicap',
  'Ménage & repassage',
  "Garde d'enfants",
  'Accompagnement (courses, sorties, rendez-vous)',
  'Assistance administrative',
  'Autre / Accompagnement personnalisé',
]

const INFO_ITEMS = [
  { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13.68a19.79 19.79 0 01-3.07-8.67A2 2 0 012 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17z" /></svg>), label: 'Disponibilité', value: '7 jours sur 7' },
  { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>), label: 'Email', value: 'contact@smilhcare.com' },
  { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>), label: 'Réponse', value: 'Sous 24 heures' },
  { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>), label: 'Zone', value: 'France — Service National' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const revealRef = useReveal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur serveur')
      setStatus('success')
      setForm({ name: '', phone: '', email: '', service: '', message: '' })
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <div ref={revealRef} style={{ paddingTop: '64px' }}>

      {/* HERO */}
      <section style={{ padding: '4rem 0 3rem', background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(232,25,75,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-sc" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="animate-fade-up">
            <div className="divider" style={{ margin: '0 auto 1.25rem' }} />
          </div>
          <h1 className="animate-fade-up delay-100" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: 'var(--ink)', marginBottom: '1rem', lineHeight: '1.15' }}>
            Parlons de vos besoins
          </h1>
          <p className="animate-fade-up delay-200" style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>
            Remplissez le formulaire et notre équipe vous recontactera sous 24h pour discuter de votre accompagnement.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="section-py-5" style={{ padding: '2rem 0 5rem', background: 'var(--cream)' }}>
        <div className="container-sc">
          <div
            className="contact-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '2.5rem', alignItems: 'start' }}
          >

            {/* LEFT: Info */}
            <div>
              <div className="reveal" style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <LogoWordmark variant="color" height={48} />
                </div>
                <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
                  Chez Smile Care, chaque client est unique. Nous nous engageons à vous offrir un service personnalisé, fiable et humain.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {INFO_ITEMS.map((item, i) => (
                  <div
                    key={item.label}
                    className={`reveal reveal-delay-${i + 1}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', background: 'white', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid var(--border)' }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: i % 2 === 0 ? 'var(--crimson-pale)' : 'var(--navy-pale)', color: i % 2 === 0 ? 'var(--crimson)' : 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>{item.label}</div>
                      <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '0.9rem' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo badge */}
              <div className="reveal" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%)', borderRadius: '18px', padding: '1.5rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-24px', right: '-24px', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(232,25,75,0.2) 0%, transparent 70%)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" />
                      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
                    </svg>
                  </div>
                  <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1rem', marginBottom: '0.4rem' }}>Offre de bienvenue</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', lineHeight: '1.6' }}>
                    Profitez de <strong style={{ color: 'white' }}>-10% sur votre première prestation</strong>. Offre valable pour tout nouveau client.
                  </p>
                  <div style={{ display: 'inline-block', marginTop: '0.875rem', background: 'var(--crimson)', borderRadius: '100px', padding: '0.3rem 0.875rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    -10% OFFRE DE BIENVENUE
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div
              className="reveal contact-form-box"
              style={{ background: 'white', borderRadius: '24px', padding: '2.25rem', border: '1px solid var(--border)', boxShadow: '0 20px 80px rgba(27,47,126,0.08)' }}
            >
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', color: 'var(--navy)', marginBottom: '0.4rem' }}>
                Demande de devis gratuit
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>Sans engagement. Réponse garantie sous 24h.</p>

              {status === 'success' && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#166534', fontSize: '0.875rem', fontWeight: 500 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  Message envoyé ! Nous vous rappellerons très bientôt.
                </div>
              )}
              {status === 'error' && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#991b1b', fontSize: '0.875rem', fontWeight: 500 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Nom complet *</label>
                    <input required type="text" className="input-sc" placeholder="Jean Dupont" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Téléphone *</label>
                    <input required type="tel" className="input-sc" placeholder="+33 6 00 00 00 00" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                    Email <span style={{ color: 'var(--muted)', fontWeight: 400, textTransform: 'none', fontSize: '0.7rem' }}>(optionnel)</span>
                  </label>
                  <input type="email" className="input-sc" placeholder="jean.dupont@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Service souhaité *</label>
                  <select required className="input-sc" style={{ cursor: 'pointer' }} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Sélectionnez un service</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Votre message *</label>
                  <textarea required rows={4} className="input-sc" style={{ resize: 'none' }} placeholder="Décrivez votre besoin, vos disponibilités..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  onClick={handleSubmit}
                  style={{
                    width: '100%', padding: '0.95rem', borderRadius: '12px',
                    background: status === 'loading' ? 'var(--border)' : 'var(--crimson)',
                    color: status === 'loading' ? 'var(--muted)' : 'white',
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem',
                    border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s', letterSpacing: '0.02em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  }}
                  onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(232,25,75,0.35)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {status === 'loading' ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0" strokeDasharray="40" strokeDashoffset="10" /></svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" /></svg>
                    </>
                  )}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  En envoyant ce formulaire, vous acceptez que nous vous recontactions concernant votre demande.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
