import React from 'react';

export default function StockTransfer() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col md:flex-row pb-16 md:pb-0 overflow-x-hidden" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar Shell (Assets Active implicitly by context) -->
<header class="bg-surface dark:bg-surface h-header-height w-full top-0 sticky border-b border-border-muted flex justify-between items-center px-margin-page md:ml-sidebar-width z-50">
<div class="flex items-center gap-6">
<h1 class="font-headline-sm text-headline-sm font-bold text-on-surface hidden md:block">REZIDET</h1>
<h1 class="font-headline-sm text-headline-sm font-bold text-primary-fixed md:hidden">REZIDET Intervention</h1>
<nav class="hidden md:flex gap-6">
<a class="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-all py-5 border-b-2 border-transparent" href="#">Main Campus</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-all py-5 border-b-2 border-transparent" href="#">Research Wing</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-all py-5 border-b-2 border-transparent" href="#">Data Center</a>
</nav>
</div>
<div class="flex items-center gap-4">
<button class="hidden md:block bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-2 rounded font-bold">AI Insights</button>
<div class="flex gap-2 text-on-surface-variant">
<span class="material-symbols-outlined cursor-pointer hover:text-on-surface">notifications</span>
<span class="material-symbols-outlined cursor-pointer hover:text-on-surface">search</span>
</div>
<img alt="Executive Profile" class="w-8 h-8 rounded-full object-cover border border-border-muted hidden md:block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPlLkSKvqqmscLRYqkbponYcOic2chcecwYQil5WMr8yZhJ6iKr3nCsRxUnAmvqiiLK93zMK7inMgFWKz2CJqo6KD7Ms_lkfSRDZZC5RhXU4NpySjAH5sgodkGteYUwQAhJpjE2uqrR4NG52VnVPCSg6cw52h0pCpgE2jx3begJa5CQSjVwRWVmRbwzbmAVKufJWBwMWu-xbavKU4HgzwT70kymv-S0EWy6a7OXPZcfiKNJJYy4-Ds"/>
</div>
</header>
<!-- SideNavBar Shell -->
<aside class="bg-surface-container border-r border-border-muted fixed h-full w-sidebar-width left-0 top-0 z-[60] flex flex-col py-4 hidden md:flex">
<div class="px-6 mb-8">
<div class="flex items-center gap-4 mb-6">
<div class="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center border border-border-muted overflow-hidden">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdgK9QEFp-MOEIErb8QEx8A-ILEi3wEE_eUFXhUi8deH0ZojIsVBNS1GO9iQc921UYXCqKkglY72OViCSISjo90NOs_KU62yMWVT89U2nbi6EAP7Zkot5RbWkMOCUDKsMIE3PaVESkecm77vCRe90iMijB14iUYC38NCMHpXVcFy_ettU7ZA-pTSXLvGXGIzVRvraeHaSm7ywEJFI97W-1EmI9KpRzwyxol7D278ziDok562CmryjL"/>
</div>
<div>
<div class="font-headline-sm text-headline-sm text-primary-fixed">Intervention Lead</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Field Ops Team A</div>
</div>
</div>
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">REZIDET v4.2</div>
</div>
<div class="flex flex-col flex-1 px-4 gap-2">
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg" href="/">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-body-md text-body-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg" href="/sre-work-orders">
<span class="material-symbols-outlined">assignment</span>
<span class="font-body-md text-body-md">My Tasks</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-r-full" href="/stock-transfer">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">precision_manufacturing</span>
<span class="font-body-md text-body-md">Parts Catalog</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined">map</span>
<span class="font-body-md text-body-md">Warehouse Maps</span>
</a>
</div>
<div class="px-4 mt-auto">
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg" href="/settings">
<span class="material-symbols-outlined">settings</span>
<span class="font-body-md text-body-md">Settings</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="flex-1 w-full md:ml-sidebar-width px-container-padding py-6 max-w-7xl mx-auto">
<!-- Search & Filter Bar -->
<div class="mb-6 sticky top-[64px] z-40 bg-background/90 backdrop-blur-sm py-2">
<div class="relative">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-outline-variant">search</span>
</div>
<input class="block w-full pl-10 pr-12 py-3 bg-surface-card border border-border-muted rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-colors font-body-md text-body-md" placeholder="Search parts by ID, name, or system..." type="text"/>
<button class="absolute inset-y-0 right-0 pr-3 flex items-center text-outline-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">qr_code_scanner</span>
</button>
</div>
<div class="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-2">
<button class="whitespace-nowrap px-4 py-1.5 rounded-full border border-primary text-primary bg-primary/10 font-label-md text-label-md transition-colors hover:bg-primary/20">All Parts</button>
<button class="whitespace-nowrap px-4 py-1.5 rounded-full border border-border-muted text-on-surface-variant font-label-md text-label-md transition-colors hover:bg-surface-variant">In Stock</button>
<button class="whitespace-nowrap px-4 py-1.5 rounded-full border border-border-muted text-on-surface-variant font-label-md text-label-md transition-colors hover:bg-surface-variant">Truck Inventory</button>
<button class="whitespace-nowrap px-4 py-1.5 rounded-full border border-border-muted text-on-surface-variant font-label-md text-label-md transition-colors hover:bg-surface-variant">HVAC Systems</button>
</div>
</div>
<!-- Parts Grid (Bento/Card Style) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-widget-gap">
<!-- Part Card 1 -->
<div class="bg-surface-card border border-border-muted rounded-xl p-4 relative group hover:border-border-active transition-colors flex flex-col h-full">
<div class="absolute left-0 top-0 bottom-0 w-[4px] bg-success rounded-l-xl"></div>
<div class="flex justify-between items-start mb-3 pl-2">
<div class="font-label-md text-label-md text-on-surface-variant uppercase">P-8472-A</div>
<div class="px-2 py-0.5 rounded text-success bg-success/10 font-label-sm text-label-sm flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
                        14 In Stock
                    </div>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 pl-2">High-Pressure Solenoid Valve</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-4 pl-2">Compatible with HVAC Type C units. Includes gaskets.</p>
<div class="mt-auto pl-2 space-y-2 mb-4">
<div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[16px]">warehouse</span>
                        Warehouse A (Aisle 4, Bin 2)
                    </div>
<div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[16px]">local_shipping</span>
                        Truck 4 (Your Vehicle) - <span class="text-on-surface">2 Qty</span>
</div>
</div>
<button class="w-full pl-2 py-2.5 rounded-lg bg-surface-container-high text-primary-container font-body-md text-body-md font-semibold hover:bg-surface-bright transition-colors border border-border-muted">
                    Add to Current Task
                </button>
</div>
<!-- Part Card 2 (Low Stock) -->
<div class="bg-surface-card border border-border-muted rounded-xl p-4 relative group hover:border-border-active transition-colors flex flex-col h-full">
<div class="absolute left-0 top-0 bottom-0 w-[4px] bg-warning rounded-l-xl"></div>
<div class="flex justify-between items-start mb-3 pl-2">
<div class="font-label-md text-label-md text-on-surface-variant uppercase">M-1029-X</div>
<div class="px-2 py-0.5 rounded text-warning bg-warning/10 font-label-sm text-label-sm flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-warning"></span>
                        2 In Stock
                    </div>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 pl-2">Primary Control Board (V2)</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-4 pl-2">Main logic board for elevator chassis 400 series.</p>
<div class="mt-auto pl-2 space-y-2 mb-4">
<div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[16px]">warehouse</span>
                        Central Depot
                    </div>
</div>
<button onclick="window.location.href='/quick-transfer'" class="w-full pl-2 py-2.5 rounded-lg bg-surface-container-high text-primary-container font-body-md text-body-md font-semibold hover:bg-surface-bright transition-colors border border-border-muted">
                    Request Transfer
                </button>
</div>
<!-- Part Card 3 -->
<div class="bg-surface-card border border-border-muted rounded-xl p-4 relative group hover:border-border-active transition-colors flex flex-col h-full">
<div class="absolute left-0 top-0 bottom-0 w-[4px] bg-success rounded-l-xl"></div>
<div class="flex justify-between items-start mb-3 pl-2">
<div class="font-label-md text-label-md text-on-surface-variant uppercase">F-3321-R</div>
<div class="px-2 py-0.5 rounded text-success bg-success/10 font-label-sm text-label-sm flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-success"></span>
                        45 In Stock
                    </div>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 pl-2">HEPA Filter Cartridge</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-4 pl-2">Standard issue filter for clean-room air handlers.</p>
<div class="mt-auto pl-2 space-y-2 mb-4">
<div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[16px]">warehouse</span>
                        Warehouse B (Aisle 1)
                    </div>
<div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[16px]">local_shipping</span>
                        Truck 4 (Your Vehicle) - <span class="text-on-surface">5 Qty</span>
</div>
</div>
<button class="w-full pl-2 py-2.5 rounded-lg bg-surface-container-high text-primary-container font-body-md text-body-md font-semibold hover:bg-surface-bright transition-colors border border-border-muted">
                    Add to Current Task
                </button>
</div>
<!-- Part Card 4 (Out of Stock) -->
<div class="bg-surface-card border border-border-muted rounded-xl p-4 relative group hover:border-border-active transition-colors flex flex-col h-full opacity-70">
<div class="absolute left-0 top-0 bottom-0 w-[4px] bg-critical rounded-l-xl"></div>
<div class="flex justify-between items-start mb-3 pl-2">
<div class="font-label-md text-label-md text-on-surface-variant uppercase">S-9901-T</div>
<div class="px-2 py-0.5 rounded text-critical bg-critical/10 font-label-sm text-label-sm flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-critical"></span>
                        Out of Stock
                    </div>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 pl-2">Thermal Expansion Valve</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-4 pl-2">Specialty valve for older cooling towers.</p>
<div class="mt-auto pl-2 space-y-2 mb-4">
<div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[16px]">schedule</span>
                        ETA: Oct 24th
                    </div>
</div>
<button class="w-full pl-2 py-2.5 rounded-lg border border-border-muted text-on-surface-variant font-body-md text-body-md font-semibold hover:bg-surface-variant transition-colors">
                    Notify When Available
                </button>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile) -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 pb-2 bg-surface-container-low border-t border-outline-variant md:hidden">
<a class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-all duration-300 ease-in-out" href="/stock-transfer">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">inventory_2</span>
<span class="font-label-sm text-label-sm">Inventory</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">location_on</span>
<span class="font-label-sm text-label-sm mt-1">Warehouses</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface transition-all duration-300 ease-in-out" href="#">
<span class="material-symbols-outlined">history_edu</span>
<span class="font-label-sm text-label-sm mt-1">Usage Log</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface transition-all duration-300 ease-in-out" href="/settings">
<span class="material-symbols-outlined">account_circle</span>
<span class="font-label-sm text-label-sm mt-1">Profile</span>
</a>
</nav>
<!-- Floating Action Button (Mobile Contextual - Add Custom Part/Request) -->
<button class="fixed bottom-24 right-4 z-40 w-14 h-14 bg-primary-fixed text-on-primary-fixed rounded-xl shadow-lg flex items-center justify-center hover:bg-primary-fixed-dim transition-colors md:hidden">
<span class="material-symbols-outlined">add</span>
</button>
</div>
    `}} />
  );
}
