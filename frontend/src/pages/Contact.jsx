// frontend/src/pages/Contact.jsx
import { useState } from 'react';
import logo from '../assets/logo.png'; // Make sure the image is there

const SERVICES = [
  'Aide aux personnes âgées',
  'Ménage & entretien',
  'Garde d\'enfants',
  'Accompagnement médical',
  'Autre',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Brand Info */}
        <div className="space-y-8">
          <img src={logo} alt="Smilh Care Logo" className="h-20 w-auto" />
          <h1 className="text-4xl font-extrabold text-[#1B2F7E] leading-tight">
            Une Présence, <br />
            <span className="text-[#E8194B]">Ensemble Chaque Jour</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md">
            Besoin d'un accompagnement personnalisé ? Remplissez le formulaire et notre équipe vous contactera sous 24h pour discuter de vos besoins.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-slate-700">
              <span className="bg-[#1B2F7E]/10 p-3 rounded-full text-[#1B2F7E]">📍</span>
              <span>Basé en France - Service National</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-700">
              <span className="bg-[#E8194B]/10 p-3 rounded-full text-[#E8194B]">📞</span>
              <span>Disponibilité 7j/7</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-[#1B2F7E] mb-6">Demande de devis gratuit</h2>
          
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 animate-pulse">
              ✅ Message envoyé ! Nous vous rappellerons très bientôt.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
              ❌ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nom Complet</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E8194B] outline-none transition" 
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Téléphone</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E8194B] outline-none transition" 
                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email (Optionnel)</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E8194B] outline-none transition" 
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Service Souhaité</label>
              <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E8194B] outline-none transition bg-white"
                value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                <option value="">Sélectionnez un service</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Votre Message</label>
              <textarea required rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#E8194B] outline-none transition resize-none" 
                value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
            </div>

            <button type="submit" disabled={status === 'loading'}
              className="w-full py-4 bg-[#1B2F7E] hover:bg-[#152563] text-white font-bold rounded-xl shadow-lg transform active:scale-95 transition-all disabled:opacity-50">
              {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}