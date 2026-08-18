import React from 'react';

export default function Procurement() {
  return (
    <div className="bg-background text-on-surface antialiased overflow-hidden min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-header-height z-50 flex items-center justify-between px-margin-page bg-surface border-b border-border-muted transition-colors duration-200">
<div class="flex items-center gap-8 h-full">
<div class="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">Obsidian Metric REZIDET</div>
<!-- Top Nav Links -->
<nav class="hidden md:flex items-center h-full gap-6 ml-4">
<a class="h-full flex flex-col justify-center text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer active:opacity-80" href="/">
<span class="font-label-md text-label-md">Dashboard</span>
</a>
<a class="h-full flex flex-col justify-center text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer active:opacity-80" href="/inventory">
<span class="font-label-md text-label-md">Inventory</span>
</a>
<a class="h-full flex flex-col justify-center text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors duration-200 cursor-pointer active:opacity-80" href="/procurement">
<span class="font-label-md text-label-md">Procurement</span>
</a>
<a class="h-full flex flex-col justify-center text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer active:opacity-80" href="/activity-logs">
<span class="font-label-md text-label-md">Logs</span>
</a>
</nav>
</div>
<div class="flex items-center gap-4">
<!-- Search Bar -->
<div class="relative hidden sm:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input class="bg-transparent border border-border-muted rounded text-on-surface focus:border-primary-container focus:ring-0 pl-9 pr-4 py-1.5 font-body-sm text-body-sm placeholder-on-surface-variant transition-colors w-64" placeholder="Search POs, Suppliers..." type="text"/>
</div>
<div class="flex items-center gap-2">
<button class="text-on-surface-variant hover:text-primary p-2 transition-colors relative">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">notifications</span>
<span class="absolute top-1 right-1 w-2 h-2 bg-critical rounded-full"></span>
</button>
<button class="text-on-surface-variant hover:text-primary p-2 transition-colors">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">settings</span>
</button>
<div class="w-8 h-8 rounded-full overflow-hidden border border-border-muted ml-2">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNEa2qbZDmkfFDAK4ae1evLCnkAJsVAn3Srj5F_dNyMkceHOHwrzUXaR5GOWANFDyTZn8jvcGWWnwwfeBTcLs_3L9gT89vQxXCjyk_j8SJfb_VAGDqHJgCcBHI53AY-c66LmGVLsdpMBPXDWJQzjKLII3eQnr0n2LPG887Bkfzqqf7UjBybJdhvIlZOpiNlUfq_-OKT2YepoUiGqxl2ZEkwGR7iOZu4F-7f4dCV_QEuuddg6ZR4T9"/>
</div>
</div>
</div>
</header>
<!-- SideNavBar -->
<aside class="fixed left-0 top-header-height h-[calc(100vh-64px)] w-sidebar-width z-40 hidden md:flex flex-col py-4 bg-surface-container-low border-r border-border-muted">
<div class="px-6 mb-6">
<h2 class="font-headline-md text-headline-md text-primary">Procurement</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Vendor &amp; PO Management</p>
</div>
<div class="px-4 mb-6">
<button class="w-full bg-primary text-on-primary font-label-md text-label-md py-2.5 rounded hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-sm">add</span> New Purchase Order
            </button>
</div>
<nav class="flex-1 overflow-y-auto px-3 space-y-1">
<a class="flex items-center justify-between px-3 py-2 rounded bg-surface-container-high text-primary border-l-4 border-primary cursor-pointer active:scale-95 transition-all duration-150" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">receipt_long</span>
<span class="font-label-md text-label-md">All POs</span>
</div>
<span class="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">142</span>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">pending_actions</span>
<span class="font-label-md text-label-md">Pending Approval</span>
</div>
<span class="bg-warning/10 text-warning px-2 py-0.5 rounded-full text-[10px] font-bold">8</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">local_shipping</span>
<span class="font-label-md text-label-md">In Transit</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">verified</span>
<span class="font-label-md text-label-md">Completed</span>
</a>
<div class="my-4 border-t border-border-muted mx-3"></div>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">storefront</span>
<span class="font-label-md text-label-md">Vendor Directory</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">account_balance</span>
<span class="font-label-md text-label-md">Budget &amp; Spend</span>
</a>
</nav>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-[256px] pt-[64px] h-screen overflow-y-auto bg-background p-margin-page pb-12">
<div class="max-w-7xl mx-auto">
<!-- Page Header -->
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
<div>
<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Purchase Orders</h1>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Manage vendor orders, approvals, and budget tracking.</p>
</div>
<div class="flex gap-2">
<button class="bg-surface-card border border-border-muted text-on-surface font-label-md text-label-md px-3 py-1.5 rounded hover:border-border-active transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">filter_list</span> Filter
                    </button>
<button class="bg-surface-card border border-border-muted text-on-surface font-label-md text-label-md px-3 py-1.5 rounded hover:border-border-active transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">download</span> Export CSV
                    </button>
</div>
</div>
<!-- KPI Metrics Row -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-widget-gap mb-8">
<!-- KPI 1 -->
<div class="bg-surface-card rounded-lg border border-border-muted p-4 relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-on-surface-variant/20"></div>
<div class="flex justify-between items-start mb-1">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Spend (YTD)</span>
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">payments</span>
</div>
<div class="font-headline-lg text-headline-lg text-on-surface mt-1">$1.24M</div>
<div class="mt-2 w-full bg-surface-lowest h-1 rounded overflow-hidden">
<div class="bg-primary h-full w-[65%]"></div>
</div>
<div class="font-label-sm text-label-sm text-on-surface-variant mt-1">65% of Annual Budget</div>
</div>
<!-- KPI 2 -->
<div class="bg-surface-card rounded-lg border border-border-muted p-4 relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
<div class="flex justify-between items-start mb-1">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Pending Approval</span>
<span class="material-symbols-outlined text-warning text-[20px]">pending_actions</span>
</div>
<div class="font-headline-lg text-headline-lg text-warning mt-1">8</div>
<div class="font-label-sm text-label-sm text-on-surface-variant mt-3 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">timer</span> Value: $45,200
                        </div>
</div>
<!-- KPI 3 -->
<div class="bg-surface-card rounded-lg border border-border-muted p-4 relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
<div class="flex justify-between items-start mb-1">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Active POs</span>
<span class="material-symbols-outlined text-primary text-[20px]">autorenew</span>
</div>
<div class="font-headline-lg text-headline-lg text-primary mt-1">34</div>
<div class="font-label-sm text-label-sm text-on-surface-variant mt-3 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">local_shipping</span> 12 arriving this week
                        </div>
</div>
<!-- KPI 4 -->
<div class="bg-surface-card rounded-lg border border-border-muted p-4 relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-success"></div>
<div class="flex justify-between items-start mb-1">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Vendor Perf.</span>
<span class="material-symbols-outlined text-success text-[20px]">speed</span>
</div>
<div class="font-headline-lg text-headline-lg text-success mt-1">94%</div>
<div class="font-label-sm text-label-sm text-on-surface-variant mt-3 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">trending_up</span> +2.1% On-time delivery
                        </div>
</div>
</div>
<!-- Main Content Area: PO List & Details Layout -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-widget-gap h-[calc(100vh-340px)] min-h-[500px]">
<!-- PO List (Left 2/3) -->
<div class="lg:col-span-2 bg-surface-card border border-border-muted rounded-lg flex flex-col overflow-hidden">
<div class="p-4 border-b border-border-muted bg-surface-container flex justify-between items-center">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Recent Orders</h3>
<div class="flex gap-2">
<span class="px-2 py-1 rounded bg-surface-variant text-on-surface-variant font-label-sm text-[10px] uppercase border border-border-muted cursor-pointer hover:border-border-active">All</span>
<span class="px-2 py-1 rounded bg-warning/10 text-warning font-label-sm text-[10px] uppercase border border-warning/20 cursor-pointer">Pending</span>
</div>
</div>
<div class="flex-1 overflow-y-auto">
<table class="w-full text-left border-collapse">
<thead class="sticky top-0 bg-surface-container/90 backdrop-blur z-10">
<tr>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">PO Number</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Vendor</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Date</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Amount</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Status</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm">
<!-- Row 1: Selected -->
<tr class="border-b border-border-muted bg-primary/5 cursor-pointer relative">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
<td class="p-3 text-primary font-medium">PO-2023-1042</td>
<td class="p-3 text-on-surface">GlobalTech Industries</td>
<td class="p-3 text-on-surface-variant">Oct 24, 2023</td>
<td class="p-3 text-on-surface font-medium">$12,450.00</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-warning/10 text-warning border border-warning/20">Pending Approval</span>
</td>
</tr>
<!-- Row 2 -->
<tr class="border-b border-border-muted hover:bg-surface-container-low transition-colors cursor-pointer">
<td class="p-3 text-primary hover:underline font-medium">PO-2023-1041</td>
<td class="p-3 text-on-surface">Nexus Parts &amp; Supply</td>
<td class="p-3 text-on-surface-variant">Oct 22, 2023</td>
<td class="p-3 text-on-surface font-medium">$3,200.50</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">In Transit</span>
</td>
</tr>
<!-- Row 3 -->
<tr class="border-b border-border-muted hover:bg-surface-container-low transition-colors cursor-pointer">
<td class="p-3 text-primary hover:underline font-medium">PO-2023-1040</td>
<td class="p-3 text-on-surface">HVAC Masters Inc.</td>
<td class="p-3 text-on-surface-variant">Oct 20, 2023</td>
<td class="p-3 text-on-surface font-medium">$8,900.00</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success border border-success/20">Delivered</span>
</td>
</tr>
<!-- Row 4 -->
<tr class="border-b border-border-muted hover:bg-surface-container-low transition-colors cursor-pointer">
<td class="p-3 text-primary hover:underline font-medium">PO-2023-1039</td>
<td class="p-3 text-on-surface">Quantum Logistics</td>
<td class="p-3 text-on-surface-variant">Oct 18, 2023</td>
<td class="p-3 text-on-surface font-medium">$1,150.00</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success border border-success/20">Delivered</span>
</td>
</tr>
<!-- Row 5 -->
<tr class="border-b border-border-muted hover:bg-surface-container-low transition-colors cursor-pointer">
<td class="p-3 text-primary hover:underline font-medium">PO-2023-1038</td>
<td class="p-3 text-on-surface">Facility Solutions Co.</td>
<td class="p-3 text-on-surface-variant">Oct 15, 2023</td>
<td class="p-3 text-on-surface font-medium">$45,000.00</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-surface-variant text-on-surface-variant border border-border-muted">Draft</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- PO Details Panel (Right 1/3) -->
<div class="lg:col-span-1 bg-surface-card border border-border-muted rounded-lg flex flex-col overflow-hidden relative">
<!-- Details Header -->
<div class="p-4 border-b border-border-muted bg-surface-container">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-sm text-headline-sm text-on-surface">PO-2023-1042</h3>
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-warning/10 text-warning border border-warning/20">Pending</span>
</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Vendor: <span class="text-on-surface font-medium">GlobalTech Industries</span></div>
</div>
<!-- Details Body -->
<div class="flex-1 overflow-y-auto p-4">
<div class="space-y-6">
<!-- Timeline/Workflow -->
<div>
<h4 class="font-label-md text-label-md text-on-surface-variant uppercase mb-3">Approval Workflow</h4>
<div class="relative border-l border-border-muted ml-3 space-y-4">
<!-- Step 1 -->
<div class="relative pl-6">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-success ring-4 ring-surface-card"></div>
<div class="font-label-md text-label-md text-on-surface">Submitted</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">J. Smith • Oct 24, 09:15 AM</div>
</div>
<!-- Step 2 -->
<div class="relative pl-6">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-warning ring-4 ring-surface-card animate-pulse"></div>
<div class="font-label-md text-label-md text-warning">Dept. Head Approval</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">Awaiting action from M. Davis</div>
</div>
<!-- Step 3 -->
<div class="relative pl-6">
<div class="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-surface-variant ring-4 ring-surface-card"></div>
<div class="font-label-md text-label-md text-on-surface-variant">Finance Review</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">Pending</div>
</div>
</div>
</div>
<div class="border-t border-border-muted"></div>
<!-- Line Items Summary -->
<div>
<h4 class="font-label-md text-label-md text-on-surface-variant uppercase mb-3">Line Items (3)</h4>
<div class="space-y-3 font-body-sm text-body-sm">
<div class="flex justify-between items-start">
<div>
<div class="text-on-surface">Core Processor X-900</div>
<div class="text-on-surface-variant text-[11px]">Qty: 5 @ $1,250.00</div>
</div>
<div class="text-on-surface font-medium">$6,250.00</div>
</div>
<div class="flex justify-between items-start">
<div>
<div class="text-on-surface">NVMe Storage 16TB</div>
<div class="text-on-surface-variant text-[11px]">Qty: 2 @ $2,100.00</div>
</div>
<div class="text-on-surface font-medium">$4,200.00</div>
</div>
<div class="flex justify-between items-start">
<div>
<div class="text-on-surface">Server Rack R-44 Mounts</div>
<div class="text-on-surface-variant text-[11px]">Qty: 10 @ $200.00</div>
</div>
<div class="text-on-surface font-medium">$2,000.00</div>
</div>
</div>
</div>
<div class="border-t border-border-muted pt-3">
<div class="flex justify-between items-center font-headline-sm text-headline-sm text-on-surface">
<span>Total</span>
<span>$12,450.00</span>
</div>
</div>
</div>
</div>
<!-- Action Footer -->
<div class="p-4 border-t border-border-muted bg-surface-container flex gap-2">
<button class="flex-1 bg-transparent border border-border-muted text-on-surface font-label-md text-label-md py-2 rounded hover:bg-surface-variant transition-colors">
                            Reject
                        </button>
<button class="flex-1 bg-primary text-on-primary font-label-md text-label-md py-2 rounded hover:bg-primary-fixed-dim transition-colors">
                            Approve PO
                        </button>
</div>
</div>
</div>
</div>
</main>
</div>
    `}} />
  );
}
