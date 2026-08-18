import React from 'react';
import { PageId, Language } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import { Shield, Target, Compass, Lock, Award, Users } from 'lucide-react';

interface VisionPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const VisionPage: React.FC<VisionPageProps> = ({ onNavigate, language: propLang }) => {
  const { t, language } = useTranslation(propLang);
  return (
    <div className="space-y-16 animate-fade-in max-w-7xl mx-auto">
      
      {/* Title Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          {t('visionTitle', language)}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 font-light max-w-3xl mx-auto">
          {t('visionSubtitle', language)}
        </p>
      </div>

      {/* Main Glassmorphic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Pioneering Sovereign Security */}
        <div className="glass-card-purple rounded-3xl p-8 border border-white/10 space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl btn-gradient-orange flex items-center justify-center text-white glow-orange-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Pioneering Sovereign Security</h3>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            In an era where critical infrastructure is targeted by increasingly sophisticated cyber threats, data sovereignty is no longer optional. We empower enterprises to retain complete authority over their facility hardware, sensor data streams, and operational intelligence.
          </p>
        </div>

        {/* Card 2: The Challenge of Hyper-Connectivity */}
        <div className="glass-card-purple rounded-3xl p-8 border border-white/10 space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl btn-gradient-orange flex items-center justify-center text-white glow-orange-sm">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">The Challenge of Hyper-Connectivity</h3>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            As smart buildings scale from hundreds to millions of connected IoT endpoints, traditional fragmented CMMS tools break down. Our mission is to unify physical asset tracking, thermal telemetry, and zero-trust crypto handshakes into one frictionless platform.
          </p>
        </div>

      </div>

      {/* Core Values Section */}
      <div className="glass-card-purple outer-frame rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
        <h2 className="text-3xl font-extrabold text-white text-center tracking-tight">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
            <Lock className="w-8 h-8 text-orange-400" />
            <h4 className="text-lg font-bold text-white">Absolute Sovereignty</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your facility telemetry belongs exclusively to you. No unauthorized cloud telemetry leaks or third-party vendor lock-in.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
            <Award className="w-8 h-8 text-orange-400" />
            <h4 className="text-lg font-bold text-white">Uncompromising Precision</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Sub-millisecond latency telemetry and AI algorithms that detect micro-anomalies before mechanical breakdown.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
            <Users className="w-8 h-8 text-orange-400" />
            <h4 className="text-lg font-bold text-white">Human-Centric Engineering</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Designed with glassmorphic ergonomics that make complex facility telemetry intuitive for technicians and directors alike.
            </p>
          </div>

        </div>
      </div>

      {/* Join Banner */}
      <div className="glass-card p-10 rounded-3xl border border-orange-500/30 text-center space-y-6 glow-border">
        <h3 className="text-3xl font-bold text-white">Join the Sovereign Future</h3>
        <p className="text-sm text-gray-300 max-w-xl mx-auto">
          Partner with REZIDET to safeguard your commercial real estate assets today.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="btn-gradient-orange text-white px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider glow-orange"
        >
          Contact Our Leadership
        </button>
      </div>

    </div>
  );
};
