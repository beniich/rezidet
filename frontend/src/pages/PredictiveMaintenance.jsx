import React from 'react';

export default function PredictiveMaintenance() {
  return (
    <div className="bg-background text-on-surface font-body-sm min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-16 bg-surface border-b border-border-muted z-50 flex items-center justify-between px-6">
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">build</span>
<h1 class="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">Predictive Maintenance</h1>
</div>
</div>
<div class="flex items-center gap-4">
<div class="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface-container border border-border-muted rounded-full">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
</span>
<span class="font-label-sm text-[10px] uppercase text-on-surface-variant">Aether AI Active</span>
</div>
<div class="w-8 h-8 rounded-full border border-border-muted overflow-hidden">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</header>
<main class="pt-20 px-6 pb-6 max-w-7xl mx-auto">
<div class="mb-6 flex justify-between items-end">
<div>
<h2 class="font-headline-md text-headline-md text-on-surface">Risque de Défaillance (30 Prochains Jours)</h2>
<p class="font-body-md text-on-surface-variant mt-1">Analyse basée sur la télémétrie en direct et l'historique de maintenance.</p>
</div>
<button class="bg-surface-card border border-border-muted text-on-surface px-4 py-2 rounded text-label-md font-label-md hover:bg-surface-container transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">filter_list</span> Filtrer par Bâtiment
        </button>
</div>
<!-- High Risk Alert -->
<div class="bg-error/5 border border-error/20 rounded-lg p-4 flex items-start gap-4 mb-8">
<span class="material-symbols-outlined text-error text-[28px] mt-1">warning</span>
<div class="flex-1">
<h3 class="font-headline-sm text-error mb-1">Alerte Critique : Probabilité de défaillance &gt; 90%</h3>
<p class="font-body-sm text-on-surface mb-3">La pompe de circulation PC-02 (Sous-sol) présente des vibrations anormales (Spectre haute fréquence) suggérant une usure avancée des roulements. Rupture estimée dans les 4 à 6 jours.</p>
<div class="flex gap-2">
<button class="bg-error text-on-error px-4 py-1.5 rounded font-label-md text-label-md hover:opacity-90 transition-opacity">Créer Ordre de Travail Urgent</button>
<button class="bg-surface border border-error/30 text-on-surface px-4 py-1.5 rounded font-label-md text-label-md hover:bg-error/10 transition-colors">Voir Diagnostics Détaillés</button>
</div>
</div>
</div>
<!-- Risk Matrix Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- Card 1 -->
<div class="bg-surface-card border border-border-muted rounded-lg p-5 hover:border-warning/50 transition-colors cursor-pointer group">
<div class="flex justify-between items-start mb-3">
<div>
<div class="font-headline-sm text-on-surface group-hover:text-primary transition-colors">Centrale de Traitement d'Air (CTA-04)</div>
<div class="text-[12px] text-on-surface-variant uppercase mt-1">Étage 2 • Aile Est</div>
</div>
<div class="w-12 h-12 rounded-full border-4 border-warning flex items-center justify-center font-bold text-warning text-label-lg">
                72%
            </div>
</div>
<div class="mb-4">
<div class="font-label-sm text-on-surface-variant uppercase mb-1">Facteur de Risque Principal</div>
<div class="font-body-sm text-on-surface">Chute de pression différentielle sur les filtres F7 plus rapide que la modélisation standard.</div>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-warning w-[72%]"></div>
</div>
<div class="mt-2 text-right text-[10px] text-on-surface-variant uppercase">
            Horizon : 12-15 Jours
        </div>
</div>
<!-- Card 2 -->
<div class="bg-surface-card border border-border-muted rounded-lg p-5 hover:border-warning/50 transition-colors cursor-pointer group">
<div class="flex justify-between items-start mb-3">
<div>
<div class="font-headline-sm text-on-surface group-hover:text-primary transition-colors">Ascenseur Batterie A (ASC-02)</div>
<div class="text-[12px] text-on-surface-variant uppercase mt-1">Hall Principal</div>
</div>
<div class="w-12 h-12 rounded-full border-4 border-warning flex items-center justify-center font-bold text-warning text-label-lg">
                68%
            </div>
</div>
<div class="mb-4">
<div class="font-label-sm text-on-surface-variant uppercase mb-1">Facteur de Risque Principal</div>
<div class="font-body-sm text-on-surface">Anomalie détectée dans la courbe de courant du moteur de traction au démarrage.</div>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-warning w-[68%]"></div>
</div>
<div class="mt-2 text-right text-[10px] text-on-surface-variant uppercase">
            Horizon : 18-21 Jours
        </div>
</div>
<!-- Card 3 -->
<div class="bg-surface-card border border-border-muted rounded-lg p-5 hover:border-primary/50 transition-colors cursor-pointer group">
<div class="flex justify-between items-start mb-3">
<div>
<div class="font-headline-sm text-on-surface group-hover:text-primary transition-colors">Chiller B (CHL-02)</div>
<div class="text-[12px] text-on-surface-variant uppercase mt-1">Toit</div>
</div>
<div class="w-12 h-12 rounded-full border-4 border-primary flex items-center justify-center font-bold text-primary text-label-lg">
                45%
            </div>
</div>
<div class="mb-4">
<div class="font-label-sm text-on-surface-variant uppercase mb-1">Facteur de Risque Principal</div>
<div class="font-body-sm text-on-surface">Dérive légère de la température d'approche condenseur. Nettoyage préventif conseillé avant la saison chaude.</div>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary w-[45%]"></div>
</div>
<div class="mt-2 text-right text-[10px] text-on-surface-variant uppercase">
            Horizon : 30+ Jours
        </div>
</div>
</div>
</main>
</div>
    `}} />
  );
}
