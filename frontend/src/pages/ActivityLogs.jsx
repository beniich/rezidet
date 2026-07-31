import React from 'react';

export default function ActivityLogs() {
  return (
    <div className="bg-background text-on-surface font-body-sm min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-16 bg-surface border-b border-border-muted z-50 flex items-center justify-between px-6">
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-high transition-colors text-on-surface-variant">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">list_alt</span>
<h1 class="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">Activity Logs</h1>
</div>
</div>
<div class="flex items-center gap-4">
<button class="bg-surface-card border border-border-muted text-on-surface px-4 py-1.5 rounded text-label-md font-label-md hover:bg-surface-container transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">download</span> Exporter (CSV)
        </button>
<div class="w-8 h-8 rounded-full border border-border-muted overflow-hidden">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</header>
<main class="pt-20 px-6 pb-6 max-w-7xl mx-auto flex gap-6 h-[calc(100vh-80px)]">
<!-- Left Sidebar: Filters -->
<aside class="w-64 flex-shrink-0 hidden md:block">
<div class="bg-surface-card border border-border-muted rounded-lg p-4 h-full overflow-y-auto">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-4">Filtres</h3>
<div class="space-y-6">
<!-- Date Range -->
<div>
<h4 class="font-label-md text-on-surface-variant uppercase tracking-wider mb-2">Période</h4>
<select class="w-full bg-surface-container border border-border-muted rounded px-3 py-2 text-on-surface text-body-sm outline-none">
<option>Aujourd'hui</option>
<option selected="">7 Derniers Jours</option>
<option>30 Derniers Jours</option>
<option>Personnalisé...</option>
</select>
</div>
<!-- Event Type -->
<div>
<h4 class="font-label-md text-on-surface-variant uppercase tracking-wider mb-2">Type d'Événement</h4>
<div class="space-y-2">
<label class="flex items-center gap-2 cursor-pointer group">
<input checked="" class="w-4 h-4 rounded border-border-muted text-primary focus:ring-primary bg-surface-container" type="checkbox"/>
<span class="text-body-sm text-on-surface group-hover:text-primary transition-colors">Système &amp; Alertes</span>
</label>
<label class="flex items-center gap-2 cursor-pointer group">
<input checked="" class="w-4 h-4 rounded border-border-muted text-primary focus:ring-primary bg-surface-container" type="checkbox"/>
<span class="text-body-sm text-on-surface group-hover:text-primary transition-colors">Ordres de Travail</span>
</label>
<label class="flex items-center gap-2 cursor-pointer group">
<input checked="" class="w-4 h-4 rounded border-border-muted text-primary focus:ring-primary bg-surface-container" type="checkbox"/>
<span class="text-body-sm text-on-surface group-hover:text-primary transition-colors">Mises à jour Inventaire</span>
</label>
<label class="flex items-center gap-2 cursor-pointer group">
<input class="w-4 h-4 rounded border-border-muted text-primary focus:ring-primary bg-surface-container" type="checkbox"/>
<span class="text-body-sm text-on-surface group-hover:text-primary transition-colors">Connexions Utilisateurs</span>
</label>
</div>
</div>
<!-- Severity -->
<div>
<h4 class="font-label-md text-on-surface-variant uppercase tracking-wider mb-2">Sévérité</h4>
<div class="flex gap-2 flex-wrap">
<button class="px-3 py-1 bg-surface-container border border-border-muted rounded-full text-label-sm font-label-md hover:bg-surface-variant transition-colors text-on-surface">Info</button>
<button class="px-3 py-1 bg-warning/10 border border-warning/20 rounded-full text-label-sm font-label-md text-warning">Warning</button>
<button class="px-3 py-1 bg-error/10 border border-error/20 rounded-full text-label-sm font-label-md text-error">Critical</button>
</div>
</div>
</div>
</div>
</aside>
<!-- Main Area: Log List -->
<div class="flex-1 flex flex-col bg-surface-card border border-border-muted rounded-lg overflow-hidden">
<div class="p-4 border-b border-border-muted bg-surface flex justify-between items-center">
<div class="relative w-full max-w-md">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
<input class="w-full bg-surface-container border border-border-muted rounded px-3 py-1.5 pl-9 text-on-surface text-body-sm outline-none focus:border-primary transition-colors" placeholder="Rechercher par ID, ressource ou message..." type="text"/>
</div>
<div class="text-label-sm text-on-surface-variant">24 résultats filtrés</div>
</div>
<div class="flex-1 overflow-y-auto">
<table class="w-full text-left border-collapse">
<thead class="sticky top-0 bg-surface z-10 border-b border-border-muted">
<tr>
<th class="px-4 py-3 font-label-sm uppercase text-on-surface-variant">Timestamp</th>
<th class="px-4 py-3 font-label-sm uppercase text-on-surface-variant">Sévérité</th>
<th class="px-4 py-3 font-label-sm uppercase text-on-surface-variant">Type</th>
<th class="px-4 py-3 font-label-sm uppercase text-on-surface-variant">Message</th>
<th class="px-4 py-3 font-label-sm uppercase text-on-surface-variant text-right">Utilisateur / Source</th>
</tr>
</thead>
<tbody class="divide-y divide-border-muted text-body-sm">
<!-- Row 1 -->
<tr class="hover:bg-surface-container/50 transition-colors cursor-pointer group">
<td class="px-4 py-3 whitespace-nowrap text-on-surface-variant font-mono text-[11px]">2023-10-26 14:32:01</td>
<td class="px-4 py-3 whitespace-nowrap">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-error/10 text-error border border-error/20 uppercase tracking-wide">Critical</span>
</td>
<td class="px-4 py-3 whitespace-nowrap text-on-surface">Alerte Système</td>
<td class="px-4 py-3 text-on-surface font-medium group-hover:text-primary transition-colors">Défaillance détectée : Sonde T-04 (Chaufferie B) hors ligne.</td>
<td class="px-4 py-3 text-right text-on-surface-variant whitespace-nowrap text-[11px]">System (Aether AI)</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container/50 transition-colors cursor-pointer group">
<td class="px-4 py-3 whitespace-nowrap text-on-surface-variant font-mono text-[11px]">2023-10-26 13:15:42</td>
<td class="px-4 py-3 whitespace-nowrap">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-high text-on-surface-variant border border-border-muted uppercase tracking-wide">Info</span>
</td>
<td class="px-4 py-3 whitespace-nowrap text-on-surface">Ordre de Travail</td>
<td class="px-4 py-3 text-on-surface group-hover:text-primary transition-colors">Statut WO-4092 mis à jour : "En cours" -&gt; "Terminé"</td>
<td class="px-4 py-3 text-right text-on-surface-variant whitespace-nowrap text-[11px]">M. Durand (Tech)</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container/50 transition-colors cursor-pointer group">
<td class="px-4 py-3 whitespace-nowrap text-on-surface-variant font-mono text-[11px]">2023-10-26 11:42:18</td>
<td class="px-4 py-3 whitespace-nowrap">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-warning/10 text-warning border border-warning/20 uppercase tracking-wide">Warning</span>
</td>
<td class="px-4 py-3 whitespace-nowrap text-on-surface">Inventaire</td>
<td class="px-4 py-3 text-on-surface group-hover:text-primary transition-colors">Niveau de stock bas (Filtres G4). Stock actuel : 4, Seuil : 10.</td>
<td class="px-4 py-3 text-right text-on-surface-variant whitespace-nowrap text-[11px]">Module Inventaire</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container/50 transition-colors cursor-pointer group">
<td class="px-4 py-3 whitespace-nowrap text-on-surface-variant font-mono text-[11px]">2023-10-26 09:05:00</td>
<td class="px-4 py-3 whitespace-nowrap">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-high text-on-surface-variant border border-border-muted uppercase tracking-wide">Info</span>
</td>
<td class="px-4 py-3 whitespace-nowrap text-on-surface">Système</td>
<td class="px-4 py-3 text-on-surface group-hover:text-primary transition-colors">Sauvegarde quotidienne de la base de données terminée avec succès.</td>
<td class="px-4 py-3 text-right text-on-surface-variant whitespace-nowrap text-[11px]">Cron Job</td>
</tr>
<!-- Row 5 -->
<tr class="hover:bg-surface-container/50 transition-colors cursor-pointer group">
<td class="px-4 py-3 whitespace-nowrap text-on-surface-variant font-mono text-[11px]">2023-10-25 16:22:11</td>
<td class="px-4 py-3 whitespace-nowrap">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-high text-on-surface-variant border border-border-muted uppercase tracking-wide">Info</span>
</td>
<td class="px-4 py-3 whitespace-nowrap text-on-surface">Ordre de Travail</td>
<td class="px-4 py-3 text-on-surface group-hover:text-primary transition-colors">Nouveau WO-4093 créé : "Inspection annuelle Ascenseur A"</td>
<td class="px-4 py-3 text-right text-on-surface-variant whitespace-nowrap text-[11px]">S. Lefebvre (Admin)</td>
</tr>
</tbody>
</table>
</div>
<div class="p-3 border-t border-border-muted bg-surface flex justify-between items-center text-body-sm text-on-surface-variant">
<span>Affichage de 1 à 24 sur 24</span>
<div class="flex gap-1">
<button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container disabled:opacity-50" disabled=""><span class="material-symbols-outlined text-[18px]">chevron_left</span></button>
<button class="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container"><span class="material-symbols-outlined text-[18px]">chevron_right</span></button>
</div>
</div>
</div>
</main>
</div>
    `}} />
  );
}
