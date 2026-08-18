import React from 'react';

export default function Settings() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex" dangerouslySetInnerHTML={{ __html: `
<!-- SideNavBar -->
<nav aria-label="Sidebar Navigation" class="fixed left-0 top-0 h-screen flex flex-col w-sidebar-width z-40 bg-surface-container-low border-r border-outline-variant hidden md:flex">
<div class="p-container-padding flex items-center gap-3">
<img alt="Organization Logo" class="w-8 h-8 rounded" data-alt="A sleek, minimalist vector logo for an enterprise software company, featuring sharp geometric lines in a metallic blue and silver color palette. The logo is displayed on a dark slate background, conveying precision, reliability, and modern technology in a corporate setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1FPmqDrE0Yc149imahI5PofSc9Dkn8YeO4b7Mm77rhKeoLbvM0tFq_STS0CkuSSOsXQyfYh19RfZKglISDpPHRC3KFEBEMPa7Y5i0ypx8Rt6v4-wRqXgsCeST8hgdQGaRNZMBs8ruvj2QRIFnNo7_WcKf_1REHSma9Oie8Y8vsAcyENl_lGyghOCG7MXaErNg066aHoEeaJp8AT4hKjWiQfR1Otwg-RnnzKMhX5DCUWRA3qAIHh2k"/>
<div>
<h1 class="text-headline-sm font-headline-sm font-bold text-primary">Obsidian Metric</h1>
<p class="text-label-sm font-label-sm text-on-surface-variant">Enterprise REZIDET</p>
</div>
</div>
<ul class="flex flex-col flex-grow py-4 gap-1 overflow-y-auto scrollbar-hide px-2">
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out text-label-md font-label-md" href="/">
<span class="material-symbols-outlined text-lg">dashboard</span>
                    Dashboard
                </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out text-label-md font-label-md" href="/assets-inventory">
<span class="material-symbols-outlined text-lg">inventory_2</span>
                    Assets
                </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out text-label-md font-label-md" href="/sre-work-orders">
<span class="material-symbols-outlined text-lg">build</span>
                    Work Orders
                </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out text-label-md font-label-md" href="/spaces">
<span class="material-symbols-outlined text-lg">space_dashboard</span>
                    Spaces
                </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out text-label-md font-label-md" href="/energy-sustainability">
<span class="material-symbols-outlined text-lg">bolt</span>
                    Energy
                </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out text-label-md font-label-md" href="/analytics">
<span class="material-symbols-outlined text-lg">verified</span>
                    Compliance
                </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out text-label-md font-label-md" href="/leases">
<span class="material-symbols-outlined text-lg">contract</span>
                    Leases
                </a>
</li>
<li>
<a aria-current="page" class="flex items-center gap-3 px-4 py-3 rounded text-primary font-bold border-l-2 border-primary bg-surface-container-high/50 text-label-md font-label-md" href="/settings">
<span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">settings</span>
                    Settings
                </a>
</li>
</ul>
</nav>
<!-- Main Content Wrapper -->
<div class="flex-1 flex flex-col md:ml-sidebar-width min-h-screen">
<!-- TopNavBar -->
<header class="fixed top-0 right-0 left-0 md:left-sidebar-width h-header-height flex justify-between items-center px-container-padding z-50 bg-surface-dim border-b border-outline-variant shadow-none">
<div class="flex items-center gap-4">
<button class="md:hidden text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="hidden lg:flex gap-6 text-label-md font-label-md h-full items-center">
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">Building Alpha</a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">Building Beta</a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">Data Center B</a>
</div>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden sm:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input class="pl-9 pr-4 py-1.5 bg-transparent border border-border-muted rounded text-body-sm font-body-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all w-64 placeholder:text-on-surface-variant" placeholder="Search resources..." type="text"/>
</div>
<button class="bg-primary-container text-on-primary-fixed px-4 py-1.5 rounded text-label-md font-label-md font-semibold hover:bg-primary transition-colors">
                    AI Insights
                </button>
<button class="border border-error text-error px-4 py-1.5 rounded text-label-md font-label-md hover:bg-error/10 transition-colors">
                    Emergency Mode
                </button>
<div class="flex items-center gap-2 text-on-surface-variant">
<button class="p-1.5 hover:text-primary rounded-full hover:bg-surface-container transition-colors"><span class="material-symbols-outlined">notifications</span></button>
<button class="p-1.5 hover:text-primary rounded-full hover:bg-surface-container transition-colors"><span class="material-symbols-outlined">help_outline</span></button>
</div>
<img alt="User Profile Avatar" class="w-8 h-8 rounded-full border border-border-muted object-cover" data-alt="A small, circular avatar image of a professional woman in her late 30s wearing a modern, dark blazer against a subtle grey background. High resolution, professional corporate headshot style suitable for an enterprise software profile picture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxJ6InYS-eSTsZFAK60Pq1vsP5NmMg1SmrQgMBneAXsWeppttAsJk3O2dZS1kLhgj33_-vxRFneGJ2yeE5TvIhRc3-57k95mD2YUN2G_MnHPrJV0_pduTIq6QITp1lN-UMo3SUHNa_lFBBAxgWyyOUSS1xuZ3gQd02erOZi7QqdmKut73efqBdiw1h7XNjy6uptHVLulMP3v5u_nDklLTkTXf1oP3-FXdXIr4PTNg61LtrMcclpfqe"/>
</div>
</header>
<!-- Page Content -->
<main class="flex-1 mt-header-height p-margin-page overflow-x-hidden">
<div class="max-w-7xl mx-auto space-y-widget-gap">
<!-- Page Header -->
<div class="mb-6 flex justify-between items-end">
<div>
<h2 class="text-headline-lg font-headline-lg text-primary-fixed-dim">System Settings</h2>
<p class="text-body-md font-body-md text-on-surface-variant mt-1">Manage organization profile, access controls, and integrations.</p>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 border border-border-muted rounded text-label-md font-label-md hover:border-border-active transition-colors">Cancel</button>
<button class="px-4 py-2 bg-primary-container text-on-primary-fixed rounded text-label-md font-label-md font-semibold hover:bg-primary transition-colors">Save Changes</button>
</div>
</div>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-widget-gap">
<!-- Organization Profile (Span 8) -->
<section class="lg:col-span-8 bg-surface-card border border-border-muted rounded-lg p-6 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary-container/5 to-transparent pointer-events-none"></div>
<div class="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-fixed-dim"></div>
<div class="flex items-center gap-2 mb-6 border-b border-border-muted pb-4">
<span class="material-symbols-outlined text-primary-fixed-dim">domain</span>
<h3 class="text-headline-sm font-headline-sm">Organization Profile</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
<div class="space-y-2">
<label class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Company Name</label>
<input class="w-full bg-surface-container border border-border-muted rounded px-3 py-2 text-body-sm font-body-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" type="text" value="Obsidian Metric"/>
</div>
<div class="space-y-2">
<label class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Primary Domain</label>
<input class="w-full bg-surface-container border border-border-muted rounded px-3 py-2 text-body-sm font-body-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" type="text" value="obsidianmetric.com"/>
</div>
<div class="space-y-2">
<label class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Support Contact</label>
<input class="w-full bg-surface-container border border-border-muted rounded px-3 py-2 text-body-sm font-body-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" type="email" value="ops@obsidianmetric.com"/>
</div>
<div class="space-y-2">
<label class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Data Region</label>
<select class="w-full bg-surface-container border border-border-muted rounded px-3 py-2 text-body-sm font-body-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all text-on-surface appearance-none">
<option>US-East (N. Virginia)</option>
<option>EU-Central (Frankfurt)</option>
<option>AP-Southeast (Singapore)</option>
</select>
</div>
</div>
</section>
<!-- Theme & UI (Span 4) -->
<section class="lg:col-span-4 bg-surface-card border border-border-muted rounded-lg p-6 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-secondary-fixed/5 to-transparent pointer-events-none"></div>
<div class="absolute left-0 top-0 bottom-0 w-0.5 bg-secondary-fixed-dim"></div>
<div class="flex items-center gap-2 mb-6 border-b border-border-muted pb-4">
<span class="material-symbols-outlined text-secondary-fixed-dim">palette</span>
<h3 class="text-headline-sm font-headline-sm">Interface Preferences</h3>
</div>
<div class="space-y-6 relative z-10">
<div>
<label class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mb-3">Theme Mode</label>
<div class="flex gap-2">
<button class="flex-1 flex items-center justify-center gap-2 py-2 border border-border-muted rounded bg-surface-container hover:border-primary-container transition-colors">
<span class="material-symbols-outlined text-sm">light_mode</span>
<span class="text-label-md font-label-md">Light</span>
</button>
<button class="flex-1 flex items-center justify-center gap-2 py-2 border border-primary-container bg-surface-container-high rounded text-primary-fixed-dim transition-colors">
<span class="material-symbols-outlined text-sm">dark_mode</span>
<span class="text-label-md font-label-md">Dark</span>
</button>
</div>
</div>
<div>
<label class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mb-3">Data Density</label>
<div class="flex gap-2">
<button class="flex-1 py-2 border border-border-muted rounded bg-surface-container hover:border-primary-container transition-colors text-label-md font-label-md">Standard</button>
<button class="flex-1 py-2 border border-primary-container bg-surface-container-high rounded text-primary-fixed-dim transition-colors text-label-md font-label-md">Compact</button>
</div>
</div>
</div>
</section>
<!-- User Management (Span 12) -->
<section class="lg:col-span-12 bg-surface-card border border-border-muted rounded-lg p-6 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute left-0 top-0 bottom-0 w-0.5 bg-tertiary-fixed-dim"></div>
<div class="flex items-center justify-between mb-6 border-b border-border-muted pb-4">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary-fixed-dim">group</span>
<h3 class="text-headline-sm font-headline-sm">User &amp; Role Management</h3>
</div>
<button class="flex items-center gap-1 text-primary-fixed-dim text-label-md font-label-md hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">person_add</span> Invite User
                            </button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="text-label-md font-label-md text-on-surface-variant uppercase bg-surface-container">
<th class="p-3 font-medium">User</th>
<th class="p-3 font-medium">Email</th>
<th class="p-3 font-medium">Role</th>
<th class="p-3 font-medium">Status</th>
<th class="p-3 font-medium text-right">Actions</th>
</tr>
</thead>
<tbody class="text-body-sm font-body-sm divide-y divide-border-muted">
<tr class="hover:bg-surface-container-low transition-colors">
<td class="p-3 flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center font-bold text-xs">SL</div>
                                            Sarah Jenkins
                                        </td>
<td class="p-3 text-on-surface-variant">sarah.j@obsidianmetric.com</td>
<td class="p-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary-fixed-dim border border-primary/20 text-label-sm font-label-sm">
<span class="material-symbols-outlined text-[10px]">admin_panel_settings</span> Administrator
                                            </span>
</td>
<td class="p-3"><span class="text-success flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-success"></span> Active</span></td>
<td class="p-3 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors p-1"><span class="material-symbols-outlined text-sm">more_vert</span></button>
</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="p-3 flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">MR</div>
                                            Mike Ross
                                        </td>
<td class="p-3 text-on-surface-variant">m.ross@obsidianmetric.com</td>
<td class="p-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary-fixed-dim border border-secondary/20 text-label-sm font-label-sm">
<span class="material-symbols-outlined text-[10px]">engineering</span> Technician
                                            </span>
</td>
<td class="p-3"><span class="text-success flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-success"></span> Active</span></td>
<td class="p-3 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors p-1"><span class="material-symbols-outlined text-sm">more_vert</span></button>
</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="p-3 flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-xs">AL</div>
                                            Amanda Lin
                                        </td>
<td class="p-3 text-on-surface-variant">a.lin@obsidianmetric.com</td>
<td class="p-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant border border-border-muted text-label-sm font-label-sm">
<span class="material-symbols-outlined text-[10px]">visibility</span> Viewer
                                            </span>
</td>
<td class="p-3"><span class="text-warning flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-warning"></span> Pending</span></td>
<td class="p-3 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors p-1"><span class="material-symbols-outlined text-sm">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- API & Security (Span 6) -->
<section class="lg:col-span-6 bg-surface-card border border-border-muted rounded-lg p-6 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
<div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-warning/5 to-transparent pointer-events-none"></div>
<div class="flex items-center justify-between mb-6 border-b border-border-muted pb-4">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-warning">key</span>
<h3 class="text-headline-sm font-headline-sm">API &amp; Integrations</h3>
</div>
<button class="text-label-sm font-label-sm border border-border-muted px-2 py-1 rounded hover:bg-surface-container transition-colors">Generate New Key</button>
</div>
<div class="space-y-4 relative z-10">
<div class="p-4 bg-surface-container rounded border border-border-muted flex justify-between items-center">
<div>
<div class="flex items-center gap-2 mb-1">
<span class="text-label-md font-label-md font-bold">IoT Sensor Gateway (Prod)</span>
<span class="px-1.5 py-0.5 bg-success/10 text-success text-[10px] rounded uppercase tracking-wide">Active</span>
</div>
<div class="font-mono text-xs text-on-surface-variant bg-surface-dim px-2 py-1 rounded">sk_live_obs_9x8...42df</div>
</div>
<div class="flex gap-2">
<button class="text-on-surface-variant hover:text-primary transition-colors" title="Copy"><span class="material-symbols-outlined text-sm">content_copy</span></button>
<button class="text-on-surface-variant hover:text-critical transition-colors" title="Revoke"><span class="material-symbols-outlined text-sm">delete</span></button>
</div>
</div>
<div class="p-4 bg-surface-container rounded border border-border-muted flex justify-between items-center opacity-70">
<div>
<div class="flex items-center gap-2 mb-1">
<span class="text-label-md font-label-md font-bold text-on-surface-variant">Legacy HVAC Integration</span>
<span class="px-1.5 py-0.5 bg-outline-variant/30 text-on-surface-variant text-[10px] rounded uppercase tracking-wide">Revoked</span>
</div>
<div class="font-mono text-xs text-outline bg-surface-dim px-2 py-1 rounded">sk_live_obs_2m1...99zq</div>
</div>
</div>
</div>
</section>
<!-- Security & Data (Span 6) -->
<section class="lg:col-span-6 bg-surface-card border border-border-muted rounded-lg p-6 relative overflow-hidden group hover:border-border-active transition-colors">
<div class="absolute left-0 top-0 bottom-0 w-0.5 bg-critical"></div>
<div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-critical/5 to-transparent pointer-events-none"></div>
<div class="flex items-center gap-2 mb-6 border-b border-border-muted pb-4">
<span class="material-symbols-outlined text-critical">shield_lock</span>
<h3 class="text-headline-sm font-headline-sm">Security &amp; Data</h3>
</div>
<div class="space-y-6 relative z-10">
<!-- MFA Toggle -->
<div class="flex items-center justify-between p-4 bg-surface-container rounded border border-border-muted">
<div>
<h4 class="text-label-md font-label-md font-bold mb-1">Multi-Factor Authentication</h4>
<p class="text-label-sm font-label-sm text-on-surface-variant">Require MFA for all administrator accounts.</p>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox" value=""/>
<div class="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
<!-- Data Export -->
<div class="flex items-center justify-between p-4 bg-surface-container rounded border border-border-muted">
<div>
<h4 class="text-label-md font-label-md font-bold mb-1">Compliance Data Export</h4>
<p class="text-label-sm font-label-sm text-on-surface-variant">Export 90-day audit logs (CSV/JSON).</p>
</div>
<button class="flex items-center gap-2 px-3 py-1.5 border border-border-muted rounded text-label-sm font-label-sm hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-sm">download</span> Export
                                </button>
</div>
</div>
</section>
</div>
</div>
</main>
</div>
    `}} />
  );
}
