import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HelpCenter() {
  const [search, setSearch] = useState('');

  const faqs = [
    { q: "Comment configurer mon premier nœud ?", a: "Téléchargez le firmware officiel Nexus, flashez-le sur votre appareil, puis entrez le jeton fourni dans la section 'Mes Appareils'." },
    { q: "Les données sont-elles chiffrées de bout en bout ?", a: "Oui, toutes les transmissions de données sont chiffrées avec TLS 1.3 et stockées de manière cryptée et redondante." },
    { q: "Puis-je l'utiliser hors ligne ?", a: "Absolument. Sovereign Nexus prend en charge un mode local complet qui synchronise vos données dès que la connexion est rétablie." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link to="/landing" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Sovereign Nexus
        </Link>
        <Link to="/landing" className="text-slate-400 hover:text-slate-200 transition text-sm">Retour</Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-4 text-center">Centre d'aide & Documentation</h1>
        <p className="text-slate-400 text-center mb-10">Trouvez des réponses à vos questions techniques.</p>

        <div className="mb-12">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un sujet ou un problème..."
            className="w-full px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-500"
          />
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-xl bg-slate-900/40 border border-slate-900">
              <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
