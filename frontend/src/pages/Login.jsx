import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CircuitBackground } from '../sovereign-site/components/CircuitBackground';
import { Building2, Mail, Lock, Loader2, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Connexion réussie !');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d041e] text-white flex items-center justify-center relative overflow-hidden font-sans">
      <CircuitBackground className="absolute inset-0 z-0 opacity-50" />

      <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-white/10 shadow-2xl relative z-10 glow-orange-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-4 border border-orange-500/30 glow-orange">
            <Building2 className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-3xl font-display font-bold tracking-widest uppercase text-glow-orange">
            CAFM Pro
          </h2>
          <p className="text-orange-400/80 mt-2 text-xs font-mono tracking-widest uppercase">
            Accès Sécurisé
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-white font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-white font-mono text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 btn-gradient-orange rounded-xl font-mono tracking-widest uppercase text-xs text-white transition-all transform hover:scale-[1.02] shadow-lg glow-orange mt-6 flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <>
                <Key className="w-4 h-4" />
                Se connecter
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-zinc-400 font-mono">
          Pas encore de compte ?{' '}
          <button onClick={() => navigate('/auth/register')} className="text-orange-400 hover:text-orange-300">
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
}
