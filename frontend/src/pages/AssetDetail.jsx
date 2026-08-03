import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, MoreVertical, Settings, Activity, Cpu, Wrench, FileText, CheckCircle2 } from 'lucide-react';
import { AssetComments } from '../components/assets/AssetComments';
import { ScreenShareButton } from '../components/support/ScreenShare';
import { CollaborativeField } from '../components/CollaborativeField';
import { useAuthStore } from '../store/authStore';

export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const assetId = id || 'demo-asset-1';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* TopNavBar */}
      <header className="sticky top-0 w-full h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">HVAC Unit B-04</h1>
            <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
              <span>ID: {assetId}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Bâtiment Alpha • Toit</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ScreenShareButton assetId={assetId} assetName="HVAC Unit B-04" />
          
          <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-xs font-semibold text-green-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Opérationnel
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="h-48 bg-slate-100 relative">
              <img alt="HVAC" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-3 border-b pb-2">Spécifications</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Modèle</span><span className="font-medium text-slate-800">CGAM-020</span></div>
                <div className="flex justify-between"><span className="text-slate-500">N° Série</span><span className="font-medium text-slate-800">TRN-882-991-A</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex-1 flex flex-col">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" /> Notes Collaboratives
            </h3>
            <p className="text-xs text-slate-500 mb-2">Édition en temps réel avec votre équipe.</p>
            <div className="flex-1 min-h-[150px]">
              <CollaborativeField
                resourceType="asset"
                resourceId={assetId}
                fieldName="notes"
                placeholder="Ajoutez des notes techniques collaboratives ici..."
                multiline={true}
                currentUser={user}
                className="h-full [&>textarea]:h-full [&>textarea]:resize-none"
              />
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" /> Télémétrie en direct
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="text-xs text-slate-500 uppercase tracking-wide">Temp. Sortie</div>
                <div className="text-2xl font-bold text-slate-800 mt-1">6.2 <span className="text-sm font-normal text-slate-500">°C</span></div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="text-xs text-slate-500 uppercase tracking-wide">Pression</div>
                <div className="text-2xl font-bold text-slate-800 mt-1">14.5 <span className="text-sm font-normal text-slate-500">bar</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm bg-gradient-to-br from-indigo-50 to-white">
            <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-500" /> IA Predictive
            </h3>
            <div className="p-3 bg-white/60 border border-indigo-100 rounded-lg">
              <p className="text-sm text-indigo-800">Prédiction : Remplacement filtre requis dans ~14 jours.</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <AssetComments assetId={assetId} assetName="HVAC Unit B-04" />
        </div>

      </main>
    </div>
  );
}
