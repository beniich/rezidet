export type PageId =
  | 'home'
  | 'architecture'
  | 'pricing'
  | 'support'
  | 'demo'
  | 'vision'
  | 'security'
  | 'testimonials'
  | 'changelog'
  | 'blog'
  | 'contact'
  | 'login'
  | 'workspace';

export type Language = 'FR' | 'EN' | 'DE' | 'ES';

export type BackgroundTheme =
  | 'circuit'
  | 'building'
  | 'waves'
  | 'nodes'
  | 'brain'
  | 'map';

export type BrandVariant = 'CAFM Pro' | 'Sovereign Device Nexus' | 'ReclamTrack Pro';

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge?: string;
  popular?: boolean;
  features: string[];
  description: string;
  ctaText: string;
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export interface FAQItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
  category: 'general' | 'technical' | 'security' | 'billing';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

export interface ChangelogItem {
  id: string;
  version: string;
  title: string;
  date: string;
  tag: 'RELEASE' | 'PATCH' | 'FEATURE' | 'SECURITY';
  description: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  industry: string;
}

export interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  metrics: { label: string; value: string; status?: 'normal' | 'warning' | 'good' }[];
  color: string;
}

export interface WorkspaceCalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime: string; timeZone?: string };
  end: { dateTime: string; timeZone?: string };
  htmlLink?: string;
}

export interface WorkspaceContact {
  resourceName?: string;
  name: string;
  email?: string;
  phone?: string;
  organization?: string;
  role?: string;
  photoUrl?: string;
}

export interface WorkspaceSheetData {
  spreadsheetId: string;
  title: string;
  values: string[][];
  spreadsheetUrl?: string;
}
