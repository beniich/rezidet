import React from 'react';

export default function OperationalPipeline() {
  return (
    <div className="bg-background text-on-surface font-body-md h-screen overflow-hidden flex font-body-md" dangerouslySetInnerHTML={{ __html: `
<!-- SideNavBar -->
<nav class="fixed left-0 top-0 h-full flex flex-col z-40 bg-surface-container-low border-r border-border-muted w-sidebar-width shrink-0">
<div class="h-header-height flex items-center px-container-padding">
<span class="font-headline-md text-headline-md font-bold text-primary">REZIDET</span>
<span class="ml-2 font-label-sm text-label-sm text-on-surface-variant">Enterprise SRE</span>
</div>
<div class="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200" href="/">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-md text-label-md">Overview</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200" href="/assets-inventory">
<span class="material-symbols-outlined">inventory_2</span>
<span class="font-label-md text-label-md">Assets</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 bg-surface-container-high text-primary font-bold border-l-4 border-primary scale-[0.98] transition-transform" href="/operational-pipeline">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">build</span>
<span class="font-label-md text-label-md">Work Orders</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200" href="/spaces">
<span class="material-symbols-outlined">meeting_room</span>
<span class="font-label-md text-label-md">Spaces</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200" href="/analytics">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-md text-label-md">Analytics</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200" href="/leases">
<span class="material-symbols-outlined">description</span>
<span class="font-label-md text-label-md">Leases</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200" href="/predictive-maintenance">
<span class="material-symbols-outlined">handyman</span>
<span class="font-label-md text-label-md">Maintenance</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200 mt-auto" href="/settings">
<span class="material-symbols-outlined">settings</span>
<span class="font-label-md text-label-md">Settings</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-label-md text-label-md">Help</span>
</a>
<a class="flex items-center gap-3 px-container-padding py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors duration-200" href="/login">
<span class="material-symbols-outlined">logout</span>
<span class="font-label-md text-label-md">Logout</span>
</a>
</div>
</nav>
<!-- TopNavBar -->
<header class="fixed top-0 right-0 left-64 flex justify-between items-center px-container-padding z-50 bg-surface/80 backdrop-blur-md border-b border-border-muted shadow-sm h-header-height">
<div class="flex items-center gap-6">
<h1 class="font-headline-sm text-headline-sm font-black text-on-surface">REZIDET</h1>
<nav class="hidden md:flex gap-4">
<a class="font-label-md text-label-md text-primary border-b-2 border-primary pb-1 opacity-80 transition-opacity" href="#">Building Alpha</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant/20 px-2 py-1 rounded" href="#">Building Beta</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative">
<span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input class="bg-transparent border border-border-muted rounded text-on-surface pl-8 pr-3 py-1 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none font-body-sm text-body-sm transition-colors w-48" placeholder="Search..." type="text"/>
</div>
<button class="bg-primary-container text-on-primary-fixed font-label-md text-label-md px-4 py-1.5 rounded hover:bg-primary transition-colors">Emergency Mode</button>
<button class="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 p-1 rounded transition-colors"><span class="material-symbols-outlined">notifications</span></button>
<button class="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 p-1 rounded transition-colors"><span class="material-symbols-outlined">apps</span></button>
<img alt="User Profile" class="w-8 h-8 rounded-full object-cover border border-border-muted" data-alt="A small circular avatar of a professional facility manager in a sleek corporate environment, dark mode aesthetic, high contrast." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmYbGGdaq_8JESX-_SA3sHrejqZwafP5MQzculAiqZYjdyqUTjpmaPjkS-JJCTLoo5tkqcpsuPxi57GtIhgbXF5goEvDDnFAlsOicqltR3xWhyOWYKVfinxj3Fgxd_BozT3nLPDT_mPcenLp7wQLP59Ub-2KKeomK4yK5Yj9wz9aSjk7ZRvd7zJr5XaouAue-0QnOQ7obqjzZ7Pzct0QGxA36JpdYhXIiKrPjelD49DFitH47gVgoc"/>
</div>
</header>
<!-- Main Content Area -->
<main class="ml-sidebar-width pt-header-height flex-1 h-full overflow-hidden flex bg-background">
<!-- Left Data Area -->
<div class="flex-1 flex flex-col h-full overflow-y-auto p-margin-page gap-widget-gap">
<div class="flex justify-between items-end mb-4">
<div>
<h2 class="font-headline-lg text-headline-lg text-on-surface">Pipeline opérationnel</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Ordres de travail - Real-time Status</p>
</div>
</div>
<!-- KPI Cards -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-widget-gap">
<!-- Total -->
<div class="bg-surface-card border border-border-muted hover:border-border-active rounded p-4 relative overflow-hidden group transition-all">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"></div>
<div class="flex justify-between items-start">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Orders</span>
<span class="material-symbols-outlined text-primary">assignment</span>
</div>
<div class="mt-4">
<span class="font-headline-lg text-headline-lg">1,248</span>
</div>
</div>
<!-- Pending -->
<div class="bg-surface-card border border-border-muted hover:border-border-active rounded p-4 relative overflow-hidden group transition-all">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-secondary-fixed"></div>
<div class="flex justify-between items-start">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Pending</span>
<span class="material-symbols-outlined text-secondary-fixed">hourglass_empty</span>
</div>
<div class="mt-4">
<span class="font-headline-lg text-headline-lg">342</span>
</div>
</div>
<!-- In Progress -->
<div class="bg-surface-card border border-border-muted hover:border-border-active rounded p-4 relative overflow-hidden group transition-all">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-success"></div>
<div class="flex justify-between items-start">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">In Progress</span>
<span class="material-symbols-outlined text-success">autorenew</span>
</div>
<div class="mt-4">
<span class="font-headline-lg text-headline-lg">156</span>
</div>
</div>
<!-- Overdue -->
<div class="bg-surface-card border border-border-muted hover:border-border-active rounded p-4 relative overflow-hidden group transition-all">
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-critical"></div>
<div class="flex justify-between items-start">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Overdue</span>
<span class="material-symbols-outlined text-critical">warning</span>
</div>
<div class="mt-4">
<span class="font-headline-lg text-headline-lg text-critical">24</span>
</div>
</div>
</div>
<!-- Complex Data Table -->
<div class="bg-surface-card border border-border-muted rounded flex-1 flex flex-col overflow-hidden mt-4">
<div class="flex justify-between items-center p-4 border-b border-border-muted bg-surface-container">
<h3 class="font-headline-sm text-headline-sm">Active Interventions</h3>
<div class="flex gap-2">
<button class="bg-surface-container-high hover:bg-surface-variant border border-border-muted text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded flex items-center gap-1 transition-colors">
<span class="material-symbols-outlined text-[16px]">filter_list</span> Filter
                        </button>
</div>
</div>
<div class="overflow-x-auto flex-1">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container sticky top-0 z-10">
<tr>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">ID</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Priority</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Task</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Location</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Technician</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted">Scheduled</th>
<th class="p-3 font-label-md text-label-md text-on-surface-variant uppercase border-b border-border-muted text-right">Actions</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm">
<tr class="hover:bg-surface-variant/50 border-b border-border-muted transition-colors">
<td class="p-3 font-label-sm text-label-sm">#WO-9021</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm bg-critical/10 text-critical border border-critical/20">Critical</span>
</td>
<td class="p-3 text-on-surface font-medium">HVAC Failure - Server Room A</td>
<td class="p-3 text-on-surface-variant">Bldg Alpha • Floor 3</td>
<td class="p-3">
<div class="flex items-center gap-2">
<img class="w-6 h-6 rounded-full object-cover" data-alt="Small avatar of a technician wearing a hard hat in a dark setting, highly detailed, dramatic lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtW-C9FeqAehxN3pS9SozsyGw4RCzJmX2eKdQAwpolQWu24aNgxzUg-RwVr84Hgmqw6JhKLGVHVLkJbpwWrFXELZwcTdPlRoJiwVrVKdUwFbk7Askp_TJpK28F-UXiyvYAsRe4nEm_B5Taf2s4OwekfAeptsor_xr6636Y71gWQz4rOKSfhwngpra5ppjBtBtN391HHBNLq8C3hC1pHxsoKPMQq6s8H-I7oRy8CBE3XJmD3KbSo9pU"/>
<span>J. Miller</span>
</div>
</td>
<td class="p-3 text-on-surface-variant">Today, 14:00</td>
<td class="p-3 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
<tr class="hover:bg-surface-variant/50 border-b border-border-muted transition-colors">
<td class="p-3 font-label-sm text-label-sm">#WO-9022</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm bg-warning/10 text-warning border border-warning/20">High</span>
</td>
<td class="p-3 text-on-surface font-medium">Elevator 4 Maintenance</td>
<td class="p-3 text-on-surface-variant">Bldg Beta • Core</td>
<td class="p-3">
<div class="flex items-center gap-2">
<img class="w-6 h-6 rounded-full object-cover" data-alt="Small avatar of an engineer in a dark tech environment, high contrast, professional." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRGx__1p9tiar-sMRKry-AEsrH5N8gQ0ObiezV7mrYq89gb0eYqBq9lwjzcVLEquCa_Q6D-I8lI1LvCwYAKgpMx-HhaJTOO5viedTcmnco2uAMKZZqfL_4Pl0w325ozmVFHBcRhILqcg0HjUQdDaHuQRVFq8nAl5POTwOiSxIpFtAGsR_XvfDKUrn3GEgHxYV0r9vxC2_xmW9pzOexs4Ec4okHKXnc8KWar2bCrLDb0aVPSCZ8qaw9"/>
<span>S. Chen</span>
</div>
</td>
<td class="p-3 text-on-surface-variant">Today, 15:30</td>
<td class="p-3 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
<tr class="hover:bg-surface-variant/50 border-b border-border-muted transition-colors">
<td class="p-3 font-label-sm text-label-sm">#WO-9023</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm bg-primary/10 text-primary border border-primary/20">Medium</span>
</td>
<td class="p-3 text-on-surface font-medium">Lighting Array Replacement</td>
<td class="p-3 text-on-surface-variant">Bldg Alpha • Lobby</td>
<td class="p-3">
<div class="flex items-center gap-2">
<img class="w-6 h-6 rounded-full object-cover" data-alt="Small avatar of a maintenance worker, dark background, sharp focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRHBp-Wy-NSVueCbm7o224rUrRR4mnvZFoxOXbZbeNfHRHV1xXzRqnl5tXmUcpvvViDqVhNsGMJRUX-r2-YLb0EfRcNq2Vb2ZwrIxr24_z_Ar91mwtMPf-k4lNlAVxWdN7fjkzIzEsuB302rH5tWedF_NQldng94ui0VHrOvYxuJp4qTtWDZCQ4MBdDguTbLxIvPTOE1I8W2hFplRJ3T7zAmCztSNvWqnEKSdhnNn_fEX7c0RPvpXx"/>
<span>M. Davis</span>
</div>
</td>
<td class="p-3 text-on-surface-variant">Tomorrow, 09:00</td>
<td class="p-3 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
<tr class="hover:bg-surface-variant/50 border-b border-border-muted transition-colors">
<td class="p-3 font-label-sm text-label-sm">#WO-9024</td>
<td class="p-3">
<span class="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm bg-surface-variant text-on-surface-variant border border-border-muted">Low</span>
</td>
<td class="p-3 text-on-surface font-medium">Filter Inspection</td>
<td class="p-3 text-on-surface-variant">Bldg Gamma • Roof</td>
<td class="p-3">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-[10px] text-on-surface-variant">Unassigned</div>
</div>
</td>
<td class="p-3 text-on-surface-variant">Oct 24, 08:00</td>
<td class="p-3 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-[18px]">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- Right Sidebar: Maintenance Feed -->
<aside class="w-80 bg-surface-container-low border-l border-border-muted flex flex-col h-full shrink-0 hidden xl:flex">
<div class="p-4 border-b border-border-muted">
<h3 class="font-headline-sm text-headline-sm flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">history</span>
                    Maintenance Feed
                </h3>
</div>
<div class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
<!-- Feed Item -->
<div class="relative pl-6">
<div class="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-border-muted"></div>
<div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface-card border border-border-muted flex items-center justify-center z-10">
<div class="w-2 h-2 rounded-full bg-success"></div>
</div>
<div class="bg-surface-card border border-border-muted rounded p-3 text-sm">
<div class="flex justify-between items-start mb-1">
<span class="font-label-sm text-label-sm text-on-surface-variant">10 mins ago</span>
<span class="font-label-sm text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant">#WO-9018</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface"><span class="text-primary font-medium">J. Miller</span> completed Task: Main Boiler Calibration.</p>
</div>
</div>
<!-- Feed Item -->
<div class="relative pl-6">
<div class="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-border-muted"></div>
<div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface-card border border-border-muted flex items-center justify-center z-10">
<div class="w-2 h-2 rounded-full bg-warning"></div>
</div>
<div class="bg-surface-card border border-warning/30 rounded p-3 text-sm">
<div class="flex justify-between items-start mb-1">
<span class="font-label-sm text-label-sm text-on-surface-variant">45 mins ago</span>
<span class="font-label-sm text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant">SYSTEM</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface">Auto-escalation triggered for <span class="font-medium text-warning">#WO-9022</span>. Priority upgraded to High.</p>
</div>
</div>
<!-- Feed Item -->
<div class="relative pl-6">
<div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface-card border border-border-muted flex items-center justify-center z-10">
<div class="w-2 h-2 rounded-full bg-primary"></div>
</div>
<div class="bg-surface-card border border-border-muted rounded p-3 text-sm">
<div class="flex justify-between items-start mb-1">
<span class="font-label-sm text-label-sm text-on-surface-variant">2 hours ago</span>
<span class="font-label-sm text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant">#WO-9021</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface">New Critical Work Order created: HVAC Failure - Server Room A.</p>
</div>
</div>
</div>
</aside>
</main>
</div>
    `}} />
  );
}
