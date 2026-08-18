import React from 'react';

export default function DashboardExecutive() {
  return (
    <div className="bg-background text-on-surface font-body-sm min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- TopNavBar -->
<header class="docked top-0 w-full bg-surface dark:bg-surface border-b border-outline-variant dark:border-outline-variant flex justify-between items-center h-16 px-6 ml-64 w-[calc(100%-16rem)] z-40 fixed">
<div class="flex items-center gap-6">
<h1 class="font-headline-sm text-headline-sm font-black text-on-surface">Executive Dashboard</h1>
<div class="flex bg-surface-container-low border border-outline-variant rounded px-3 py-1.5 focus-within:ring-1 focus-within:ring-primary items-center">
<span class="material-symbols-outlined text-outline text-[16px] mr-2">search</span>
<input class="bg-transparent border-none focus:ring-0 text-body-sm p-0 w-48 text-on-surface placeholder:text-outline" placeholder="Search..." type="text"/>
</div>
</div>
<nav class="flex gap-6">
<a class="font-label-md text-label-md text-primary border-b-2 border-primary pb-1" href="/">Global View</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:text-primary transition-all" href="#">Building Alpha</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:text-primary transition-all" href="#">Data Center B</a>
</nav>
<div class="flex items-center gap-4">
<button class="bg-primary text-on-primary font-label-md text-label-md px-3 py-1.5 rounded hover:bg-primary-fixed-dim transition-colors">AI Insights</button>
<button class="border border-outline-variant text-on-surface font-label-md text-label-md px-3 py-1.5 rounded hover:bg-surface-container-high transition-colors">Emergency Mode</button>
<div class="flex gap-3 text-outline">
<button class="hover:text-primary transition-colors"><span class="material-symbols-outlined">notifications_active</span></button>
<button class="hover:text-primary transition-colors"><span class="material-symbols-outlined">settings_input_component</span></button>
<button class="hover:text-primary transition-colors"><span class="material-symbols-outlined">account_circle</span></button>
</div>
<img alt="User Profile" class="w-8 h-8 rounded-full border border-outline-variant object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkOyo-NLB95hfjYV71F7kajhK7DhJcc8TcuHD-DbyuZ_LtY2nxOHcdVSdcN340PytZqJCrn5ldkTjf8-679hy1JL9HUaMNknEPDwKPaXmzwWXJxlyovYM4IZPyLOgfjD7RBfiGKwX0ZXSe_MmfBJeah87tuxwEx8oIPxkbnT4BtMkqwvH_n0ze60T0buzoHAmMoldrsMr147Z9SQNDRe07Wr4Rns_2LvnzJme5vZmOn__TMX1_b8JE"/>
</div>
</header>
<!-- SideNavBar -->
<aside class="docked left-0 h-full w-64 border-r border-outline-variant dark:border-outline-variant fixed left-0 top-0 h-full flex flex-col py-4 z-50 bg-surface-container-low dark:bg-surface-container-low">
<div class="px-6 mb-8 flex items-center gap-3">
<img alt="Executive User Avatar" class="w-8 h-8 rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDadH5InoHniIT_63pj3uQ2ONxZ87m4sgwV6iZzUyt-_qTgK09ZkBiEqCPu4c10FWY_HDCtEKaFuFJbdSNZfgIuqnrmTNNjGMEyECJdgWqifvQUlGEcXJDjJYWKET6DlpWm_mEn3UpPywPN50aA_SW52VVZRE9t6dVAQ45fc0wKmpziUveJuayyDWjFXk61F55JpX9wpPr4l0UgGLhZwpVtJNXmI2F01mnGRjc9aLao4LLM3EIv3RfZ"/>
<div>
<h2 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary leading-tight">REZIDET</h2>
<p class="font-label-sm text-label-sm text-on-surface-variant">Enterprise SRE</p>
</div>
</div>
<div class="px-4 mb-6">
<button class="w-full bg-primary text-on-primary font-label-md text-label-md py-2 rounded shadow-sm hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">add</span> New Request
            </button>
</div>
<nav class="flex-1 overflow-y-auto font-body-sm text-body-sm">
<a class="flex items-center gap-3 px-4 py-3 text-on-primary-container bg-primary-container rounded-lg mx-2 my-1 border-l-4 border-primary scale-98" href="/">
<span class="material-symbols-outlined">dashboard</span> Overview
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 transition-colors duration-200" href="/assets-inventory">
<span class="material-symbols-outlined">inventory_2</span> Assets
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 transition-colors duration-200" href="/work-orders">
<span class="material-symbols-outlined">build</span> Work Orders
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 transition-colors duration-200" href="/energy-sustainability">
<span class="material-symbols-outlined">bolt</span> Energy
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 transition-colors duration-200" href="/predictive-maintenance">
<span class="material-symbols-outlined">verified_user</span> Compliance
            </a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 transition-colors duration-200" href="#">
<span class="material-symbols-outlined">settings</span> Settings
            </a>
</nav>
<div class="mt-auto px-2 pt-4 border-t border-outline-variant font-body-sm text-body-sm">
<a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors duration-200" href="#">
<span class="material-symbols-outlined text-[18px]">help</span> Support
            </a>
<a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors duration-200" href="/activity-logs">
<span class="material-symbols-outlined text-[18px]">terminal</span> Logs
            </a>
</div>
</aside>
<!-- Main Content -->
<main class="ml-64 pt-16 p-margin-page grid grid-cols-12 gap-widget-gap min-h-screen">
<!-- KPI Grid (8 widgets) -->
<div class="col-span-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-widget-gap mb-widget-gap">
<!-- KPI 1 -->
<div class="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-lg p-3 flex flex-col justify-between h-24 relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-md text-label-md text-on-surface-variant">Valeur Patrimoine</span>
<span class="font-headline-lg text-headline-lg text-on-surface mt-1">$4.2B</span>
<div class="w-full h-8 mt-1 absolute bottom-0 left-0 opacity-20 bg-gradient-to-t from-primary to-transparent"></div>
</div>
<!-- KPI 2 -->
<div class="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-lg p-3 flex flex-col justify-between h-24 relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-md text-label-md text-on-surface-variant">Disponibilité</span>
<span class="font-headline-lg text-headline-lg text-primary mt-1">94.5%</span>
<div class="w-full h-8 mt-1 absolute bottom-0 left-0 opacity-20 bg-gradient-to-t from-primary to-transparent"></div>
</div>
<!-- KPI 3 -->
<div class="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-lg p-3 flex flex-col justify-between h-24 relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-md text-label-md text-on-surface-variant">ROI</span>
<span class="font-headline-lg text-headline-lg text-[#10B981] mt-1">18.5%</span>
<div class="w-full h-8 mt-1 absolute bottom-0 left-0 opacity-20 bg-gradient-to-t from-[#10B981] to-transparent"></div>
</div>
<!-- KPI 4 -->
<div class="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-lg p-3 flex flex-col justify-between h-24 relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-md text-label-md text-on-surface-variant">Coût Énergie/m²</span>
<span class="font-headline-lg text-headline-lg text-[#F43F5E] mt-1">€42.1</span>
<div class="w-full h-8 mt-1 absolute bottom-0 left-0 opacity-20 bg-gradient-to-t from-[#F43F5E] to-transparent"></div>
</div>
<!-- KPI 5 -->
<div class="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-lg p-3 flex flex-col justify-between h-24 relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-md text-label-md text-on-surface-variant">W.O Critiques</span>
<span class="font-headline-lg text-headline-lg text-[#F59E0B] mt-1">14</span>
<div class="w-full h-8 mt-1 absolute bottom-0 left-0 opacity-20 bg-gradient-to-t from-[#F59E0B] to-transparent"></div>
</div>
<!-- KPI 6 -->
<div class="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-lg p-3 flex flex-col justify-between h-24 relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-md text-label-md text-on-surface-variant">MTTR</span>
<span class="font-headline-lg text-headline-lg text-on-surface mt-1">2h 14m</span>
<div class="w-full h-8 mt-1 absolute bottom-0 left-0 opacity-20 bg-gradient-to-t from-primary to-transparent"></div>
</div>
<!-- KPI 7 -->
<div class="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-lg p-3 flex flex-col justify-between h-24 relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-md text-label-md text-on-surface-variant">Carbone (tCO2)</span>
<span class="font-headline-lg text-headline-lg text-[#10B981] mt-1">1.2K</span>
<div class="w-full h-8 mt-1 absolute bottom-0 left-0 opacity-20 bg-gradient-to-t from-[#10B981] to-transparent"></div>
</div>
<!-- KPI 8 -->
<div class="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-lg p-3 flex flex-col justify-between h-24 relative overflow-hidden group">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span class="font-label-md text-label-md text-on-surface-variant">Occupation</span>
<span class="font-headline-lg text-headline-lg text-primary mt-1">82%</span>
<div class="w-full h-8 mt-1 absolute bottom-0 left-0 opacity-20 bg-gradient-to-t from-primary to-transparent"></div>
</div>
</div>
<!-- Section 2: Prédictions IA (Bento Grid Style) -->
<div class="col-span-12 lg:col-span-4 bg-[#0F172A] border border-[#1E293B] rounded-lg p-4 flex flex-col gap-4">
<div class="flex justify-between items-center border-b border-[#1E293B] pb-2">
<h3 class="font-headline-sm text-headline-sm font-semibold flex items-center gap-2 text-on-surface"><span class="material-symbols-outlined text-primary">psychology</span> Prédictions IA</h3>
<span class="bg-surface-container-high text-on-surface-variant text-[10px] px-2 py-1 rounded uppercase tracking-wider">Haut Risque</span>
</div>
<div class="flex-1 overflow-y-auto flex flex-col gap-3">
<!-- AI Card 1 -->
<div class="bg-surface p-3 border border-outline-variant rounded hover:border-[#334155] transition-colors relative pl-4">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#F43F5E] rounded-l"></div>
<div class="flex justify-between items-start mb-2">
<div>
<div class="font-label-md text-label-md font-bold">HVAC Unit B-04</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">Bâtiment Alpha</div>
</div>
<div class="bg-[#F43F5E]/10 text-[#F43F5E] px-2 py-0.5 rounded font-label-sm text-label-sm">87% Panne</div>
</div>
<div class="flex justify-between items-end mt-2">
<div class="font-body-sm text-body-sm text-on-surface-variant">Est. <span class="text-on-surface font-semibold">2 jours restants</span></div>
<button class="text-primary font-label-md hover:underline">Voir Reco.</button>
</div>
</div>
<!-- AI Card 2 -->
<div class="bg-surface p-3 border border-outline-variant rounded hover:border-[#334155] transition-colors relative pl-4">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#F59E0B] rounded-l"></div>
<div class="flex justify-between items-start mb-2">
<div>
<div class="font-label-md text-label-md font-bold">Générateur Secours 1</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">Data Center B</div>
</div>
<div class="bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-0.5 rounded font-label-sm text-label-sm">62% Panne</div>
</div>
<div class="flex justify-between items-end mt-2">
<div class="font-body-sm text-body-sm text-on-surface-variant">Est. <span class="text-on-surface font-semibold">5 jours restants</span></div>
<button class="text-primary font-label-md hover:underline">Voir Reco.</button>
</div>
</div>
<!-- AI Card 3 -->
<div class="bg-surface p-3 border border-outline-variant rounded hover:border-[#334155] transition-colors relative pl-4">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#F59E0B] rounded-l"></div>
<div class="flex justify-between items-start mb-2">
<div>
<div class="font-label-md text-label-md font-bold">Ascenseur Principal Est</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">Tour Horizon</div>
</div>
<div class="bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-0.5 rounded font-label-sm text-label-sm">45% Usure</div>
</div>
<div class="flex justify-between items-end mt-2">
<div class="font-body-sm text-body-sm text-on-surface-variant">Vibration anormale</div>
<button class="text-primary font-label-md hover:underline">Inspec.</button>
</div>
</div>
</div>
</div>
<!-- Section 3: Performance Bâtiment (ComposedChart Placeholder) & Section 4: Donut -->
<div class="col-span-12 lg:col-span-8 flex flex-col gap-widget-gap">
<div class="bg-[#0F172A] border border-[#1E293B] rounded-lg p-4 flex-1 flex flex-col">
<div class="flex justify-between items-center mb-4">
<h3 class="font-headline-sm text-headline-sm font-semibold text-on-surface">Performance Bâtiments (Actifs vs Santé vs Disp.)</h3>
<div class="flex gap-2">
<span class="flex items-center gap-1 font-label-sm text-label-sm"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Santé Globale</span>
<span class="flex items-center gap-1 font-label-sm text-label-sm"><span class="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span> Disponibilité</span>
<span class="flex items-center gap-1 font-label-sm text-label-sm"><span class="w-2 h-2 rounded-full bg-surface-variant border border-outline-variant inline-block"></span> Volume Actifs</span>
</div>
</div>
<!-- Fake Chart Area -->
<div class="flex-1 bg-surface border border-outline-variant rounded flex items-center justify-center relative overflow-hidden min-h-[200px]">
<div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#464554_1px,transparent_1px),linear-gradient(to_bottom,#464554_1px,transparent_1px)] bg-[size:40px_40px]"></div>
<!-- Simplified Bars -->
<div class="absolute bottom-0 w-full flex justify-around px-8 items-end h-[80%] z-10">
<div class="w-12 bg-surface-variant border border-outline-variant h-[40%]"></div>
<div class="w-12 bg-surface-variant border border-outline-variant h-[70%]"></div>
<div class="w-12 bg-surface-variant border border-outline-variant h-[50%]"></div>
<div class="w-12 bg-surface-variant border border-outline-variant h-[90%]"></div>
<div class="w-12 bg-surface-variant border border-outline-variant h-[30%]"></div>
</div>
<!-- Simplified Lines -->
<svg class="absolute inset-0 w-full h-full z-20" preserveaspectratio="none" viewbox="0 0 100 100">
<path class="opacity-80" d="M10 60 Q 30 30, 50 40 T 90 20" fill="none" stroke="#c0c1ff" stroke-width="2"></path>
<path class="opacity-80" d="M10 80 Q 30 50, 50 70 T 90 40" fill="none" stroke="#10B981" stroke-width="2"></path>
</svg>
</div>
</div>
<div class="grid grid-cols-2 gap-widget-gap h-48">
<!-- Donut Chart Area -->
<div class="bg-[#0F172A] border border-[#1E293B] rounded-lg p-4 flex flex-col">
<h3 class="font-label-md text-label-md font-semibold text-on-surface-variant mb-2">Coût Maint. par Catégorie</h3>
<div class="flex-1 flex items-center justify-center relative">
<!-- CSS Donut Approximation -->
<div class="w-24 h-24 rounded-full border-[16px] border-surface-variant relative overflow-hidden">
<div class="absolute inset-0 border-[16px] border-primary rounded-full border-t-transparent border-r-transparent transform -rotate-45"></div>
<div class="absolute inset-0 border-[16px] border-[#F43F5E] rounded-full border-b-transparent border-l-transparent border-r-transparent transform rotate-45"></div>
</div>
<div class="absolute flex flex-col items-center">
<span class="font-headline-sm text-headline-sm font-bold">€1.2M</span>
<span class="font-label-sm text-[8px] text-on-surface-variant uppercase">Total YTD</span>
</div>
</div>
</div>
<!-- Live IoT Status -->
<div class="bg-[#0F172A] border border-[#1E293B] rounded-lg p-4 flex flex-col overflow-hidden relative">
<div class="flex justify-between items-center mb-3">
<h3 class="font-label-md text-label-md font-semibold text-on-surface-variant flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#10B981] animate-pulse inline-block"></span> Live IoT Data</h3>
<span class="text-[10px] text-on-surface-variant">Update: 1s</span>
</div>
<div class="flex-1 flex flex-col gap-2 font-label-md text-label-md">
<div class="flex justify-between items-center bg-surface p-2 rounded border border-outline-variant/50">
<span class="flex items-center gap-2"><span class="material-symbols-outlined text-[14px] text-[#F59E0B]">thermostat</span> Temp. Moy.</span>
<span class="font-bold text-on-surface">22.4°C</span>
</div>
<div class="flex justify-between items-center bg-surface p-2 rounded border border-outline-variant/50">
<span class="flex items-center gap-2"><span class="material-symbols-outlined text-[14px] text-primary">water_drop</span> Humidité</span>
<span class="font-bold text-on-surface">45%</span>
</div>
<div class="flex justify-between items-center bg-surface p-2 rounded border border-outline-variant/50">
<span class="flex items-center gap-2"><span class="material-symbols-outlined text-[14px] text-[#F43F5E]">vibration</span> Vib. Max</span>
<span class="font-bold text-[#F43F5E]">0.4 g</span>
</div>
</div>
</div>
</div>
</div>
<!-- Section 5: Table Comparaison -->
<div class="col-span-12 bg-[#0F172A] border border-[#1E293B] rounded-lg flex flex-col overflow-hidden mt-4">
<div class="p-4 border-b border-[#1E293B] flex justify-between items-center bg-[#0F172A]">
<h3 class="font-headline-sm text-headline-sm font-semibold text-on-surface">Comparaison Multi-Bâtiments</h3>
<button class="text-primary font-label-md text-label-md border border-outline-variant px-3 py-1 rounded hover:bg-surface-container-high transition-colors flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">filter_list</span> Filtrer</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider border-b border-[#1E293B]">
<tr>
<th class="p-3 font-medium">Bâtiment</th>
<th class="p-3 font-medium text-right">Score Santé</th>
<th class="p-3 font-medium text-right">W.O Ouverts</th>
<th class="p-3 font-medium text-right">Conso. Énergie (kWh)</th>
<th class="p-3 font-medium text-center">Status</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm">
<tr class="border-b border-[#1E293B] hover:bg-surface-container-high/50 transition-colors">
<td class="p-3 font-semibold text-on-surface flex items-center gap-2"><span class="material-symbols-outlined text-outline text-[18px]">domain</span> Bâtiment Alpha</td>
<td class="p-3 text-right">98/100</td>
<td class="p-3 text-right">12</td>
<td class="p-3 text-right font-label-md">145,230</td>
<td class="p-3 text-center"><span class="bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded text-label-sm font-medium">Optimal</span></td>
</tr>
<tr class="border-b border-[#1E293B] hover:bg-surface-container-high/50 transition-colors">
<td class="p-3 font-semibold text-on-surface flex items-center gap-2"><span class="material-symbols-outlined text-outline text-[18px]">dns</span> Data Center B</td>
<td class="p-3 text-right text-[#F59E0B]">74/100</td>
<td class="p-3 text-right">45</td>
<td class="p-3 text-right font-label-md">890,100</td>
<td class="p-3 text-center"><span class="bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded text-label-sm font-medium">Warning</span></td>
</tr>
<tr class="hover:bg-surface-container-high/50 transition-colors">
<td class="p-3 font-semibold text-on-surface flex items-center gap-2"><span class="material-symbols-outlined text-outline text-[18px]">apartment</span> Tour Horizon</td>
<td class="p-3 text-right text-[#F43F5E]">62/100</td>
<td class="p-3 text-right font-bold text-[#F43F5E]">118</td>
<td class="p-3 text-right font-label-md">320,500</td>
<td class="p-3 text-center"><span class="bg-[#F43F5E]/10 text-[#F43F5E] px-2 py-1 rounded text-label-sm font-medium">Critical</span></td>
</tr>
</tbody>
</table>
</div>
</div>
</main>
    `}} />
  );
}
