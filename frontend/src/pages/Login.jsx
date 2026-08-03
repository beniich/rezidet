import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import CircuitBackground from '../sovereign-site/components/CircuitBackground';
import { Building2, Mail, Lock, Loader2, Key } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

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

  const handleGoogleSignIn = async () => {
    try {
      import('../lib/firebase').then(async ({ signInWithGoogle }) => {
        try {
          const { idToken } = await signInWithGoogle();
          const { data } = await api.post('/auth/google', { idToken });
          useAuthStore.getState().setToken(data.token, data.user);
          toast.success('Connecté avec Google');
          navigate('/dashboard');
        } catch (err) {
          toast.error("Erreur Google: " + (err.response?.data?.error || err.message));
        }
      });
    } catch (err) {
      toast.error("Erreur lors de l'initialisation de Google Auth");
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-[#0d041e] px-2 text-zinc-500">Ou</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 bg-white text-zinc-900 hover:bg-zinc-100 rounded-xl font-mono tracking-widest uppercase text-xs transition-all transform hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
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
