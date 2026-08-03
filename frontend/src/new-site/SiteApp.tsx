import React, { useState } from 'react';
import './index.css';
import {
  PageId,
  Language,
  BackgroundTheme,
  BrandVariant,
} from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import CircuitBackground from './components/CircuitBackground';
import { LanguageProvider } from './context/LanguageContext';

import { HomePage } from './components/pages/HomePage';
import { ArchitecturePage } from './components/pages/ArchitecturePage';
import { PricingPage } from './components/pages/PricingPage';
import { SupportPage } from './components/pages/SupportPage';
import { DemoPage } from './components/pages/DemoPage';
import { VisionPage } from './components/pages/VisionPage';
import { SecurityPage } from './components/pages/SecurityPage';
import { TestimonialsPage } from './components/pages/TestimonialsPage';
import { ChangelogPage } from './components/pages/ChangelogPage';
import { BlogPage } from './components/pages/BlogPage';
import { ContactPage } from './components/pages/ContactPage';
import { LoginPage } from './components/pages/LoginPage';
import { WorkspacePage } from './components/pages/WorkspacePage';

export function SiteApp() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('FR');
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>('circuit');
  const [brand, setBrand] = useState<BrandVariant>('CAFM Pro');

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider language={language} onLanguageChange={setLanguage}>
      <div className="min-h-screen text-white relative font-sans selection:bg-orange-500 selection:text-white flex flex-col justify-between">
        
        {/* Animated Cyber Canvas Background */}
        <CircuitBackground theme={bgTheme} />

        {/* Top Header Navigation */}
        <Header
          activePage={activePage}
          onNavigate={handleNavigate}
          language={language}
          onLanguageChange={setLanguage}
          bgTheme={bgTheme}
          onBgThemeChange={setBgTheme}
          brand={brand}
          onBrandChange={setBrand}
        />

        {/* Main Page View Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
          {activePage === 'home' && <HomePage onNavigate={handleNavigate} language={language} brand={brand} />}
          {activePage === 'architecture' && <ArchitecturePage onNavigate={handleNavigate} language={language} />}
          {activePage === 'pricing' && <PricingPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'support' && <SupportPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'demo' && <DemoPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'vision' && <VisionPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'security' && <SecurityPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'testimonials' && <TestimonialsPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'changelog' && <ChangelogPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'blog' && <BlogPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'contact' && <ContactPage onNavigate={handleNavigate} language={language} />}
          {activePage === 'login' && <LoginPage onNavigate={handleNavigate} language={language} brand={brand} />}
          {activePage === 'workspace' && <WorkspacePage onNavigate={handleNavigate} language={language} />}
        </main>

        {/* Bottom Footer */}
        <Footer onNavigate={handleNavigate} language={language} brand={brand} />

      </div>
    </LanguageProvider>
  );
}

export default SiteApp;
