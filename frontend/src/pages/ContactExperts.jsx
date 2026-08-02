import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { nexusApi } from '../services/nexusApi';

export default function ContactExperts() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSent(true);
    try {
      await nexusApi.submitContactForm({ name, email, message });
      alert("Votre message a été transmis à l'équipe technique.");
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      alert("Erreur lors de l'envoi : " + err.message);
    } finally {
      setSent(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-violet-900/10 blur-[150px] pointer-events-none" />

      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link to="/landing" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Sovereign Nexus
        </Link>
        <Link to="/landing" className="text-slate-400 hover:text-slate-200 transition text-sm">Retour</Link>
      </nav>

      <section className="max-w-xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-4 text-center">Contacter nos experts</h1>
        <p className="text-slate-400 text-center mb-10">Pour toute demande de démonstration ou d'offre personnalisée.</p>

        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900 space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nom Complet</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-600"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Adresse Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-600"
              placeholder="jean.dupont@entreprise.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Votre Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="5"
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-600 resize-none"
              placeholder="Décrivez votre projet d'infrastructure..."
            />
          </div>

          <button
            type="submit"
            disabled={sent}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg font-medium text-white transition-all shadow-lg"
          >
            {sent ? "Transmission..." : "Envoyer le message"}
          </button>
        </form>
      </section>
    </div>
  );
}
