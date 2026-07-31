import React from 'react';

export default function EnergySustainability() {
  return (
    <div className="bg-background text-on-surface font-body-sm min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-16 bg-surface border-b border-border-muted z-50 flex items-center justify-between px-6">
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">energy_savings_leaf</span>
<h1 class="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">Energy &amp; Sustainability</h1>
</div>
</div>
<div class="flex items-center gap-4">
<button class="bg-primary text-on-primary px-4 py-1.5 rounded text-label-md font-label-md hover:bg-primary-fixed-dim transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">download</span> Exporter Rapport ESG
        </button>
<div class="w-8 h-8 rounded-full border border-border-muted overflow-hidden">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</header>
<main class="pt-20 px-6 pb-6 max-w-7xl mx-auto space-y-6">
<!-- Quick Stats Row -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
<div class="bg-surface-card border border-border-muted rounded-lg p-4">
<div class="text-on-surface-variant font-label-md uppercase tracking-wider mb-2">Consommation Totale (Mois)</div>
<div class="flex items-end justify-between">
<div>
<span class="font-headline-lg text-headline-lg text-on-surface">142.5</span>
<span class="font-label-md text-on-surface-variant ml-1">MWh</span>
</div>
<div class="flex items-center text-success font-label-sm bg-success/10 px-2 py-0.5 rounded">
<span class="material-symbols-outlined text-[14px]">arrow_downward</span> 4.2%
                </div>
</div>
</div>
<div class="bg-surface-card border border-border-muted rounded-lg p-4">
<div class="text-on-surface-variant font-label-md uppercase tracking-wider mb-2">Empreinte Carbone (YTD)</div>
<div class="flex items-end justify-between">
<div>
<span class="font-headline-lg text-headline-lg text-on-surface">840</span>
<span class="font-label-md text-on-surface-variant ml-1">tCO2e</span>
</div>
<div class="flex items-center text-warning font-label-sm bg-warning/10 px-2 py-0.5 rounded">
<span class="material-symbols-outlined text-[14px]">trending_flat</span> 0.5%
                </div>
</div>
</div>
<div class="bg-surface-card border border-border-muted rounded-lg p-4">
<div class="text-on-surface-variant font-label-md uppercase tracking-wider mb-2">Intensité Énergétique</div>
<div class="flex items-end justify-between">
<div>
<span class="font-headline-lg text-headline-lg text-on-surface">115</span>
<span class="font-label-md text-on-surface-variant ml-1">kWh/m²</span>
</div>
<div class="text-on-surface-variant font-label-sm">Cible: 110</div>
</div>
</div>
<div class="bg-surface-card border border-border-muted rounded-lg p-4 border-l-4 border-l-primary">
<div class="text-on-surface-variant font-label-md uppercase tracking-wider mb-2">Économies Estimées (AI)</div>
<div class="flex items-end justify-between">
<div>
<span class="font-headline-lg text-headline-lg text-primary">€12.4k</span>
</div>
<button class="text-primary hover:underline font-label-sm">Voir Actions</button>
</div>
</div>
</div>
<!-- Main Content Area -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Left: Charts -->
<div class="col-span-1 lg:col-span-2 space-y-6">
<!-- Consumption Chart -->
<div class="bg-surface-card border border-border-muted rounded-lg p-4 h-[400px] flex flex-col">
<div class="flex justify-between items-center mb-4">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Profil de Consommation Électrique</h3>
<select class="bg-surface-container border border-border-muted rounded px-2 py-1 text-on-surface text-label-sm font-label-sm outline-none">
<option>7 Derniers Jours</option>
<option>30 Derniers Jours</option>
<option>Année en cours</option>
</select>
</div>
<div class="flex-1 border border-dashed border-border-muted rounded bg-surface-container/30 flex items-center justify-center">
<span class="text-on-surface-variant font-label-md">Graphique: Consommation horaire avec superposition de température</span>
</div>
</div>
<!-- Sources Breakdown -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div class="bg-surface-card border border-border-muted rounded-lg p-4">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-4">Répartition par Source</h3>
<div class="flex items-center gap-4">
<div class="w-24 h-24 rounded-full border-[8px] border-surface-container relative">
<div class="absolute inset-[-8px] rounded-full border-[8px] border-primary border-r-transparent border-b-transparent transform -rotate-45"></div>
<div class="absolute inset-[-8px] rounded-full border-[8px] border-success border-l-transparent border-t-transparent border-b-transparent transform -rotate-45"></div>
</div>
<div class="space-y-2 flex-1">
<div class="flex justify-between text-body-sm">
<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-primary"></span> Réseau Élec.</div>
<span class="font-medium">65%</span>
</div>
<div class="flex justify-between text-body-sm">
<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-success"></span> Solaire (Local)</div>
<span class="font-medium">25%</span>
</div>
<div class="flex justify-between text-body-sm">
<div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-warning"></span> Gaz Naturel</div>
<span class="font-medium">10%</span>
</div>
</div>
</div>
</div>
<div class="bg-surface-card border border-border-muted rounded-lg p-4">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-4">Consommation par Usage</h3>
<div class="space-y-3">
<div>
<div class="flex justify-between text-label-sm mb-1">
<span class="text-on-surface">CVC (HVAC)</span>
<span class="text-on-surface font-medium">48%</span>
</div>
<div class="h-2 rounded bg-surface-container overflow-hidden"><div class="h-full bg-primary w-[48%]"></div></div>
</div>
<div>
<div class="flex justify-between text-label-sm mb-1">
<span class="text-on-surface">Éclairage</span>
<span class="text-on-surface font-medium">22%</span>
</div>
<div class="h-2 rounded bg-surface-container overflow-hidden"><div class="h-full bg-secondary w-[22%]"></div></div>
</div>
<div>
<div class="flex justify-between text-label-sm mb-1">
<span class="text-on-surface">Équipements IT</span>
<span class="text-on-surface font-medium">18%</span>
</div>
<div class="h-2 rounded bg-surface-container overflow-hidden"><div class="h-full bg-tertiary w-[18%]"></div></div>
</div>
</div>
</div>
</div>
</div>
<!-- Right: Insights & Actions -->
<div class="col-span-1 space-y-6">
<!-- AI Recommendations -->
<div class="bg-primary/5 border border-primary/20 rounded-lg p-4">
<h3 class="font-headline-sm text-headline-sm text-primary mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">psychology</span>
                    Optimisations IA
                </h3>
<div class="space-y-3">
<div class="bg-surface rounded p-3 border border-border-muted shadow-sm">
<div class="font-label-md font-semibold text-on-surface mb-1">Ajustement CVC (Week-end)</div>
<p class="text-body-sm text-on-surface-variant mb-2">Les prévisions météo indiquent une vague de froid. Décalez le pré-chauffage de 2h pour éviter le pic tarifaire de pointe.</p>
<div class="flex justify-between items-center">
<span class="text-success font-label-md font-bold">~€450 gain</span>
<button class="text-primary text-label-sm font-label-md hover:underline">Appliquer</button>
</div>
</div>
<div class="bg-surface rounded p-3 border border-border-muted shadow-sm">
<div class="font-label-md font-semibold text-on-surface mb-1">Anomalie Éclairage (Zone B)</div>
<p class="text-body-sm text-on-surface-variant mb-2">Consommation anormale détectée la nuit (02:00 - 05:00) depuis 3 jours. Capteurs de présence potentiellement défectueux.</p>
<div class="flex justify-between items-center">
<span class="text-warning font-label-md font-bold">Priorité Moyenne</span>
<button class="text-primary text-label-sm font-label-md hover:underline">Créer W.O.</button>
</div>
</div>
</div>
</div>
<!-- Top Consumers List -->
<div class="bg-surface-card border border-border-muted rounded-lg p-4">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-4">Équipements les plus énergivores</h3>
<ul class="space-y-3 divide-y divide-border-muted">
<li class="pt-2 flex justify-between items-center">
<div>
<div class="font-label-md text-on-surface">Chiller Central A</div>
<div class="text-[10px] text-on-surface-variant uppercase">Bâtiment Principal</div>
</div>
<div class="text-right">
<div class="font-medium text-on-surface">32.4 kWh</div>
<div class="text-[10px] text-error flex items-center justify-end"><span class="material-symbols-outlined text-[12px]">arrow_upward</span> 12% vs base</div>
</div>
</li>
<li class="pt-2 flex justify-between items-center">
<div>
<div class="font-label-md text-on-surface">AHU-04 (Data Center)</div>
<div class="text-[10px] text-on-surface-variant uppercase">Sous-sol</div>
</div>
<div class="text-right">
<div class="font-medium text-on-surface">28.1 kWh</div>
<div class="text-[10px] text-on-surface-variant flex items-center justify-end">Stable</div>
</div>
</li>
<li class="pt-2 flex justify-between items-center">
<div>
<div class="font-label-md text-on-surface">Pompe Chaleur B</div>
<div class="text-[10px] text-on-surface-variant uppercase">Annexe</div>
</div>
<div class="text-right">
<div class="font-medium text-on-surface">15.2 kWh</div>
<div class="text-[10px] text-success flex items-center justify-end"><span class="material-symbols-outlined text-[12px]">arrow_downward</span> 5% vs base</div>
</div>
</li>
</ul>
</div>
</div>
</div>
</main>
</div>
    `}} />
  );
}
