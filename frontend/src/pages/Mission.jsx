import React from 'react';
import { Link } from 'react-router-dom';

export default function Mission() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-violet-900/10 blur-[150px] pointer-events-none" />

      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link to="/landing" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Sovereign Nexus
        </Link>
        <Link to="/landing" className="text-slate-400 hover:text-slate-200 transition text-sm">Retour</Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
          Notre Mission & Vision
        </h1>
        <div className="space-y-8 text-slate-300 leading-relaxed">
          <p className="text-lg">
            Sovereign Nexus a été fondé sur une idée simple mais puissante : redonner aux organisations et aux gestionnaires d'infrastructures le contrôle total de leurs données et de leurs systèmes d'exploitation physiques.
          </p>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-3">La Souveraineté des Données</h2>
            <p className="text-slate-400 text-sm">
              À une époque où la dépendance aux géants du cloud comporte des risques de sécurité majeurs et des coûts imprévisibles, nous proposons une alternative souveraine, locale et hautement résiliente.
            </p>
          </div>
          <p>
            Nous croyons en un avenir où la gestion technique de bâtiment (GTB), les objets connectés et les registres de sécurité fonctionnent sans intermédiaires, assurant ainsi une disponibilité continue et une intégrité parfaite de chaque information.
          </p>
        </div>
      </section>
    </div>
  );
}
