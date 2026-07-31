import React from 'react';

export default function AssetsInventory() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-20 md:pb-0 md:pt-header-height flex flex-col md:flex-row" dangerouslySetInnerHTML={{ __html: `
<!-- TopAppBar -->
<header class="fixed top-0 w-full h-16 bg-surface dark:bg-surface flex justify-between items-center px-margin-page z-50 border-b border-border-muted md:w-full">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">person</span>
</div>
<span class="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">SRE COMMAND</span>
</div>
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:opacity-80 text-primary dark:text-primary">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
</header>
<!-- SideNav (Desktop) -->
<nav class="hidden md:flex flex-col fixed left-0 top-header-height w-sidebar-width h-[calc(100vh-64px)] bg-surface-container-low border-r border-border-muted p-4 z-40">
<div class="space-y-2 flex-1">
<a class="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors group" href="/">
<span class="material-symbols-outlined group-hover:text-primary transition-all">dashboard</span>
<span class="font-body-md text-body-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 p-3 rounded-lg bg-secondary-container/20 text-primary transition-colors group" href="/assets-inventory">
<span class="material-symbols-outlined text-primary">inventory_2</span>
<span class="font-body-md text-body-md font-semibold">Assets</span>
</a>
<a class="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors group" href="/work-orders">
<span class="material-symbols-outlined group-hover:text-primary transition-all">build</span>
<span class="font-body-md text-body-md">Work</span>
</a>
<a class="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors group" href="/alerts">
<span class="material-symbols-outlined group-hover:text-primary transition-all">notifications</span>
<span class="font-body-md text-body-md">Alerts</span>
</a>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="flex-1 w-full pt-16 md:pt-0 md:ml-sidebar-width p-margin-page">
<!-- Page Header & Actions -->
<div class="mb-6 space-y-4">
<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Asset Inventory</h1>
<div class="flex gap-2 w-full">
<div class="relative flex-1">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input class="w-full bg-transparent border border-border-muted rounded-lg py-2 pl-10 pr-4 text-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors outline-none placeholder-outline" placeholder="Search assets, IDs, or locations..." type="text"/>
</div>
<button class="bg-primary-container text-on-primary-fixed flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary transition-colors flex-shrink-0 active:scale-95">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">qr_code_scanner</span>
</button>
</div>
<!-- Filters -->
<div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
<button class="px-3 py-1 rounded-full bg-surface-container-high border border-border-active text-primary font-label-md text-label-md whitespace-nowrap">All Assets</button>
<button class="px-3 py-1 rounded-full bg-transparent border border-border-muted text-on-surface-variant hover:border-border-active transition-colors font-label-md text-label-md whitespace-nowrap">Critical</button>
<button class="px-3 py-1 rounded-full bg-transparent border border-border-muted text-on-surface-variant hover:border-border-active transition-colors font-label-md text-label-md whitespace-nowrap">Warning</button>
<button class="px-3 py-1 rounded-full bg-transparent border border-border-muted text-on-surface-variant hover:border-border-active transition-colors font-label-md text-label-md whitespace-nowrap">HVAC</button>
<button class="px-3 py-1 rounded-full bg-transparent border border-border-muted text-on-surface-variant hover:border-border-active transition-colors font-label-md text-label-md whitespace-nowrap">Power</button>
</div>
</div>
<!-- Asset Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-widget-gap">
<!-- Asset Card 1: Operational -->
<a href="/asset-detail" class="bg-surface-card rounded-lg p-4 border border-border-muted hover:border-border-active transition-colors accent-bar-success flex flex-col gap-3 group relative overflow-hidden block">
<div class="flex justify-between items-start">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">HVAC Unit B-04</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1 flex items-center gap-1 uppercase">
<span class="material-symbols-outlined text-[14px]">location_on</span>
                            Sector 7G • Roof Level
                        </p>
</div>
<div class="px-2 py-1 rounded-md status-chip-success font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
                        Opérationnel
                    </div>
</div>
<div class="mt-2 grid grid-cols-2 gap-4">
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase">AI Health Score</p>
<div class="flex items-end gap-1">
<span class="font-headline-md text-headline-md text-success">98</span>
<span class="font-label-md text-label-md text-success mb-1">%</span>
</div>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase">Last Insp.</p>
<p class="font-body-sm text-body-sm text-on-surface mt-1">2 hours ago</p>
</div>
</div>
<div class="w-full bg-surface-container-highest h-1 rounded-full mt-1">
<div class="bg-success h-1 rounded-full w-[98%]"></div>
</div>
</a>
<!-- Asset Card 2: Warning -->
<div class="bg-surface-card rounded-lg p-4 border border-border-muted hover:border-border-active transition-colors accent-bar-warning flex flex-col gap-3 group relative overflow-hidden">
<div class="flex justify-between items-start">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">Gen-Set Alpha-2</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1 flex items-center gap-1 uppercase">
<span class="material-symbols-outlined text-[14px]">location_on</span>
                            Basement L2 • Power Rm
                        </p>
</div>
<div class="px-2 py-1 rounded-md status-chip-warning font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-warning animate-pulse"></span>
                        Maintenance
                    </div>
</div>
<div class="mt-2 grid grid-cols-2 gap-4">
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase">AI Health Score</p>
<div class="flex items-end gap-1">
<span class="font-headline-md text-headline-md text-warning">72</span>
<span class="font-label-md text-label-md text-warning mb-1">%</span>
</div>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase">Issue Detected</p>
<p class="font-body-sm text-body-sm text-warning mt-1">Oil Pressure Drop</p>
</div>
</div>
<div class="w-full bg-surface-container-highest h-1 rounded-full mt-1">
<div class="bg-warning h-1 rounded-full w-[72%]"></div>
</div>
</div>
<!-- Asset Card 3: Critical -->
<div class="bg-surface-card rounded-lg p-4 border border-border-muted hover:border-border-active transition-colors accent-bar-critical flex flex-col gap-3 group relative overflow-hidden">
<div class="absolute top-0 right-0 w-16 h-16 bg-critical/5 rounded-bl-full pointer-events-none"></div>
<div class="flex justify-between items-start">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">Main Chiller C-01</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1 flex items-center gap-1 uppercase">
<span class="material-symbols-outlined text-[14px]">location_on</span>
                            Facility 3 • Ext Yard
                        </p>
</div>
<div class="px-2 py-1 rounded-md status-chip-critical font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]">error</span>
                        Panne
                    </div>
</div>
<div class="mt-2 grid grid-cols-2 gap-4">
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase">AI Health Score</p>
<div class="flex items-end gap-1">
<span class="font-headline-md text-headline-md text-critical">14</span>
<span class="font-label-md text-label-md text-critical mb-1">%</span>
</div>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase">Downtime</p>
<p class="font-body-sm text-body-sm text-critical mt-1 font-semibold">45 mins</p>
</div>
</div>
<div class="w-full bg-surface-container-highest h-1 rounded-full mt-1">
<div class="bg-critical h-1 rounded-full w-[14%]"></div>
</div>
<button class="w-full mt-2 py-2 bg-critical/10 text-critical border border-critical/20 rounded-md font-label-md text-label-md uppercase hover:bg-critical/20 transition-colors">
                    Dispatch Tech
                </button>
</div>
<!-- Asset Card 4: Operational -->
<div class="bg-surface-card rounded-lg p-4 border border-border-muted hover:border-border-active transition-colors accent-bar-success flex flex-col gap-3 group relative overflow-hidden">
<div class="flex justify-between items-start">
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">Server Rack R-44</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1 flex items-center gap-1 uppercase">
<span class="material-symbols-outlined text-[14px]">location_on</span>
                            Data Center Alpha
                        </p>
</div>
<div class="px-2 py-1 rounded-md status-chip-success font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
                        Opérationnel
                    </div>
</div>
<div class="mt-2 grid grid-cols-2 gap-4">
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase">AI Health Score</p>
<div class="flex items-end gap-1">
<span class="font-headline-md text-headline-md text-success">99</span>
<span class="font-label-md text-label-md text-success mb-1">%</span>
</div>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase">Thermal Load</p>
<p class="font-body-sm text-body-sm text-on-surface mt-1">Nominal (22°C)</p>
</div>
</div>
<div class="w-full bg-surface-container-highest h-1 rounded-full mt-1">
<div class="bg-success h-1 rounded-full w-[99%]"></div>
</div>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile) -->
<nav class="md:hidden fixed bottom-0 w-full z-50 border-t border-border-muted bg-surface-container-low dark:bg-surface-container-low flex justify-around items-center h-16 px-4">
<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95 group" href="/">
<span class="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">dashboard</span>
<span class="font-label-sm text-label-sm">Dashboard</span>
</a>
<a class="flex flex-col items-center justify-center text-primary bg-secondary-container/20 rounded-xl p-1 active:scale-95 transition-transform" href="/assets-inventory">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">inventory_2</span>
<span class="font-label-sm text-label-sm">Assets</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95 group" href="/work-orders">
<span class="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">build</span>
<span class="font-label-sm text-label-sm">Work</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95 group" href="/alerts">
<span class="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">notifications</span>
<span class="font-label-sm text-label-sm">Alerts</span>
</a>
</nav>
    `}} />
  );
}
