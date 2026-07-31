import React from 'react';

export default function AssetDetail() {
  return (
    <div className="bg-background text-on-surface font-body-sm min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-16 bg-surface border-b border-border-muted z-50 flex items-center justify-between px-6">
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<div>
<h1 class="font-headline-sm text-headline-sm font-bold text-on-surface">HVAC Unit B-04</h1>
<div class="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
<span>ID: AS-882910</span>
<span class="w-1 h-1 rounded-full bg-border-muted"></span>
<span>Bâtiment Alpha • Toit</span>
</div>
</div>
</div>
<div class="flex items-center gap-3">
<div class="px-3 py-1.5 bg-success/10 border border-success/20 rounded font-label-md text-label-md text-success flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-success"></span>
            Opérationnel
        </div>
<button class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors text-primary border border-border-muted">
<span class="material-symbols-outlined">edit</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors text-primary border border-border-muted">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
</header>
<main class="pt-20 px-6 pb-6 max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
<!-- Left Column: Details & Specs -->
<div class="col-span-12 lg:col-span-4 flex flex-col gap-6">
<!-- Image & Basic Info -->
<div class="bg-surface-card border border-border-muted rounded-lg overflow-hidden flex flex-col">
<div class="h-48 bg-surface-container-high relative">
<img alt="HVAC Unit Asset" class="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AExQ_83_W3lE71-c0q8i9t-Wl_4s90v4LzW0M6dE90j0Z9FjUeGf9zWj9O5Kq3w3g3n3P6R7E2O8r5l5I5D4_9z2l3G8v2T8B8l2O4u2h7Y6G0R8k4w1x8E7E4I8Y0y9Y5V1z5N6o6j2S5r8o5e6J4p1l8j7u6J0Q2v5Z3i9j7I4V3B3W5y0y3v4y5A7F8i4Q3r2U9J3T6G1B1O3T9F3u2A2b7A9g0j9G9A4I8"/>
<div class="absolute top-3 right-3 bg-surface/80 backdrop-blur px-2 py-1 rounded border border-border-muted font-label-sm text-label-sm flex items-center gap-1">
<span class="material-symbols-outlined text-[14px] text-primary">qr_code_scanner</span>
                        Scanné il y a 2h
                    </div>
</div>
<div class="p-4">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-3 border-b border-border-muted pb-2">Spécifications</h3>
<div class="space-y-3 font-body-sm text-body-sm">
<div class="flex justify-between">
<span class="text-on-surface-variant">Fabricant</span>
<span class="text-on-surface font-medium">Trane Technologies</span>
</div>
<div class="flex justify-between">
<span class="text-on-surface-variant">Modèle</span>
<span class="text-on-surface font-medium">CGAM-020</span>
</div>
<div class="flex justify-between">
<span class="text-on-surface-variant">Numéro de Série</span>
<span class="text-on-surface font-medium font-label-md">TRN-882-991-A</span>
</div>
<div class="flex justify-between">
<span class="text-on-surface-variant">Année d'installation</span>
<span class="text-on-surface font-medium">2018</span>
</div>
<div class="flex justify-between">
<span class="text-on-surface-variant">Fin de Garantie</span>
<span class="text-on-surface font-medium">12 Nov 2025</span>
</div>
</div>
</div>
</div>
<!-- Documents & Manuals -->
<div class="bg-surface-card border border-border-muted rounded-lg p-4">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">description</span>
                    Documentation
                </h3>
<div class="space-y-2">
<a class="flex items-center justify-between p-2 rounded hover:bg-surface-container-high transition-colors border border-transparent hover:border-border-muted group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-error">picture_as_pdf</span>
<div class="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Manuel Opérateur</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[18px]">download</span>
</a>
<a class="flex items-center justify-between p-2 rounded hover:bg-surface-container-high transition-colors border border-transparent hover:border-border-muted group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">picture_as_pdf</span>
<div class="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Schéma Électrique</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[18px]">download</span>
</a>
<a class="flex items-center justify-between p-2 rounded hover:bg-surface-container-high transition-colors border border-transparent hover:border-border-muted group" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-warning">insert_drive_file</span>
<div class="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Certificat Conformité</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[18px]">download</span>
</a>
</div>
</div>
</div>
<!-- Middle Column: Telemetry & AI -->
<div class="col-span-12 lg:col-span-5 flex flex-col gap-6">
<!-- Live Telemetry -->
<div class="bg-surface-card border border-border-muted rounded-lg p-4 flex-1">
<div class="flex justify-between items-center mb-6">
<h3 class="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span class="material-symbols-outlined text-primary">sensors</span>
                        Télémétrie en temps réel
                    </h3>
<div class="flex items-center gap-1 font-label-sm text-label-sm text-success">
<span class="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                        Connecté
                    </div>
</div>
<!-- Gauges / Current Values -->
<div class="grid grid-cols-2 gap-4 mb-6">
<div class="bg-surface p-3 rounded border border-border-muted border-l-4 border-l-primary">
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Température Sortie</div>
<div class="flex items-end gap-1">
<span class="font-headline-lg text-headline-lg text-on-surface leading-none">6.2</span>
<span class="font-label-md text-label-md text-on-surface-variant mb-0.5">°C</span>
</div>
</div>
<div class="bg-surface p-3 rounded border border-border-muted border-l-4 border-l-[#10B981]">
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Pression Réfrigérant</div>
<div class="flex items-end gap-1">
<span class="font-headline-lg text-headline-lg text-on-surface leading-none">14.5</span>
<span class="font-label-md text-label-md text-on-surface-variant mb-0.5">Bar</span>
</div>
</div>
<div class="bg-surface p-3 rounded border border-border-muted border-l-4 border-l-[#F59E0B]">
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Consommation Élec.</div>
<div class="flex items-end gap-1">
<span class="font-headline-lg text-headline-lg text-on-surface leading-none">42</span>
<span class="font-label-md text-label-md text-on-surface-variant mb-0.5">kW</span>
</div>
</div>
<div class="bg-surface p-3 rounded border border-border-muted border-l-4 border-l-surface-container-highest">
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Vibration Compresseur</div>
<div class="flex items-end gap-1">
<span class="font-headline-lg text-headline-lg text-on-surface leading-none">0.2</span>
<span class="font-label-md text-label-md text-on-surface-variant mb-0.5">in/s</span>
</div>
</div>
</div>
<!-- Chart Placeholder (Performance over time) -->
<div class="border-t border-border-muted pt-4 h-48 flex flex-col">
<div class="flex justify-between items-center mb-2">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Efficacité Énergétique (24h)</span>
<div class="flex gap-2">
<span class="w-6 h-1 rounded bg-border-muted hover:bg-primary transition-colors cursor-pointer"></span>
<span class="w-6 h-1 rounded bg-border-muted hover:bg-primary transition-colors cursor-pointer"></span>
<span class="w-6 h-1 rounded bg-primary cursor-pointer"></span>
</div>
</div>
<div class="flex-1 bg-surface-container-low rounded border border-border-muted flex items-end px-2 py-4 relative overflow-hidden">
<!-- Grid Lines -->
<div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
<div class="w-full border-b border-dashed border-outline-variant"></div>
<div class="w-full border-b border-dashed border-outline-variant"></div>
<div class="w-full border-b border-dashed border-outline-variant"></div>
</div>
<!-- Fake line graph using SVG -->
<svg class="absolute inset-0 w-full h-full z-10" preserveaspectratio="none" viewbox="0 0 100 100">
<path d="M 0 50 Q 25 30 50 60 T 100 40 L 100 100 L 0 100 Z" fill="rgba(192, 193, 255, 0.1)"></path>
<path d="M 0 50 Q 25 30 50 60 T 100 40" fill="none" stroke="#c0c1ff" stroke-width="2"></path>
</svg>
</div>
</div>
</div>
<!-- AI Predictions -->
<div class="bg-surface-card border border-border-muted rounded-lg p-4 bg-gradient-to-br from-surface-card to-surface-container-highest">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-3 flex items-center gap-2">
<span class="material-symbols-outlined text-warning">psychology</span>
                    Aether AI Insights
                </h3>
<div class="p-3 bg-surface rounded border border-warning/30 border-l-4 border-l-warning mb-3">
<div class="font-label-md text-label-md text-on-surface font-semibold mb-1">Prédiction de défaillance (Filtres)</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">L'analyse de la pression différentielle suggère un colmatage des filtres à air d'ici 14 jours. Recommandation : Remplacement préventif.</p>
<button class="mt-2 text-primary font-label-md text-label-md hover:underline">Générer Ordre de Travail</button>
</div>
<div class="p-3 bg-surface rounded border border-success/30 border-l-4 border-l-success">
<div class="font-label-md text-label-md text-on-surface font-semibold mb-1">Optimisation Énergétique</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">Le point de consigne d'eau glacée peut être augmenté de 0.5°C avec la météo actuelle pour économiser 4% d'énergie sans impact confort.</p>
<button class="mt-2 text-success font-label-md text-label-md hover:underline">Appliquer Paramètre</button>
</div>
</div>
</div>
<!-- Right Column: Work Orders & History -->
<div class="col-span-12 lg:col-span-3 flex flex-col gap-6">
<!-- Quick Actions -->
<div class="grid grid-cols-2 gap-2">
<button class="bg-primary text-on-primary rounded p-3 flex flex-col items-center justify-center gap-2 hover:bg-primary-fixed-dim transition-colors group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">build</span>
<span class="font-label-md text-label-md text-center">Nouveau W.O.</span>
</button>
<button class="bg-surface-container-high border border-border-muted text-on-surface rounded p-3 flex flex-col items-center justify-center gap-2 hover:bg-surface-variant hover:border-border-active transition-colors group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">fact_check</span>
<span class="font-label-md text-label-md text-center">Rapport</span>
</button>
</div>
<!-- Activity History -->
<div class="bg-surface-card border border-border-muted rounded-lg p-4 flex-1 flex flex-col">
<div class="flex justify-between items-center mb-4">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Historique</h3>
<button class="text-primary hover:text-primary-fixed-dim text-[12px] uppercase font-label-md">Tout voir</button>
</div>
<div class="relative border-l border-border-muted ml-2 space-y-4 flex-1">
<!-- Item 1 -->
<div class="relative pl-4">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-surface border-2 border-primary"></div>
<div class="font-label-md text-label-md text-on-surface">Maintenance Préventive (Q3)</div>
<div class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Filtres changés, courroies vérifiées.</div>
<div class="font-label-sm text-[10px] text-on-surface-variant mt-1 uppercase">12 Oct 2023 • Tech: M. Dupont</div>
</div>
<!-- Item 2 -->
<div class="relative pl-4">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-surface border-2 border-warning"></div>
<div class="font-label-md text-label-md text-on-surface">Alerte: Température Haute</div>
<div class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Dépassement seuil (+2°C). Résolu auto.</div>
<div class="font-label-sm text-[10px] text-on-surface-variant mt-1 uppercase">05 Sep 2023 • Système</div>
</div>
<!-- Item 3 -->
<div class="relative pl-4">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-surface border-2 border-primary"></div>
<div class="font-label-md text-label-md text-on-surface">Inspection Annuelle Légale</div>
<div class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Certificat valide jusqu'en Sep 2024.</div>
<div class="font-label-sm text-[10px] text-on-surface-variant mt-1 uppercase">01 Sep 2023 • Insp: Bureau Veritas</div>
</div>
<!-- Item 4 -->
<div class="relative pl-4">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-surface border-2 border-border-active"></div>
<div class="font-label-md text-label-md text-on-surface">Remplacement Capteur Pression</div>
<div class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Suite défaillance composant.</div>
<div class="font-label-sm text-[10px] text-on-surface-variant mt-1 uppercase">14 Fév 2023 • Tech: L. Martin</div>
</div>
</div>
</div>
</div>
</main>
</div>
    `}} />
  );
}
