import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Building2, Mail, Lock, Loader2 } from 'lucide-react';
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
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
      <div className="bg-surface rounded-none border border-zinc-800 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-zinc-50" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-50 font-display tracking-widest uppercase">CAFM Pro</h1>
          <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mt-2">Accès sécurisé</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono tracking-widest text-zinc-400 mb-1 uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-50 font-mono text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono tracking-widest text-zinc-400 mb-1 uppercase">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-50 font-mono text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-50 text-background py-2.5 rounded-none font-mono tracking-widest uppercase text-sm hover:bg-zinc-200 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
