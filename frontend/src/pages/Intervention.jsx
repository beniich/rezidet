import React from 'react';

export default function Intervention() {
  return (
    <div className="bg-background text-on-surface font-body-sm min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-16 bg-surface border-b border-border-muted z-50 flex items-center justify-between px-6">
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">assignment</span>
<h1 class="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">Work Orders</h1>
</div>
</div>
<div class="flex items-center gap-4">
<button class="bg-primary text-on-primary px-4 py-1.5 rounded text-label-md font-label-md hover:bg-primary-fixed-dim transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">add</span> Nouveau WO
        </button>
<div class="w-8 h-8 rounded-full border border-border-muted overflow-hidden">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</header>
<!-- Canvas -->
<main class="pt-20 px-6 pb-6 max-w-7xl mx-auto flex gap-6 h-[calc(100vh-80px)]">
<!-- Kanban Board -->
<div class="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
<!-- Column: À Faire (To Do) -->
<div class="w-80 flex-shrink-0 flex flex-col bg-surface-container-low rounded-lg border border-border-muted">
<div class="p-3 border-b border-border-muted flex justify-between items-center bg-surface-container/50">
<h3 class="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-surface-variant border border-on-surface-variant"></span>
                À Faire
            </h3>
<span class="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">12</span>
</div>
<div class="flex-1 overflow-y-auto p-3 space-y-3">
<!-- Card 1 -->
<div class="bg-surface-card border border-border-muted rounded shadow-sm p-3 hover:border-primary transition-colors cursor-grab active:cursor-grabbing">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] text-on-surface-variant font-mono">WO-4102</span>
<span class="bg-error/10 text-error px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border border-error/20">Urgent</span>
</div>
<h4 class="font-label-md text-on-surface mb-1">Fuite détectée (Zone Serveurs)</h4>
<p class="text-body-sm text-on-surface-variant line-clamp-2 mb-3">Détection d'eau sous le plancher surélevé allée B. Couper l'arrivée principale.</p>
<div class="flex justify-between items-center text-on-surface-variant">
<div class="flex items-center gap-1 text-[11px]">
<span class="material-symbols-outlined text-[14px]">event</span> Aujourd'hui
                    </div>
<div class="w-6 h-6 rounded-full bg-surface-variant border border-surface flex items-center justify-center text-[10px] font-bold text-on-surface-variant" title="Non assigné">
<span class="material-symbols-outlined text-[14px]">person_off</span>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-card border border-border-muted rounded shadow-sm p-3 hover:border-primary transition-colors cursor-grab active:cursor-grabbing">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] text-on-surface-variant font-mono">WO-4105</span>
<span class="bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border border-border-muted">Normal</span>
</div>
<h4 class="font-label-md text-on-surface mb-1">Remplacement Filtres AHU-3</h4>
<p class="text-body-sm text-on-surface-variant line-clamp-2 mb-3">Maintenance préventive trimestrielle. Filtres F7 requis.</p>
<div class="flex justify-between items-center text-on-surface-variant">
<div class="flex items-center gap-1 text-[11px]">
<span class="material-symbols-outlined text-[14px]">event</span> Demain
                    </div>
<div class="w-6 h-6 rounded-full overflow-hidden border border-surface">
<img alt="Assignee" class="w-full h-full object-cover opacity-60 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</div>
</div>
</div>
<!-- Column: En Cours (In Progress) -->
<div class="w-80 flex-shrink-0 flex flex-col bg-surface-container-low rounded-lg border border-border-muted">
<div class="p-3 border-b border-border-muted flex justify-between items-center bg-surface-container/50">
<h3 class="font-label-md text-label-md uppercase tracking-wider text-primary flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                En Cours
            </h3>
<span class="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold border border-primary/20">3</span>
</div>
<div class="flex-1 overflow-y-auto p-3 space-y-3">
<!-- Card 3 -->
<div class="bg-surface-card border border-primary/30 rounded shadow-sm p-3 cursor-grab active:cursor-grabbing">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] text-on-surface-variant font-mono">WO-4098</span>
<span class="bg-warning/10 text-warning px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border border-warning/20">High</span>
</div>
<h4 class="font-label-md text-on-surface mb-1">Inspection Ascenseur B</h4>
<p class="text-body-sm text-on-surface-variant line-clamp-2 mb-3">Bruit de frottement signalé au 3ème étage. Vérification des patins de guidage.</p>
<div class="flex justify-between items-center text-on-surface-variant">
<div class="flex items-center gap-1 text-[11px] text-primary">
<span class="material-symbols-outlined text-[14px]">timelapse</span> Depuis 2h
                    </div>
<div class="w-6 h-6 rounded-full overflow-hidden border border-primary ring-2 ring-surface">
<img alt="Assignee" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</div>
</div>
</div>
<!-- Column: En Attente (On Hold/Waiting) -->
<div class="w-80 flex-shrink-0 flex flex-col bg-surface-container-low rounded-lg border border-border-muted opacity-80">
<div class="p-3 border-b border-border-muted flex justify-between items-center bg-surface-container/50">
<h3 class="font-label-md text-label-md uppercase tracking-wider text-warning flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-warning"></span>
                En Attente (Pièces)
            </h3>
<span class="bg-warning/10 text-warning px-2 py-0.5 rounded text-[10px] font-bold border border-warning/20">1</span>
</div>
<div class="flex-1 overflow-y-auto p-3 space-y-3">
<!-- Card 4 -->
<div class="bg-surface-card border border-warning/30 rounded shadow-sm p-3 cursor-not-allowed bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')]">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] text-on-surface-variant font-mono">WO-4085</span>
<span class="bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border border-border-muted">Normal</span>
</div>
<h4 class="font-label-md text-on-surface mb-1">Remplacement Moteur VAV</h4>
<p class="text-body-sm text-on-surface-variant line-clamp-2 mb-3">En attente de livraison de la pièce (Réf: MTR-992). Prévu le 28 Oct.</p>
<div class="flex justify-between items-center text-on-surface-variant">
<div class="flex items-center gap-1 text-[11px] text-warning">
<span class="material-symbols-outlined text-[14px]">inventory_2</span> Pièce commandée
                    </div>
<div class="w-6 h-6 rounded-full overflow-hidden border border-surface">
<img alt="Assignee" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</div>
</div>
</div>
<!-- Column: Terminé (Done) -->
<div class="w-80 flex-shrink-0 flex flex-col bg-surface-container-low rounded-lg border border-border-muted">
<div class="p-3 border-b border-border-muted flex justify-between items-center bg-surface-container/50">
<h3 class="font-label-md text-label-md uppercase tracking-wider text-success flex items-center gap-2">
<span class="material-symbols-outlined text-[14px]">check_circle</span>
                Terminé (Aujourd'hui)
            </h3>
<span class="bg-success/10 text-success px-2 py-0.5 rounded text-[10px] font-bold border border-success/20">5</span>
</div>
<div class="flex-1 overflow-y-auto p-3 space-y-3 opacity-60">
<!-- Card 5 -->
<div class="bg-surface-card border border-border-muted rounded shadow-sm p-3">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] text-on-surface-variant font-mono line-through">WO-4091</span>
<span class="text-success text-[14px]"><span class="material-symbols-outlined">done_all</span></span>
</div>
<h4 class="font-label-md text-on-surface mb-1">Ronde Quotidienne Chaufferie</h4>
<div class="flex justify-between items-center text-on-surface-variant mt-2">
<div class="flex items-center gap-1 text-[11px]">
                        Clôturé à 08:30
                    </div>
<div class="w-6 h-6 rounded-full overflow-hidden border border-surface grayscale">
<img alt="Assignee" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
    `}} />
  );
}
