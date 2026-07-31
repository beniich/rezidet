import React from 'react';

export default function AIAssistant() {
  return (
    <div className="bg-background text-on-surface font-body-sm min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-16 bg-surface border-b border-border-muted z-50 flex items-center justify-between px-6">
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">psychology</span>
<h1 class="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">Aether AI</h1>
</div>
</div>
<div class="flex items-center gap-4">
<div class="hidden sm:flex items-center gap-2 font-label-sm text-label-sm text-success bg-success/10 px-3 py-1 rounded-full border border-success/20">
<span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            Modèle L4 Actif
        </div>
<button class="w-10 h-10 flex items-center justify-center rounded-full border border-border-muted overflow-hidden hover:opacity-80 transition-opacity">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</button>
</div>
</header>
<main class="pt-16 h-screen flex flex-col max-w-5xl mx-auto px-4 md:px-6">
<!-- Chat History Area -->
<div class="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-hide">
<!-- System Greeting -->
<div class="flex flex-col items-center justify-center text-center mt-10 mb-12">
<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-container to-surface-container-highest flex items-center justify-center mb-4 border border-primary/20 shadow-[0_0_30px_rgba(192,193,255,0.1)]">
<span class="material-symbols-outlined text-primary text-[32px]" style="font-variation-settings: 'FILL' 1;">psychology</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface mb-2">Bonjour, je suis Aether.</h2>
<p class="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">Votre assistant expert SRE. Comment puis-je optimiser vos opérations aujourd'hui ?</p>
</div>
<!-- User Message -->
<div class="flex gap-4 justify-end">
<div class="bg-surface-container-highest border border-border-muted text-on-surface px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] font-body-sm text-body-sm">
                Quelles sont les anomalies détectées sur les refroidisseurs du bâtiment Alpha ce matin ?
            </div>
<div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
<!-- AI Response -->
<div class="flex gap-4">
<div class="w-8 h-8 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
<span class="material-symbols-outlined text-primary text-[18px]">psychology</span>
</div>
<div class="space-y-4 max-w-[85%]">
<div class="text-on-surface font-body-sm text-body-sm leading-relaxed">
                    J'ai analysé la télémétrie des 3 refroidisseurs du Bâtiment Alpha sur les 12 dernières heures. Voici ce que j'ai trouvé :
                </div>
<!-- Context Widget injected by AI -->
<div class="bg-surface-card border border-border-muted rounded-lg p-4 font-body-sm text-body-sm">
<div class="flex items-center justify-between mb-3 border-b border-border-muted pb-2">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-warning text-[18px]">warning</span>
<span class="font-label-md text-label-md font-semibold text-on-surface">Anomalie Détectée : CHLR-02</span>
</div>
<button class="text-primary font-label-md text-label-md hover:underline">Voir détails</button>
</div>
<p class="text-on-surface-variant mb-3">
                        La température d'approche du condenseur a augmenté de 1.2°C depuis hier soir. Corrélation forte (89%) avec un entartrage des tubes.
                    </p>
<div class="grid grid-cols-2 gap-3 mb-3">
<div class="bg-surface p-2 rounded border border-border-muted">
<div class="text-[10px] text-on-surface-variant uppercase">ΔT Actuel</div>
<div class="text-warning font-semibold">3.4°C <span class="text-[10px] font-normal">(+1.2)</span></div>
</div>
<div class="bg-surface p-2 rounded border border-border-muted">
<div class="text-[10px] text-on-surface-variant uppercase">Efficacité Perdue</div>
<div class="text-error font-semibold">4.5%</div>
</div>
</div>
<div class="flex gap-2 mt-3 pt-3 border-t border-border-muted">
<button class="bg-surface-container border border-border-muted px-3 py-1.5 rounded text-on-surface font-label-md text-label-md hover:border-primary transition-colors flex-1 text-center">Planifier Nettoyage</button>
<button class="bg-surface-container border border-border-muted px-3 py-1.5 rounded text-on-surface font-label-md text-label-md hover:border-primary transition-colors flex-1 text-center">Ignorer</button>
</div>
</div>
<div class="text-on-surface font-body-sm text-body-sm leading-relaxed">
                    Les autres refroidisseurs (CHLR-01 et CHLR-03) fonctionnent dans leurs paramètres nominaux. Souhaitez-vous que je génère un ordre de travail pour CHLR-02 ?
                </div>
<div class="flex gap-2">
<button class="px-3 py-1.5 rounded-full border border-primary/30 text-primary font-label-sm text-label-sm hover:bg-primary/10 transition-colors">Oui, créer le W.O.</button>
<button class="px-3 py-1.5 rounded-full border border-border-muted text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">Afficher l'historique de maintenance</button>
</div>
</div>
</div>
</div>
<!-- Input Area -->
<div class="py-4 bg-background">
<div class="relative bg-surface-card border border-border-muted rounded-2xl shadow-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
<textarea class="w-full bg-transparent border-none focus:ring-0 resize-none px-4 py-4 pr-32 font-body-sm text-body-sm text-on-surface placeholder-on-surface-variant min-h-[56px] max-h-[200px]" placeholder="Posez une question, demandez une analyse ou tapez '/' pour les commandes..." rows="1" style="field-sizing: content;"></textarea>
<div class="absolute right-2 bottom-2 flex items-center gap-1">
<button class="w-9 h-9 flex items-center justify-center rounded-full text-outline hover:text-on-surface hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-[20px]">attach_file</span>
</button>
<button class="w-9 h-9 flex items-center justify-center rounded-full text-outline hover:text-on-surface hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-[20px]">mic</span>
</button>
<button class="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors ml-1">
<span class="material-symbols-outlined text-[18px]">arrow_upward</span>
</button>
</div>
</div>
<div class="flex justify-center gap-6 mt-3 font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">security</span> Confidentiel SRE</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">database</span> Connecté BDD (Live)</span>
</div>
</div>
</main>
</div>
    `}} />
  );
}
