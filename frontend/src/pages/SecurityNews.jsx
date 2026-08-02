import React from 'react';
import { Link } from 'react-router-dom';

export default function SecurityNews() {
  const news = [
    { title: "Vulnérabilités critiques dans les réseaux GTB classiques", date: "01 Août 2026", summary: "Une analyse des protocoles non sécurisés utilisés couramment dans la gestion technique de bâtiment et comment Sovereign Nexus immunise votre système." },
    { title: "Le standard Zero-Trust s'impose pour l'IoT résidentiel", date: "24 Juillet 2026", summary: "Les régulateurs européens recommandent l'application stricte de l'authentification forte à chaque niveau de capteur physique." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />

      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link to="/landing" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Sovereign Nexus
        </Link>
        <Link to="/landing" className="text-slate-400 hover:text-slate-200 transition text-sm">Retour</Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-4">Actualités & Veille de Sécurité</h1>
        <p className="text-slate-400 mb-12">Restez informé des menaces émergentes sur les infrastructures physiques connectées.</p>

        <div className="space-y-8">
          {news.map((item, index) => (
            <article key={index} className="p-8 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 transition">
              <span className="text-xs text-indigo-400 font-semibold">{item.date}</span>
              <h2 className="text-xl font-bold text-white mt-2 mb-3">{item.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
