# Rediseño del Catálogo: Servicios → Familias con Sub-tipos

> **Fecha**: 14 de agosto, 2026
> **Estado**: Diseño aprobado por Gil (4/4 secciones)
> **Proyecto**: Portal B2B Agentes&Robots (Vite 6 + React 19 + TS 5.8)

---

## 1. Contexto y motivación

El catálogo actual del portal es plano: 6 servicios, cada uno con su página `/servicios/:slug`. El negocio evolucionó y varias líneas maduraron en Laboratorio/Proyectos_Alternos (CRM Coworkers sobre Hermes, Kit Pentest Web del ops, framework Agent Visibility). El catálogo necesita reflejar eso:

- **Coworkers Digitales** agrupa lo que hoy son dos servicios separados (Coworkers + Voice Coworkers) más una línea nueva (Agent Workflows).
- **Security Testing** agrupa la auditoría de agentes IA (hoy "Agent Pentesting") con el web pentesting tradicional.
- **Agent Visibility** es un servicio nuevo (presencia agéntica / AEO).
- **AI Training** permanece como servicio independiente.

## 2. Decisiones de producto (cerradas con Gil)

| Decisión | Resolución |
|----------|-----------|
| AI Training | Se queda como 6º servicio independiente |
| Jerarquía en el portal | **1 página por familia con secciones** (no landing + páginas hijas) |
| Qué es Agent Workflows | Integraciones/automatizaciones entre sistemas con IA (estilo n8n + IA). NO es backoffice de BB One |
| Naming familia pentesting | **Security Testing**: Agent Security + Web Security |
| Naming servicio nuevo | **Agent Visibility** (híbrido: prefijo Agent de la casa + concepto trending "visibility") |
| Pricing en familias | **Por sub-tipo** (cada variant lleva su `pricing`) |
| Enfoque técnico | **Enfoque A**: `Service` gana campo `variants?` opcional (los planos no cambian) |
| Layout página familia | **Secciones apiladas + sticky sub-nav** con anclas (no tabs) |
| Orden del catálogo | BB One → Coworkers → Security Testing → MapYourFlow → Agent Visibility → AI Training (nota: MapYourFlow en 4º prioriza producto estrella sobre relato diagnóstico — decisión de Gil) |
| Casos de uso | Usar proyectos reales (CRM Coworkers/Hermes, Imperam, PetCare) en vez de los anónimos actuales donde aplique |

## 3. Modelo de datos

### 3.1 Tipo nuevo: `ServiceVariant`

```typescript
interface ServiceVariant {
  slug: string;            // "chat-agents" | "voice-agents" | ...
  name: string;            // "Chat Agents"
  tagline: string;         // subtítulo corto del sub-tipo
  icon: LucideIcon;
  description: string;     // qué es este sub-tipo
  features: ServiceFeature[];
  useCase: ServiceUseCase;
  faq: ServiceFAQ[];
  pricing?: ServicePricing;  // emigró desde Service (pricing por sub-tipo)
}
```

### 3.2 Tipo existente: `Service` (modificado)

```typescript
interface Service {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  shortDescription: string;        // card del grid de Solutions
  longDescription: string;         // intro/hero de la página
  process: ServiceProcessStep[];   // proceso de engagement COMPARTIDO por la familia
  // Servicios PLANOS (BB One, MapYourFlow, Agent Visibility, AI Training):
  features?: ServiceFeature[];
  useCase?: ServiceUseCase;
  faq?: ServiceFAQ[];
  pricing?: ServicePricing;
  // FAMILIAS (Coworkers, Security Testing):
  variants?: ServiceVariant[];
}
```

**Regla de validación** (explícita):
- Si `variants !== undefined` → el detalle vive en cada variant; `features`/`useCase`/`faq`/`pricing` a nivel Service se ignoran.
- Si `variants === undefined` → servicio plano; el detalle va en Service como hoy.

**Pertenencia por nivel**:
- **Nivel familia**: título, subtítulo, icon, descripciones, `process` (uno por familia, consolidado). Los matices de cada sub-tipo van en sus features/descripción, NO en processes separados.
- **Nivel variant**: slug, nombre, tagline, icon, descripción, features, useCase, FAQ, pricing.

### 3.3 Romper importación circular (mejora dirigida)

Hoy `services.ts` importa `ServicePricing` desde `PricingSection.tsx`, y `PricingSection.tsx` importa `ServiceFAQ` desde `services.ts` (ciclo tolerado por ser type-only). Al mover `pricing` a los variants el ciclo crece. **Solución**: mover los tipos compartidos (`ServicePricing`, y opcionalmente `Service`, `ServiceVariant`, `ServiceFeature`, etc.) a un módulo neutral `src/types/catalog.ts` (nombre final a criterio del plan). Ambos archivos importan de ahí.

## 4. Contenido

### 4.1 Inventario de migración

| Destino | Origen | Esfuerzo |
|---------|--------|----------|
| BB One | Sin cambios | Ninguno |
| MapYourFlow | Sin cambios | Ninguno |
| AI Training | Sin cambios | Ninguno |
| Coworkers → Chat Agents | Migra de "Coworkers Digitales" actual (features, GMB useCase, FAQ, pricing tiered) | Reorganizar |
| Coworkers → Voice Agents | Migra de "Voice Coworkers" actual (features, aseguradora useCase, FAQ, pricing tiered) | Reorganizar |
| Coworkers → Agent Workflows | 🔴 NUEVO — fuente: Framework Chatbots IA (Prefect+Dify), CRM Coworkers (Hermes) | Redactar |
| Coworkers (intro familia) | Ajustar longDescription actual | Menor |
| Security → Agent Security | Migra de "Agent Pentesting" actual (60+ patrones, fintech useCase, FAQ) | Reorganizar |
| Security → Web Security | 🔴 NUEVO — fuente: Kit Pentest Web del ops (OWASP Top 10, skill /pentest-web, plantillas) | Redactar |
| Security (intro familia) | 🔴 NUEVO | Redactar |
| Agent Visibility | 🔴 NUEVO completo — fuente: dictamen PetCare HTML, audit-checklist, brainstorm 12 Ago | Redactar |

### 4.2 Pricing por sub-tipo/servicio

| Sub-tipo/servicio | Modelo | Detalle |
|-------------------|--------|---------|
| Chat Agents | Tiered | Migra tal cual (Starter/Growth/Pro) |
| Voice Agents | Tiered | Migra tal cual (Starter/Growth/Pro) |
| Agent Workflows | Cotización | "Se cotiza según sistemas a integrar" — sin tiered público |
| Agent Security | TBD al implementar | Tiered por complejidad del agente, o cotización |
| Web Security | Tiered | Por scope (estática / dinámica / multi-app). Números al implementar |
| Agent Visibility | Del brainstorm 12 Ago | Audit incluida → paquete 90 días $15–25K MXN → retainer $1.5–2.5K/mes |

Los números exactos de los tiered nuevos se afinan durante la implementación; el spec fija el esqueleto.

### 4.3 Casos de uso con proyectos reales

- **Agent Workflows**: CRM Coworkers (sobre Hermes/ACP) o Konectify Chatbot (widget Dify).
- **Web Security**: engagement Imperam (pentest-001 del repo ops).
- **Agent Visibility**: PetCare Coyoacán (simulación del dictamen: score 18/100 → plan de 8 fixes).

## 5. Componentes

### 5.1 Sin cambios

- **Solutions.tsx**: sigue mapeando `services` (ahora 6 familias). Solo se ajustan shortDescription de Coworkers y Security Testing en `services.ts`. El badge "6 MÓDULOS" sigue correcto.
- **PricingSection.tsx y sub-componentes** (PlanCard, RoleCard, TieredPlans, ModularPricing): se instancian por variant. Para variantes sin pricing, no se renderiza (condicional).
- Hero, Navbar, Footer, Process, Stats, SocialProof, PortfolioSection, FAQ global, CTA del home: sin cambios.
- Páginas institucionales (About, Contact, CaseStudies): sin cambios.

### 5.2 ServicePage.tsx — cambio principal

1. **Extraer** secciones inline a sub-componentes reutilizables: `<FeaturesSection>`, `<UseCaseSection>`, `<FAQSection>` (PricingSection ya existe). Motivo: se necesitan por variant; mejora de higiencia aprovechada.
2. **Nuevo `<VariantBlock>`**: orquesta Features + UseCase + Pricing + FAQ de un variant.
3. **Bifurcación**:
   - `service.variants` → Hero de familia → Process compartido → mapeo de `<VariantBlock>` por variant → CTA.
   - Sin variants → layout plano actual intacto.

### 5.3 Layout de página de familia

- **Secciones apiladas + sticky sub-nav** con anclas: `#chat-agents`, `#voice-agents`, `#agent-workflows`.
- Rationale SEO/GEO: todo el HTML de los sub-tipos queda en el DOM (indexable por crawlers e IAs). Coherente con lo que predica Agent Visibility.
- Deep-linking: `/servicios/coworkers-digitales#voice-agents` lleva directo al sub-tipo.

### 5.4 JSON-LD / FAQ schema

- El `faqJsonLd` actual mapea `service.faq` directo. Ajuste: para familias, **agregar los FAQs de todos los variants** al FAQPage schema; para planos, como hoy.
- Un `Service` schema por familia (longDescription de la familia como descripción).

## 6. Routing, slugs y SEO

- Ruta `/servicios/:slug` **sin cambios** (`getServiceBySlug` sigue funcionando).
- **Slugs que desaparecen**: `voice-coworkers` y `agent-pentesting` (pasan a ser sub-tipos/anclas). No se requiere redirect 301 (el portal no está en producción con SEO acumulado), PERO hay que actualizar todo link interno que apunte a esos slugs (Navbar, Footer, CTA, cross-links). Verificar en el plan.
- **Slugs nuevos**: `security-testing` (familia), `agent-visibility` (plano).
- **Sitemap**: las 6 familias como URLs top-level. Sub-tipos son anclas, no URLs — no entran como páginas.
- **Robots/GEO**: sin cambios de política.

## 7. Blueprint del catálogo final

Orden en el grid (decisión de Gil):

| # | Familia | Tipo | Slugs de variants |
|---|---------|------|-------------------|
| 1 | BB One | Plano | — |
| 2 | Coworkers Digitales | Familia | chat-agents, voice-agents, agent-workflows 🔴 |
| 3 | Security Testing | Familia | agent-security, web-security 🔴 |
| 4 | MapYourFlow | Plano | — |
| 5 | Agent Visibility 🔴 | Plano | — |
| 6 | AI Training | Plano | — |

### Detalle por pieza nueva

**Coworkers Digitales (familia)**
- subtitle nuevo (paraguas de agentes conversacionales y operativos)
- longDescription nueva cubriendo los 3 sub-tipos
- process compartido: Mapeo → Diseño → Piloto (del actual de Coworkers)

**Agent Workflows (variant) 🔴**
- Posición: 3ª dentro de Coworkers
- Qué es: integraciones/automatizaciones entre sistemas con IA (no conversacional, no backoffice BB One)
- Features orientadas a: orquestación multi-sistema (CRM+ERP+correo), disparo de acciones, monitoreo; stack Prefect + Dify del Framework Chatbots IA
- useCase: CRM Coworkers (Hermes)
- pricing: cotización

**Security Testing (familia) 🔴**
- icon Shield (o ShieldCheck), subtitle "Validación de Seguridad IA + Web"
- intro de paraguas: seguridad total para lo que construyes con IA y para tu web
- process compartido: Scope → Ejecución → Reporte → Re-test

**Web Security (variant) 🔴**
- Qué es: pentesting web tradicional (OWASP Top 10), del Kit Pentest Web del ops
- Features: OWASP Top 10, metodología 6 fases, reportes ejecutivo+técnico, re-test
- useCase: Imperam (engagement real)
- pricing: tiered por scope

**Agent Visibility (plano) 🔴**
- icon Eye, subtitle "Presencia Agéntica"
- Tagline comercial: "Cuando un comprador pregunta a la IA, ¿te recomienda a ti o a tu competencia?"
- Features: 3 dimensiones de diagnóstico (Accesibilidad, Legibilidad, Confianza), score 0-100, reporte de presencia agéntica, plan de fixes priorizado
- useCase: PetCare Coyoacán (score 18/100, plan de 8 fixes)
- pricing: audit incluida → paquete 90 días $15–25K → retainer $1.5–2.5K/mes
- FAQ: del brainstorm del 12 Ago

## 8. Fuera de alcance (YAGNI)

- No se rediseñan Hero, Navbar, Footer ni secciones del home.
- No se migran los otros servicios a familias.
- No se añaden tabs (se descartaron por SEO).
- No se crea contenido para sub-tipos más allá de lo listado (no micro-sites).
- Pendientes previos del portal (logo, imagen hero, OG image) siguen pendientes — este rediseño no los resuelve.

## 9. Verificación

- `npm run lint` (tsc) limpio — de paso se corrigen los 4 errores tsc pre-existentes en `src/components/pricing/` (typing del prop `key` en PlanCard/RoleCard) si el costo es trivial al tocar esos archivos.
- `npm run build` exitoso.
- Verificación manual: las 6 rutas de familia renderizan; las páginas de familia muestran sticky sub-nav con anclas funcionando; los links internos viejos (`voice-coworkers`, `agent-pentesting`) ya no se referencian en el código (`grep -r`).
- Sitemap y JSON-LD actualizados a las 6 familias.

## 10. Cambios a memoria KTM

Al completar la implementación, actualizar `project-agentes-robots-b2b.md` y `services-agentes-robots.md` con el catálogo nuevo (6 familias, naming final).

---

*Aprobado en sesión de brainstorming 14 Ago 2026. Siguiente paso: plan de implementación vía writing-plans.*
