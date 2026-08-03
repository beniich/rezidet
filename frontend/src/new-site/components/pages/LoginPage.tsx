import React, { useState } from 'react';
import { PageId, Language, BrandVariant } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { Shield, Lock, ArrowRight, UserPlus, LogIn, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  brand: BrandVariant;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, language: propLang, brand }) => {
  const { t, language } = useTranslation(propLang);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailLabels: Record<Language, string> = {
    FR: 'Adresse E-mail',
    EN: 'Email Address',
    DE: 'E-Mail-Adresse',
    ES: 'Correo Electrónico',
  };

  const passwordLabels: Record<Language, string> = {
    FR: 'Mot de passe',
    EN: 'Password',
    DE: 'Passwort',
    ES: 'Contraseña',
  };

  const submitBtnLabels: Record<Language, string> = {
    FR: mode === 'login' ? 'CONNEXION' : 'SUIVANT (ÉTAPE 2)',
    EN: mode === 'login' ? 'LOGIN' : 'NEXT (STEP 2)',
    DE: mode === 'login' ? 'ANMELDEN' : 'WEITER (SCHRITT 2)',
    ES: mode === 'login' ? 'INICIAR SESIÓN' : 'SIGUIENTE (PASO 2)',
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in py-8">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl btn-gradient-orange flex items-center justify-center text-white mx-auto glow-orange">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
          {brand}
        </h1>
        <p className="text-xs font-mono text-orange-400">
          {mode === 'login' ? 'Secure Cyber Portal' : 'Onboarding & Registration'}
        </p>
      </div>

      {/* Main Glass Form Container matching Images 12, 13, 14 */}
      <div className="glass-card-purple rounded-3xl p-8 border border-orange-500/40 shadow-2xl space-y-6 glow-border relative">
        
        {/* Toggle Pills */}
        <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setMode('login')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'login' ? 'btn-gradient-orange text-white glow-orange-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t('login', language)}</span>
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'register' ? 'btn-gradient-orange text-white glow-orange-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t('createAccount', language)}</span>
          </button>
        </div>

        {/* Registration Step Indicator matching Images 12 & 13 */}
        {mode === 'register' && (
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-mono text-orange-400 font-bold">
              <span>Step {step} of 3: Account Details</span>
              <span>33%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full btn-gradient-orange glow-orange w-1/3" />
            </div>
          </div>
        )}

        {isLoggedIn ? (
          <div className="p-6 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Authenticated!</h3>
            <p className="text-xs text-gray-300 font-mono">
              Session token verified. Redirecting to sovereign dashboard...
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="btn-gradient-orange text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Enter Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">
                {emailLabels[language]}
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sovereigndevice.com"
                className="w-full glass-card rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-orange-500 border border-white/10 placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">
                {passwordLabels[language]}
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-card rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-orange-500 border border-white/10 placeholder-gray-500"
              />
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => alert('Password reset link dispatched to authorized email.')}
                  className="text-xs text-orange-400 hover:underline cursor-pointer"
                >
                  {t('forgotPassword', language)}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-gradient-orange text-white py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider glow-orange hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{submitBtnLabels[language]}</span>
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
