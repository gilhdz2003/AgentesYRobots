import type { LucideIcon } from "lucide-react";
import type { PriceRange } from "../utils/formatPrice";

// ===== Dominio: catálogo de servicios =====

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceUseCase {
  title: string;
  description: string;
  metrics: string[];
}

/**
 * Sub-tipo dentro de una familia (ej. "Chat Agents" en Coworkers Digitales).
 * El pricing vive por sub-tipo (decisión del spec §2).
 */
export interface ServiceVariant {
  slug: string;            // ancla: /servicios/{familia}#{slug}
  name: string;
  tagline: string;
  icon: LucideIcon;
  description: string;
  features: ServiceFeature[];
  useCase: ServiceUseCase;
  faq: ServiceFAQ[];
  pricing?: ServicePricing;
}

/**
 * Servicio o familia del catálogo.
 * Regla (spec §3.2): si `variants !== undefined`, el detalle vive en cada
 * variant y features/useCase/faq/pricing a nivel Service se ignoran.
 */
export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  shortDescription: string;
  longDescription: string;
  process: ServiceProcessStep[];   // compartido por la familia
  // Servicios planos:
  features?: ServiceFeature[];
  useCase?: ServiceUseCase;
  faq?: ServiceFAQ[];
  pricing?: ServicePricing;
  // Familias:
  variants?: ServiceVariant[];
}

// ===== Dominio: pricing =====

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  tierName: string;
  tierSlug: string;
  description: string;
  setupPrice?: PriceRange;
  monthlyPrice?: PriceRange;
  features: PlanFeature[];
  highlight?: boolean;
  addOns?: string[];
}

export interface VirtualRole {
  name: string;
  icon: LucideIcon;
  description: string;
  exampleTasks: string[];
}

export interface ServicePricing {
  sectionTitle?: string;
  sectionSubtitle?: string;
  model: "tiered" | "modular" | "quote";
  plans?: PricingPlan[];
  hubPrice?: PriceRange;
  hubDescription?: string;
  implementationTiers?: PricingPlan[];
  rentTiers?: PricingPlan[];
  roles?: VirtualRole[];
  pricingFaq?: ServiceFAQ[];
  quote?: QuoteConfig;
}

/**
 * Modelo "a cotización": rango "desde $X" + qué incluye + CTA.
 * Usado por variantes cuyo precio depende del scope (Workflows, Agent Security).
 */
export interface QuoteConfig {
  priceLine: string;      // ej. "Desde $25,000 MXN por auditoría"
  bullets: string[];      // qué incluye la cotización
  note?: string;          // aclaración comercial opcional
}
