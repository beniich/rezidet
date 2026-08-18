import React from 'react';

export default function Inventory() {
  return (
    <div className="bg-background text-on-surface antialiased overflow-hidden min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-header-height z-50 flex items-center justify-between px-margin-page bg-surface border-b border-border-muted transition-colors duration-200">
<div class="flex items-center gap-8 h-full">
<div class="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">Obsidian Metric REZIDET</div>
<!-- Top Nav Links (Hidden on mobile) -->
<nav class="hidden md:flex items-center h-full gap-6 ml-4">
<a class="h-full flex flex-col justify-center text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer active:opacity-80" href="/">
<span class="font-label-md text-label-md">Dashboard</span>
</a>
<a class="h-full flex flex-col justify-center text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors duration-200 cursor-pointer active:opacity-80" href="/inventory">
<span class="font-label-md text-label-md">Inventory</span>
</a>
<a class="h-full flex flex-col justify-center text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 cursor-pointer active:opacity-80" href="/procurement">
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
<input class="bg-transparent border border-border-muted rounded text-on-surface focus:border-primary-container focus:ring-0 pl-9 pr-4 py-1.5 font-body-sm text-body-sm placeholder-on-surface-variant transition-colors w-64" placeholder="Search inventory..." type="text"/>
</div>
<button class="bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-2 rounded hover:bg-primary-fixed-dim transition-colors hidden sm:block">
                Create Order
            </button>
<div class="flex items-center gap-2">
<button class="text-on-surface-variant hover:text-primary p-2 transition-colors">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">notifications</span>
</button>
<button class="text-on-surface-variant hover:text-primary p-2 transition-colors">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">settings</span>
</button>
<button class="text-on-surface-variant hover:text-primary p-2 transition-colors">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">help</span>
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
<h2 class="font-headline-md text-headline-md text-primary">Inventory Control</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">SRE Command Center</p>
</div>
<div class="px-4 mb-6">
<button class="w-full bg-surface-variant border border-border-muted text-on-surface font-label-md text-label-md py-2 rounded hover:border-border-active transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-sm">add</span> New Entry
            </button>
</div>
<nav class="flex-1 overflow-y-auto px-3 space-y-1">
<a class="flex items-center gap-3 px-3 py-2 rounded bg-surface-container-high text-primary border-l-4 border-primary cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">inventory_2</span>
<span class="font-label-md text-label-md">Stock Overview</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">warehouse</span>
<span class="font-label-md text-label-md">Warehouse Management</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">local_shipping</span>
<span class="font-label-md text-label-md">Suppliers</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">history_edu</span>
<span class="font-label-md text-label-md">Consumption Logs</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">analytics</span>
<span class="font-label-md text-label-md">Reports</span>
</a>
</nav>
<div class="px-3 pt-4 border-t border-border-muted mt-auto space-y-1">
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">support_agent</span>
<span class="font-label-md text-label-md">Support</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded border-l-4 border-transparent text-on-surface-variant hover:bg-surface-variant hover:text-on-surface cursor-pointer active:scale-95 transition-all duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">dns</span>
<span class="font-label-md text-label-md">System Status</span>
</a>
</div>
<div class="px-6 py-4 mt-2 flex items-center gap-3">
<div class="w-8 h-8 rounded border border-border-muted overflow-hidden">
<img alt="System Operator" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf2RuMB9wRA_A1hOue2qXCE-9ENV5g4S2KNchG3sykWn3y9wEK556FG_iqxlV_j3zIrOAjzqNz9YSGOpIVIoY6YZV3Lb54UKJeNfwI15JdqZzBMW6t8dEVGsgJMX0JrcpWG4vRC6YMpkkIaFwqMZmQs9QrXM5LFZLHFP-aWsp-E5pWJm0JDEOeCogw744ZFSSM2lBih9ldgeC-p9r2aWXkyetMakD_ZXcBOgrQDa7X2epXUHjX7g_w"/>
</div>
<div>
<div class="font-label-md text-label-md text-on-surface">System Operator</div>
<div class="font-label-sm text-label-sm text-success flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-success"></span> Online</div>
</div>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-[256px] pt-[64px] h-screen overflow-y-auto bg-background p-margin-page pb-12">
<div class="max-w-7xl mx-auto">
<!-- Page Header -->
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
<div>
<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Stock Overview</h1>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Real-time inventory metrics and part status across all nodes.</p>
</div>
<div class="flex gap-3">
<button class="bg-surface-card border border-border-muted text-on-surface font-label-md text-label-md px-4 py-2 rounded hover:border-border-active transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-sm">download</span> Export
                    </button>
<button class="bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-2 rounded hover:bg-primary-fixed-dim transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-sm">add</span> Add Stock
                    </button>
</div>
</div>
<!-- KPI Row (Grid) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-widget-gap mb-8">
<!-- KPI 1: Total Inventory Value -->
<div class="bg-surface-card rounded border border-border-muted p-4 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"></div>
<div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
<div class="flex justify-between items-start mb-2">
<h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Inventory Value</h3>
<span class="material-symbols-outlined text-primary text-xl">account_balance_wallet</span>
</div>
<div class="font-headline-lg text-headline-lg text-on-surface mt-2">$2,458,910</div>
<div class="flex items-center gap-1 mt-2 text-success font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
<span>+3.2% vs last month</span>
</div>
</div>
<!-- KPI 2: Low Stock Alerts -->
<div class="bg-surface-card rounded border border-border-muted p-4 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute left-0 top-0 bottom-0 w-[4px] bg-critical"></div>
<div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-critical/10 to-transparent pointer-events-none"></div>
<div class="flex justify-between items-start mb-2">
<h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Low Stock Alerts</h3>
<span class="material-symbols-outlined text-critical text-xl">warning</span>
</div>
<div class="font-headline-lg text-headline-lg text-on-surface mt-2">14</div>
<div class="flex items-center gap-1 mt-2 text-critical font-label-sm text-label-sm">
<span>Requires immediate action</span>
</div>
</div>
<!-- KPI 3: Pending Orders -->
<div class="bg-surface-card rounded border border-border-muted p-4 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-warning"></div>
<div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-warning/10 to-transparent pointer-events-none"></div>
<div class="flex justify-between items-start mb-2">
<h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Pending Orders</h3>
<span class="material-symbols-outlined text-warning text-xl">local_shipping</span>
</div>
<div class="font-headline-lg text-headline-lg text-on-surface mt-2">42</div>
<div class="flex items-center gap-1 mt-2 text-on-surface-variant font-label-sm text-label-sm">
<span>12 arriving today</span>
</div>
</div>
<!-- KPI 4: System Health (AI Insight) -->
<div class="bg-surface-card rounded border border-border-muted p-4 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-success"></div>
<div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-success/10 to-transparent pointer-events-none"></div>
<div class="flex justify-between items-start mb-2">
<h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Storage Capacity</h3>
<span class="material-symbols-outlined text-success text-xl">dataset</span>
</div>
<div class="font-headline-lg text-headline-lg text-on-surface mt-2">78%</div>
<div class="w-full bg-surface-lowest h-1.5 mt-3 rounded overflow-hidden">
<div class="bg-success h-full" style="width: 78%"></div>
</div>
</div>
</div>
<!-- Complex Bento Grid Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-widget-gap pb-12">
<!-- Main Data Table (Spans 8 cols on desktop) -->
<div class="lg:col-span-8 bg-surface-card rounded border border-border-muted flex flex-col h-[600px]">
<div class="p-4 border-b border-border-muted flex justify-between items-center bg-surface-container/50">
<h2 class="font-headline-sm text-headline-sm text-on-surface">Inventory Roster</h2>
<div class="flex gap-2">
<div class="relative">
<span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">filter_list</span>
<select class="bg-transparent border border-border-muted rounded text-on-surface text-body-sm pl-8 pr-8 py-1 focus:border-primary-container focus:ring-0 appearance-none cursor-pointer hover:border-border-active">
<option class="bg-surface-card text-on-surface">All Categories</option>
<option class="bg-surface-card text-on-surface">Microchips</option>
<option class="bg-surface-card text-on-surface">Cooling Units</option>
</select>
</div>
</div>
</div>
<div class="flex-1 overflow-auto">
<table class="w-full text-left border-collapse">
<thead class="sticky top-0 bg-surface-container z-10">
<tr>
<th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted whitespace-nowrap">Part Name</th>
<th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted whitespace-nowrap">SKU</th>
<th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted whitespace-nowrap">Category</th>
<th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted whitespace-nowrap min-w-[150px]">Stock Level</th>
<th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted whitespace-nowrap">Unit Price</th>
<th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted whitespace-nowrap">Status</th>
</tr>
</thead>
<tbody class="font-body-md text-body-md">
<!-- Row 1 -->
<tr class="border-b border-border-muted hover:bg-surface-bright/20 transition-colors cursor-pointer group">
<td class="p-4 text-on-surface font-medium flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-variant border border-border-muted flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-[18px]">memory</span>
</div>
                                        Core Processor X-900
                                    </td>
<td class="p-4 text-on-surface-variant font-label-md text-label-md">PRC-X900-V2</td>
<td class="p-4 text-on-surface-variant">Processing</td>
<td class="p-4">
<div class="flex flex-col gap-1">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface">450 / 500</span>
<span class="text-on-surface-variant">ROP: 100</span>
</div>
<div class="w-full bg-surface-lowest h-1.5 rounded overflow-hidden">
<div class="bg-success h-full" style="width: 90%"></div>
</div>
</div>
</td>
<td class="p-4 text-on-surface font-label-md text-label-md">$1,250.00</td>
<td class="p-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success border border-success/20">Optimal</span>
</td>
</tr>
<!-- Row 2 (Warning) -->
<tr class="border-b border-border-muted hover:bg-surface-bright/20 transition-colors cursor-pointer group">
<td class="p-4 text-on-surface font-medium flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-variant border border-border-muted flex items-center justify-center">
<span class="material-symbols-outlined text-warning text-[18px]">ac_unit</span>
</div>
                                        Liquid Cooling Radiator T-Series
                                    </td>
<td class="p-4 text-on-surface-variant font-label-md text-label-md">RAD-T-045</td>
<td class="p-4 text-on-surface-variant">Cooling</td>
<td class="p-4">
<div class="flex flex-col gap-1">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-warning font-bold">25 / 150</span>
<span class="text-on-surface-variant">ROP: 30</span>
</div>
<div class="w-full bg-surface-lowest h-1.5 rounded overflow-hidden">
<div class="bg-warning h-full" style="width: 16%"></div>
</div>
</div>
</td>
<td class="p-4 text-on-surface font-label-md text-label-md">$450.00</td>
<td class="p-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-warning/10 text-warning border border-warning/20">Low Stock</span>
</td>
</tr>
<!-- Row 3 (Critical) -->
<tr class="border-b border-border-muted hover:bg-surface-bright/20 transition-colors cursor-pointer group relative">
<td class="p-4 text-on-surface font-medium flex items-center gap-3">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-critical/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="w-8 h-8 rounded bg-surface-variant border border-border-muted flex items-center justify-center">
<span class="material-symbols-outlined text-critical text-[18px]">electrical_services</span>
</div>
                                        High-Voltage Power Supply
                                    </td>
<td class="p-4 text-on-surface-variant font-label-md text-label-md">PSU-HV-8K</td>
<td class="p-4 text-on-surface-variant">Power</td>
<td class="p-4">
<div class="flex flex-col gap-1">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-critical font-bold">2 / 50</span>
<span class="text-on-surface-variant">ROP: 10</span>
</div>
<div class="w-full bg-surface-lowest h-1.5 rounded overflow-hidden">
<div class="bg-critical h-full animate-pulse" style="width: 4%"></div>
</div>
</div>
</td>
<td class="p-4 text-on-surface font-label-md text-label-md">$3,800.00</td>
<td class="p-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-critical/10 text-critical border border-critical/20">Critical</span>
</td>
</tr>
<!-- Row 4 -->
<tr class="border-b border-border-muted hover:bg-surface-bright/20 transition-colors cursor-pointer group">
<td class="p-4 text-on-surface font-medium flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-variant border border-border-muted flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant text-[18px]">router</span>
</div>
                                        Network Switch Modular 48-Port
                                    </td>
<td class="p-4 text-on-surface-variant font-label-md text-label-md">NET-SW-48M</td>
<td class="p-4 text-on-surface-variant">Networking</td>
<td class="p-4">
<div class="flex flex-col gap-1">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface">85 / 100</span>
<span class="text-on-surface-variant">ROP: 20</span>
</div>
<div class="w-full bg-surface-lowest h-1.5 rounded overflow-hidden">
<div class="bg-success h-full" style="width: 85%"></div>
</div>
</div>
</td>
<td class="p-4 text-on-surface font-label-md text-label-md">$850.00</td>
<td class="p-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success border border-success/20">Optimal</span>
</td>
</tr>
<!-- Row 5 -->
<tr class="border-b border-border-muted hover:bg-surface-bright/20 transition-colors cursor-pointer group">
<td class="p-4 text-on-surface font-medium flex items-center gap-3">
<div class="w-8 h-8 rounded bg-surface-variant border border-border-muted flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant text-[18px]">storage</span>
</div>
                                        NVMe Storage Array 16TB
                                    </td>
<td class="p-4 text-on-surface-variant font-label-md text-label-md">STO-NV-16T</td>
<td class="p-4 text-on-surface-variant">Storage</td>
<td class="p-4">
<div class="flex flex-col gap-1">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface">120 / 200</span>
<span class="text-on-surface-variant">ROP: 50</span>
</div>
<div class="w-full bg-surface-lowest h-1.5 rounded overflow-hidden">
<div class="bg-success h-full" style="width: 60%"></div>
</div>
</div>
</td>
<td class="p-4 text-on-surface font-label-md text-label-md">$2,100.00</td>
<td class="p-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success border border-success/20">Optimal</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Right Sidebar Stack (Spans 4 cols on desktop) -->
<div class="lg:col-span-4 flex flex-col gap-widget-gap">
<!-- AI Insight Widget -->
<div class="bg-surface-card rounded border border-border-muted p-5 relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-[4px] bg-primary"></div>
<h3 class="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary">auto_awesome</span>
                            Predictive Insights
                        </h3>
<div class="space-y-4">
<div class="bg-surface-container-low rounded p-3 border border-border-muted">
<div class="flex justify-between items-start mb-1">
<span class="font-label-md text-label-md text-warning">Spike Predicted</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">In 14 days</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface">Cooling units historically show 45% higher failure rate during Q3 heatwaves. Recommend increasing ROP by 20%.</p>
<button class="mt-3 text-primary text-label-sm font-label-md uppercase tracking-wide hover:text-primary-fixed-dim transition-colors">Apply Recommendation</button>
</div>
<div class="bg-surface-container-low rounded p-3 border border-border-muted">
<div class="flex justify-between items-start mb-1">
<span class="font-label-md text-label-md text-success">Optimization</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Active</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface">Excess inventory detected for Legacy Cables (SKU: CAB-L-01). Pausing auto-reorder to save capital.</p>
</div>
</div>
</div>
<!-- Supplier Status -->
<div class="bg-surface-card rounded border border-border-muted p-5 flex-1">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-4">Supplier Lead Times</h3>
<div class="space-y-4">
<div class="flex items-center gap-3">
<div class="w-2 h-2 rounded-full bg-success"></div>
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md">
<span class="text-on-surface">GlobalTech Industries</span>
<span class="text-on-surface-variant">2-3 days</span>
</div>
<div class="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Reliability: 98%</div>
</div>
</div>
<div class="flex items-center gap-3">
<div class="w-2 h-2 rounded-full bg-warning"></div>
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md">
<span class="text-on-surface">Nexus Parts</span>
<span class="text-warning">7-10 days</span>
</div>
<div class="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Delayed customs clearance</div>
</div>
</div>
<div class="flex items-center gap-3">
<div class="w-2 h-2 rounded-full bg-success"></div>
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md">
<span class="text-on-surface">Quantum Logistics</span>
<span class="text-on-surface-variant">1 day</span>
</div>
<div class="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Premium tier active</div>
</div>
</div>
</div>
<button class="w-full mt-6 bg-transparent border border-border-muted text-on-surface font-label-md text-label-md py-2 rounded hover:bg-surface-variant transition-colors">
                            View All Suppliers
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
