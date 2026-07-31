import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCrmAuthStore } from '../../store/crmAuthStore';
import { Activity, Building2, User, Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CRMSignup() {
  const navigate = useNavigate();
  const { signup, isLoading } = useCrmAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: 'Admin',
    lastName: 'Test',
    email: `admin-${Date.now()}@masociete.com`,
    password: 'password123',
    companyName: 'Ma Societe Inc.'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.companyName) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const success = await signup(formData);
    if (success) {
      toast.success('Compte cree avec succes !');
      navigate('/crm/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Activity size={24} />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Rejoignez le CRM</h2>
          <p className="text-center text-slate-500 mb-8">
            {step === 1 ? 'Parlez-nous de vous' : 'Securisez votre compte'}
          </p>

          <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-5">
            {step === 1 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Prenom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="Jean"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Entreprise</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="Ma Societe Inc."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
                >
                  Continuer <ArrowRight size={20} />
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email professionnel</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="jean@masociete.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="text-xs text-slate-500">8 caracteres minimum</p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-2/3 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
                  >
                    {isLoading ? <Loader className="animate-spin" size={20} /> : 'Creer mon compte'}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Vous avez deja un compte ?{' '}
              <Link to="/crm/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
