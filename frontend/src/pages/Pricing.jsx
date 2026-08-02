import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { nexusApi } from '../services/nexusApi';

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data = await nexusApi.getPublicPricing();
        setPlans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />

      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link to="/landing" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Sovereign Nexus
        </Link>
        <Link to="/landing" className="text-slate-400 hover:text-slate-200 transition text-sm">Retour</Link>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Des Plans Adaptés à Votre Infrastructure
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-16">
          Choisissez la solution idéale pour sécuriser et automatiser vos résidences et réseaux d'appareils physiques.
        </p>

        {loading ? (
          <div className="text-slate-400">Chargement des tarifs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`p-8 rounded-2xl flex flex-col justify-between ${
                  plan.id === 'pro'
                    ? 'bg-slate-900/60 border border-blue-900/80 relative shadow-xl shadow-blue-500/5'
                    : 'bg-slate-900/30 border border-slate-900/80'
                }`}
              >
                {plan.id === 'pro' && (
                  <span className="absolute -top-3 right-6 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    Recommandé
                  </span>
                )}
                <div>
                  <h3 className={`text-lg font-bold ${plan.id === 'pro' ? 'text-white' : 'text-slate-300'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-extrabold text-white mt-4">
                    {plan.price}
                    {plan.price !== 'Sur Mesure' && (
                      <span className="text-sm font-normal text-slate-500"> / mois</span>
                    )}
                  </p>
                  <p className="text-slate-400 text-sm mt-4">{plan.description}</p>
                  <ul className="space-y-3 mt-6 text-sm text-slate-300">
                    {plan.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={plan.id === 'enterprise' ? '/contact' : '/auth/register'}
                  className={`w-full text-center py-3 rounded-lg mt-8 transition font-medium ${
                    plan.id === 'pro'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {plan.id === 'enterprise' ? 'Contacter l\'équipe' : 'Démarrer'}
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
