import React, { useState, useEffect } from 'react';
import { PageId, Language, BrandVariant } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import {
  Settings,
  Cpu,
  Layers,
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Thermometer,
  Wifi,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  brand: BrandVariant;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, language: propLang, brand }) => {
  const { t, language } = useTranslation(propLang);
  // Live simulated metrics
  const [telemetry, setTelemetry] = useState({
    temp: 21.4,
    vibration: 0.02,
    powerKw: 142.8,
    status: 'OPTIMAL',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        temp: +(21 + Math.random() * 0.8).toFixed(1),
        vibration: +(0.01 + Math.random() * 0.03).toFixed(3),
        powerKw: +(140 + Math.random() * 5).toFixed(1),
        status: Math.random() > 0.05 ? 'OPTIMAL' : 'ALERT',
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 animate-fade-in">
      
      {/* Main Outer Frame Glass Hero Container */}
      <section className="relative glass-card-purple outer-frame rounded-3xl p-8 md:p-14 overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Decorative ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-orange-500/30 text-xs font-mono text-orange-400">
              <Zap className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>Sovereign Cyber Facility Engine v2.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {brand}
            </h1>

            <p className="text-lg sm:text-2xl text-gray-300 font-light leading-relaxed">
              {t('homeSubtitle', language)}
              <br />
              <span className="text-orange-400 font-semibold">{t('homeTagline', language)}</span>
            </p>

            <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
              {t('homeDescription', language)}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('demo')}
                className="btn-gradient-orange text-white px-8 py-4 rounded-2xl text-base font-bold glow-orange hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{t('getStarted', language)}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('architecture')}
                className="glass-card hover:bg-white/10 text-white px-6 py-4 rounded-2xl text-sm font-semibold transition-all border border-white/15 flex items-center gap-2 cursor-pointer"
              >
                <span>{t('viewArchitecture', language)}</span>
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>GDPR / RGPD Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-orange-400" />
                <span>AES-256 Encrypted</span>
              </div>
            </div>
          </div>

          {/* Right Isometric 3D Graphic / Interactive Telemetry Display */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card p-6 rounded-3xl border border-orange-500/30 glow-border relative overflow-hidden space-y-6">
              
              {/* Header inside graphic card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase">Live Asset Telemetry</span>
                </div>
                <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full">
                  NODE #892-FACILITY
                </span>
              </div>

              {/* Graphic 3D Isometric Schematic Mockup */}
              <div className="relative py-6 flex items-center justify-center">
                <svg className="w-full max-w-xs h-auto" viewBox="0 0 300 200" fill="none">
                  {/* Building wireframe */}
                  <path d="M150 20 L250 70 L150 120 L50 70 Z" fill="rgba(255, 107, 0, 0.1)" stroke="#ff8a3d" strokeWidth="2" />
                  <path d="M50 70 L50 170 L150 210 L150 120 Z" fill="rgba(45, 23, 85, 0.6)" stroke="#ff8a3d" strokeWidth="1.5" />
                  <path d="M250 70 L250 170 L150 210 L150 120 Z" fill="rgba(255, 138, 61, 0.1)" stroke="#ff8a3d" strokeWidth="1.5" />
                  {/* Circuit connecting points */}
                  <circle cx="150" cy="20" r="4" fill="#ff5e00" className="animate-ping" />
                  <circle cx="250" cy="70" r="3" fill="#ffaa00" />
                  <circle cx="50" cy="70" r="3" fill="#ffaa00" />
                </svg>
              </div>

              {/* Live Metrics Row */}
              <div className="grid grid-cols-3 gap-3 text-center pt-2">
                <div className="glass-card p-3 rounded-xl border border-white/10">
                  <div className="flex items-center justify-center text-orange-400 mb-1">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-gray-400 font-mono">HVAC Temp</div>
                  <div className="text-sm font-bold font-mono text-white">{telemetry.temp} °C</div>
                </div>

                <div className="glass-card p-3 rounded-xl border border-white/10">
                  <div className="flex items-center justify-center text-orange-400 mb-1">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-gray-400 font-mono">Vibration</div>
                  <div className="text-sm font-bold font-mono text-white">{telemetry.vibration} g</div>
                </div>

                <div className="glass-card p-3 rounded-xl border border-white/10">
                  <div className="flex items-center justify-center text-orange-400 mb-1">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-gray-400 font-mono">Power kw</div>
                  <div className="text-sm font-bold font-mono text-white">{telemetry.powerKw} kW</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Primary Feature Cards Section (Predictive Maintenance & IoT Integration) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Predictive Maintenance Card */}
        <div className="glass-card-purple p-8 rounded-3xl flex items-start gap-6 border-b-2 border-orange-500/40 hover:border-orange-500 transition-all group hover:scale-[1.01] shadow-xl">
          <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/30 text-orange-400 group-hover:scale-110 transition-transform flex-shrink-0">
            <Settings className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
              {t('predictiveMaintTitle', language)}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm font-light">
              {t('predictiveMaintDesc', language)}
            </p>
            <button
              onClick={() => onNavigate('architecture')}
              className="mt-4 text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
            >
              {t('learnMore', language)}
            </button>
          </div>
        </div>

        {/* IoT Integration Card */}
        <div className="glass-card-purple p-8 rounded-3xl flex items-start gap-6 border-b-2 border-orange-500/40 hover:border-orange-500 transition-all group hover:scale-[1.01] shadow-xl">
          <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/30 text-orange-400 group-hover:scale-110 transition-transform flex-shrink-0">
            <Cpu className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
              {t('iotIntegrationTitle', language)}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm font-light">
              {t('iotIntegrationDesc', language)}
            </p>
            <button
              onClick={() => onNavigate('architecture')}
              className="mt-4 text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
            >
              {t('exploreGateways', language)}
            </button>
          </div>
        </div>

      </section>

      {/* Secondary Features Overview Section (BIM, IoT Sensors, CMMS) */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('modulesTitle', language)}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            {t('modulesSubtitle', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* BIM Integration Card */}
          <div className="glass-card-purple p-8 rounded-3xl border border-white/10 hover:border-orange-500/40 transition-all space-y-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">BIM Integration</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Seamlessly integrate Building Information Models (3D IFC) for enhanced spatial visualization and asset location intelligence.
            </p>
          </div>

          {/* IoT & Sensors Card */}
          <div className="glass-card-purple p-8 rounded-3xl border border-white/10 hover:border-orange-500/40 transition-all space-y-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">IoT & Sensors</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Real-time telemetry streams from environmental sensors, HVAC, lighting grids, and access control points.
            </p>
          </div>

          {/* CMMS & Maintenance Card */}
          <div className="glass-card-purple p-8 rounded-3xl border border-white/10 hover:border-orange-500/40 transition-all space-y-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">CMMS & Work Orders</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Streamline work orders, preventive maintenance scheduling, parts inventory, and technician dispatches in one platform.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="glass-card p-10 rounded-3xl border border-orange-500/30 text-center space-y-6 glow-border">
        <h2 className="text-3xl font-extrabold text-white">
          {t('readyTitle', language)}
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm">
          {t('readyDesc', language)}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onNavigate('pricing')}
            className="btn-gradient-orange text-white px-8 py-3.5 rounded-2xl text-sm font-bold glow-orange hover:scale-105 transition-transform cursor-pointer"
          >
            {t('viewPricing', language)}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="glass-card text-white px-8 py-3.5 rounded-2xl text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
          >
            {t('contactExpert', language)}
          </button>
        </div>
      </section>

    </div>
  );
};

