import React from 'react';

export default function Leases() {
  return (
    <div className="bg-background text-on-surface font-body-sm min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="material-symbols-outlined text-6xl text-primary mb-4" style={{fontVariationSettings: "'FILL' 0"}}>real_estate_agent</span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Lease Management</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Module in development.</p>
        <a href="/" className="mt-6 inline-block text-primary hover:underline font-label-md text-label-md">Return to Dashboard</a>
      </div>
    </div>
  );
}
