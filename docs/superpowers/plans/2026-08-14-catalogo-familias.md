# Rediseño Catálogo Familias — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reestructurar el catálogo del portal de 6 servicios planos a 6 familias (2 con sub-tipos), agregar Agent Visibility, y renombrar la línea de seguridad a Security Testing.

**Architecture:** Enfoque A del spec — `Service` gana campo `variants?` opcional; los servicios planos no cambian. La página de familia renderiza secciones apiladas con sticky sub-nav (anclas). Pricing por sub-tipo. Tipos compartidos migrados a módulo neutral para romper la importación circular.

**Tech Stack:** Vite 6 + React 19 + TypeScript 5.8 + Tailwind CSS 4 + Motion + Vitest (nuevo, solo para capa de datos).

**Spec:** `docs/superpowers/specs/2026-08-14-catalogo-familias-diseno.md` — las decisiones ahí documentadas gobiernan este plan. Leer spec antes de ejecutar.

## Global Constraints

- Directorio de trabajo: `Proyectos 2026/ProjectJarvis/Agentes&Robots/` — todos los comandos desde ahí.
- No tocar: Hero, Process (home), Stats, SocialProof, PortfolioSection, FAQ global, CTA, páginas institucionales, efectos visuales existentes.
- Regla de validación del modelo: si `variants !== undefined`, los campos `features`/`useCase`/`faq`/`pricing` a nivel Service se ignoran.
- Regla de opacity (memoria del proyecto): **Motion es dueño único de opacity**; GSAP solo para transforms. No introducir animaciones de opacity nuevas fuera de Motion.
- Idioma del copy: español MX (tuteo), tono B2B directo, sin bulos.
- Los links internos no deben referenciar `voice-coworkers` ni `agent-pentesting` al terminar (grep limpio).
- Verificación mínima por tarea: `npm run lint` (tsc) sin errores nuevos.
- Orden del catálogo final (array `services`): bb-one, coworkers-digitales, security-testing, mapyourflow, agent-visibility, ai-training.

---

### Task 1: Módulo de tipos compartidos + Vitest

**Files:**
- Create: `src/types/catalog.ts`
- Modify: `src/data/services.ts` (solo imports/exports de tipos)
- Modify: `src/components/pricing/PricingSection.tsx` (import de tipos)
- Modify: `src/components/pricing/PlanCard.tsx`, `RoleCard.tsx`, `TieredPlans.tsx`, `ModularPricing.tsx` (import de tipos)
- Modify: `package.json` (devDependency vitest + script test)

**Interfaces:**
- Consumes: nada (tarea fundacional).
- Produces: `src/types/catalog.ts` exporta `Service`, `ServiceVariant`, `ServiceFeature`, `ServiceProcessStep`, `ServiceFAQ`, `ServiceUseCase`, `PricingPlan`, `PlanFeature`, `VirtualRole`, `ServicePricing`. `services.ts` re-exporta los tipos que hoy exporta (compatibilidad). Vitest operativo vía `npm test`.

- [ ] **Step 1: Instalar vitest**

```bash
npm install -D vitest
```

- [ ] **Step 2: Agregar script test a package.json**

En `"scripts"` agregar:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Crear `src/types/catalog.ts`**

```typescript
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
```

- [ ] **Step 4: Actualizar imports**

En `src/data/services.ts`:
- Eliminar las definiciones locales de `ServiceFeature`, `ServiceProcessStep`, `ServiceFAQ`, `ServiceUseCase`, `Service` (líneas 16-50) y el import de `ServicePricing` desde PricingSection (línea 14).
- Agregar: `import type { Service, ServiceFeature, ServiceProcessStep, ServiceFAQ, ServiceUseCase, ServiceVariant } from "../types/catalog";`
- Agregar re-export de compatibilidad: `export type { Service, ServiceFeature, ServiceProcessStep, ServiceFAQ, ServiceUseCase, ServiceVariant };`
- Los imports de iconos de pricing (`Receipt, CreditCard, BarChart3, Calculator`) permanecen (los usa el pricing de BB One).

En `src/components/pricing/PricingSection.tsx`:
- Eliminar la definición local de `ServicePricing` (líneas 11-22) y el import de `ServiceFAQ` desde `../../data/services` (línea 9).
- Agregar: `import type { ServicePricing, PricingPlan, PlanFeature, VirtualRole } from "../../types/catalog";`
- Mantener el re-export final: `export type { PricingPlan, PlanFeature, VirtualRole };` y agregar `export type { ServicePricing };`

En `src/components/pricing/PlanCard.tsx`, `RoleCard.tsx`, `TieredPlans.tsx`, `ModularPricing.tsx`:
- Donde definan o importen `PricingPlan`/`PlanFeature`/`VirtualRole` localmente, reemplazar por import desde `../../types/catalog` (re-exportando si otros archivos los importan de ahí — mantener las firmas públicas existentes intactas).

- [ ] **Step 5: Test de humo**

Crear `src/data/__tests__/services.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { services } from "../services";

describe("catálogo", () => {
  it("exporta un array de servicios", () => {
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 6: Correr tests y lint**

```bash
npm test
npm run lint
```

Esperado: 1 test PASS; tsc sin errores (los 4 errores pre-existentes de `pricing/` pueden seguir — se corrigen en Task 9 si son triviales).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: tipos compartidos en types/catalog.ts + vitest

Rompe importación circular services.ts <-> PricingSection.tsx.
No hay cambios de comportamiento."
```

---

### Task 2: Contrato del catálogo nuevo (tests de estructura primero)

**Files:**
- Test: `src/data/__tests__/services.test.ts` (expandir)

**Interfaces:**
- Consumes: `services` de Task 1.
- Produces: contrato testeado — slugs del catálogo final, variants por familia, regla variants↔planos, slugs únicos. Tasks 3-5 hacen pasar estos tests parcialmente (los de su familia).

- [ ] **Step 1: Reemplazar el contenido del test con el contrato completo**

```typescript
import { describe, it, expect } from "vitest";
import { services } from "../services";

const bySlug = (slug: string) => services.find((s) => s.slug === slug);

describe("estructura del catálogo", () => {
  it("tiene las 6 familias en el orden del spec", () => {
    expect(services.map((s) => s.slug)).toEqual([
      "bb-one",
      "coworkers-digitales",
      "security-testing",
      "mapyourflow",
      "agent-visibility",
      "ai-training",
    ]);
  });

  it("slugs únicos entre familias", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("regla: familia con variants no usa campos planos", () => {
    for (const s of services) {
      if (s.variants) {
        expect(s.features, `${s.slug}: familia no debe definir features`).toBeUndefined();
        expect(s.useCase, `${s.slug}: familia no debe definir useCase`).toBeUndefined();
        expect(s.faq, `${s.slug}: familia no debe definir faq`).toBeUndefined();
        expect(s.pricing, `${s.slug}: familia no debe definir pricing`).toBeUndefined();
      } else {
        expect(s.features, `${s.slug}: servicio plano debe definir features`).toBeDefined();
        expect(s.useCase, `${s.slug}: servicio plano debe definir useCase`).toBeDefined();
        expect(s.faq, `${s.slug}: servicio plano debe definir faq`).toBeDefined();
      }
    }
  });

  it("slugs de variants únicos dentro de su familia", () => {
    for (const s of services) {
      if (!s.variants) continue;
      const slugs = s.variants.map((v) => v.slug);
      expect(new Set(slugs).size, `${s.slug}: variants con slug duplicado`).toBe(slugs.length);
    }
  });
});

describe("Coworkers Digitales (familia)", () => {
  it("tiene los 3 sub-tipos en orden", () => {
    expect(bySlug("coworkers-digitales")?.variants?.map((v) => v.slug)).toEqual([
      "chat-agents",
      "voice-agents",
      "agent-workflows",
    ]);
  });

  it("chat y voice conservan pricing tiered; workflows usa quote", () => {
    const fam = bySlug("coworkers-digitales")!;
    const chat = fam.variants!.find((v) => v.slug === "chat-agents")!;
    const voice = fam.variants!.find((v) => v.slug === "voice-agents")!;
    const flows = fam.variants!.find((v) => v.slug === "agent-workflows")!;
    expect(chat.pricing?.model).toBe("tiered");
    expect(voice.pricing?.model).toBe("tiered");
    expect(flows.pricing?.model).toBe("quote");
  });
});

describe("Security Testing (familia)", () => {
  it("tiene los 2 sub-tipos en orden", () => {
    expect(bySlug("security-testing")?.variants?.map((v) => v.slug)).toEqual([
      "agent-security",
      "web-security",
    ]);
  });
});

describe("Agent Visibility (nuevo)", () => {
  it("es servicio plano con pricing tiered", () => {
    const s = bySlug("agent-visibility");
    expect(s?.variants).toBeUndefined();
    expect(s?.pricing?.model).toBe("tiered");
  });
});

describe("sobrevivientes intactos", () => {
  it("bb-one conserva pricing modular", () => {
    expect(bySlug("bb-one")?.pricing?.model).toBe("modular");
  });

  it("mapyourflow y ai-training siguen planos sin pricing", () => {
    expect(bySlug("mapyourflow")?.pricing).toBeUndefined();
    expect(bySlug("ai-training")?.pricing).toBeUndefined();
  });
});
```

- [ ] **Step 2: Correr tests — deben fallar**

```bash
npm test
```

Esperado: FAIL — el catálogo actual no tiene `security-testing` ni `agent-visibility`, y coworkers no tiene variants. Estos tests son el contrato que Tasks 3-5 satisfacen.

- [ ] **Step 3: Commit (tests rojos documentan el contrato)**

```bash
git add src/data/__tests__/services.test.ts
git commit -m "test: contrato del catálogo de 6 familias (rojo hasta Task 5)"
```

---

### Task 3: Coworkers Digitales → familia (chat + voice migran, workflows nuevo)

**Files:**
- Modify: `src/data/services.ts`

**Interfaces:**
- Consumes: `ServiceVariant` de Task 1; contrato de Task 2 (bloque "Coworkers Digitales").
- Produces: familia `coworkers-digitales` con variants `chat-agents`, `voice-agents`, `agent-workflows` (contenido completo).

- [ ] **Step 1: Reemplazar el objeto Coworkers Digitales actual**

Reemplazar el objeto `slug: "coworkers-digitales"` completo (líneas ~328-497) por la familia. **Migración**: los bloques `features`, `useCase`, `faq`, `pricing` del Coworkers actual pasan TAL CUAL al variant `chat-agents`; los de Voice Coworkers (objeto `slug: "voice-coworkers"`, que se ELIMINA como entrada top-level) pasan tal cual a `voice-agents`. Solo cambian los campos de envoltura indicados:

```typescript
{
  slug: "coworkers-digitales",
  title: "Coworkers Digitales",
  subtitle: "Agentes de IA Conversacionales y Operativos",
  icon: MessageSquare,
  shortDescription:
    "Agentes de IA donde tu operación ya vive: chat en WhatsApp, Telegram y web; atención telefónica con voz natural; e integraciones que conectan tus sistemas y ejecutan trabajo real. No son chatbots de menú.",
  longDescription:
    "Coworkers Digitales es nuestra línea de agentes de IA para operación empresarial. Un Coworker comprende el contexto de tu negocio, accede a tus sistemas y ejecuta acciones reales: agenda, cotiza, factura, notifica y escala a humanos cuando corresponde. Elige la forma que necesita tu operación — chat, voz o integraciones entre sistemas — o combínalas.",
  process: [
    // MIGRAR TAL CUAL el process actual de Coworkers (3 pasos:
    // Mapeo de conversaciones / Diseño y entrenamiento / Piloto controlado)
  ],
  variants: [
    {
      slug: "chat-agents",
      name: "Chat Agents",
      tagline: "Atención conversacional en WhatsApp, Telegram y web",
      icon: MessageSquare,
      description:
        "Agentes de texto que atienden clientes y equipos en los canales que ya usan. Comprenden lenguaje natural, manejan contexto de conversaciones largas y ejecutan flujos de múltiples pasos: cotizar, confirmar, agendar, notificar.",
      // MIGRAR TAL CUAL: features (6), useCase (GMB inspectores), faq (3),
      // pricing tiered (Starter/Growth/Pro Omnicanal) del Coworkers actual
    },
    {
      slug: "voice-agents",
      name: "Voice Agents",
      tagline: "Atención telefónica con voz natural",
      icon: Phone,
      description:
        "Agentes de voz que atienden llamadas con voces en español neutro que no suenan robóticas, integrados a tu telefonía IP y CRM. Capturan, verifican, transfieren y escalan cada llamada de forma inteligente.",
      // MIGRAR TAL CUAL: features (5), useCase (aseguradora 200+ llamadas),
      // faq (3), pricing tiered (Starter/Growth/Pro) del Voice Coworkers actual
    },
    {
      slug: "agent-workflows",
      name: "Agent Workflows",
      tagline: "Integraciones y automatizaciones con IA entre tus sistemas",
      icon: Workflow,
      description:
        "No todo agente conversa. Los Agent Workflows conectan tus sistemas —CRM, ERP, correo, hojas de cálculo, portales— y ejecutan trabajo de punta a punta con IA: clasifican, deciden, transforman y mueven información sin que nadie abra una pantalla. La evolución inteligente de lo que antes hacías con scripts y n8n.",
      features: [
        {
          title: "Orquestación multi-sistema",
          description:
            "Conectamos CRM, ERP, correo y portales en flujos de punta a punta. La información fluye sola entre sistemas que hoy no se hablan.",
        },
        {
          title: "Decisiones con IA, no solo triggers",
          description:
            "A diferencia de una automatización tradicional, el workflow clasifica documentos, interpreta excepciones y decide el siguiente paso según reglas de negocio reales.",
        },
        {
          title: "Manejo de errores con criterio",
          description:
            "Reintentos automáticos, validaciones previas y alertas cuando algo requiere criterio humano. El flujo no se rompe silenciosamente.",
        },
        {
          title: "Despliegue flexible",
          description:
            "En la nube o on-premise junto a BB One cuando los datos son sensibles. La misma lógica, el grado de privacidad que tu compliance exige.",
        },
        {
          title: "Observabilidad total",
          description:
            "Cada ejecución queda registrada: qué corrió, qué decidió, qué movió. Logs consultables y métricas de operación en dashboard.",
        },
      ],
      useCase: {
        title: "CRM conversacional para operación de campo",
        description:
          "Un despacho de servicios necesitaba que la información de sus agentes de campo llegara al CRM sin captura manual. Con Agent Workflows sobre Hermes, los reportes de campo se procesan, clasifican y registran solos, con escalamiento a humano solo en excepciones.",
        metrics: [
          "Captura manual eliminada en registros de campo",
          "Clasificación automática con escalamiento por excepción",
          "Operación 24/7 sin intervención rutinaria",
        ],
      },
      faq: [
        {
          q: "¿En qué se diferencia de una automatización con n8n o Make?",
          a: "Las plataformas de automatización mueven datos cuando el flujo es rígido y predecible. Los Agent Workflows agregan criterio: clasifican documentos, interpretan excepciones y deciden el siguiente paso. Solemos combinar ambas — orquestación determinista donde sirve, IA donde aporta.",
        },
        {
          q: "¿Necesito tener BB One para contratar Agent Workflows?",
          a: "No. Los Agent Workflows corren en la nube por defecto. BB One entra cuando tus datos no pueden salir de tu red o necesitas inferencia local: mismo cerebro, mayor privacidad.",
        },
        {
          q: "¿Cómo se cobra?",
          a: "Cada integración se cotiza según los sistemas involucrados y la complejidad de las reglas. El diagnóstico inicial es sin costo y de ahí sale una propuesta cerrada antes de escribir una línea de código.",
        },
      ],
      pricing: {
        model: "quote",
        sectionTitle: "Cotización por integración",
        sectionSubtitle:
          "El precio depende de los sistemas a conectar y la complejidad de las reglas. Así de simple.",
        quote: {
          priceLine: "Implementaciones desde $18,000 MXN",
          bullets: [
            "Diagnóstico de sistemas y flujos (sin costo)",
            "Propuesta cerrada antes de desarrollar",
            "Mantenimiento y evolución mensual opcional",
          ],
          note: "La mayoría de los clientes arranca con un flujo crítico y crece desde ahí.",
        },
        pricingFaq: [
          {
            q: "¿Qué determina el costo?",
            a: "Número de sistemas a integrar, volumen de datos y complejidad de las reglas de negocio. Con el diagnóstico lo sabrás antes de comprometerte a nada.",
          },
        ],
      },
    },
  ],
},
```

- [ ] **Step 2: Eliminar el objeto Voice Coworkers top-level**

Borrar el objeto completo `slug: "voice-coworkers"` (su contenido ya migró a `voice-agents`). El import de `Phone` permanece (lo usa el variant).

- [ ] **Step 3: Correr tests — bloque Coworkers pasa, resto sigue rojo**

```bash
npm test
```

Esperado: PASS en "Coworkers Digitales (familia)". FAIL persiste en orden del catálogo (falta security-testing) y en "Security Testing".

- [ ] **Step 4: Lint**

```bash
npm run lint
```

Esperado: sin errores nuevos (puede fallar por Navbar/Footer apuntando a slug eliminado — eso no lo detecta tsc; se arregla en Task 8).

- [ ] **Step 5: Commit**

```bash
git add src/data/services.ts
git commit -m "feat: Coworkers Digitales como familia — chat/voice migran, Agent Workflows nuevo"
```

---

### Task 4: Security Testing → familia (agent-security migra, web-security nuevo)

**Files:**
- Modify: `src/data/services.ts`

**Interfaces:**
- Consumes: `ServiceVariant` de Task 1; contrato de Task 2 (bloque "Security Testing").
- Produces: familia `security-testing` con variants `agent-security` y `web-security`.

- [ ] **Step 1: Reemplazar el objeto Agent Pentesting actual**

Reemplazar el objeto `slug: "agent-pentesting"` (líneas ~671-750) por la familia. **Migración**: features (5), useCase (fintech), faq (3) del Agent Pentesting actual pasan TAL CUAL al variant `agent-security`. Icono de familia: importar `ShieldCheck` de lucide-react (agregar al import existente). Icons de variants: `Bot` y `Globe` (agregar al import).

```typescript
{
  slug: "security-testing",
  title: "Security Testing",
  subtitle: "Validación de Seguridad para IA y Web",
  icon: ShieldCheck,
  shortDescription:
    "Pentesting profesional para todo lo que construimos con IA y para lo que ya tienes en línea: auditoría de agentes con 60+ patrones de ataque y pentesting web tradicional OWASP Top 10. Con reportes ejecutivos y técnicos, y re-test incluido.",
  longDescription:
    "Un sistema en producción sin pruebas de seguridad es un riesgo asumido sin saberlo. Security Testing es nuestra práctica de pentesting con dos frentes: seguridad de agentes de IA (el attack surface nuevo que nadie audita) y seguridad web tradicional (OWASP Top 10). Metodología formal, evidencia reproducible y remediación verificada.",
  process: [
    {
      step: 1,
      title: "Scope y contexto",
      description:
        "Definimos el alcance: sistemas y agentes a probar, canales de entrada, datos sensibles en juego, y reglas de engagement documentadas antes de tocar nada.",
    },
    {
      step: 2,
      title: "Ejecución de pruebas",
      description:
        "Aplicamos nuestra suite de patrones de ataque —60+ para agentes IA, OWASP Top 10 para web— adaptada al contexto específico de tu sistema.",
    },
    {
      step: 3,
      title: "Reporte y remediación",
      description:
        "Entregamos reporte ejecutivo (riesgo y recomendaciones) y técnico (payloads y reproducción exacta). Tu equipo remedia con nuestra guía.",
    },
    {
      step: 4,
      title: "Re-test de verificación",
      description:
        "Después de la remediación, re-ejecutamos los hallazgos para verificar que están efectivamente cerrados. Sin sorpresas.",
    },
  ],
  variants: [
    {
      slug: "agent-security",
      name: "Agent Security",
      tagline: "Red teaming para agentes de IA",
      icon: Bot,
      description:
        "Auditoría de seguridad especializada para agentes de IA en producción. Evaluamos inyección de prompts, jailbreaking, extracción de datos y manipulación de contexto con más de 60 patrones de ataque documentados. Porque un agente sin pruebas de seguridad es una puerta abierta.",
      // MIGRAR TAL CUAL: features (5), useCase (fintech), faq (3)
      // del Agent Pentesting actual
      pricing: {
        model: "quote",
        sectionTitle: "Cotización por auditoría",
        sectionSubtitle:
          "El costo depende de la complejidad del agente y sus integraciones. Rango típico:",
        quote: {
          priceLine: "Desde $25,000 MXN por auditoría completa",
          bullets: [
            "Suite de 60+ patrones de ataque adaptada a tu agente",
            "Reporte ejecutivo + reporte técnico con reproducción exacta",
            "Re-test incluido tras la remediación",
            "Chatbot simple (3-5 días) / sistema multi-agente (2-3 semanas)",
          ],
        },
        pricingFaq: [
          {
            q: "¿El re-test tiene costo adicional?",
            a: "No. La verificación post-remediación está incluida en la auditoría. Si después quieres validación continua (cada release mayor), se contrata como retainer.",
          },
        ],
      },
    },
    {
      slug: "web-security",
      name: "Web Security",
      tagline: "Pentesting web tradicional — OWASP Top 10",
      icon: Globe,
      description:
        "Auditoría de seguridad para aplicaciones web: inyección, autenticación rota, control de acceso, configuración errónea y el resto del OWASP Top 10. Metodología formal de 6 fases con herramientas probadas (ZAP, nuclei, Nikto) y validación manual de hallazgos.",
      features: [
        {
          title: "OWASP Top 10 completo",
          description:
            "Cobertura de las 10 categorías de riesgo web más críticas, adaptada al stack de tu aplicación.",
        },
        {
          title: "Metodología de 6 fases",
          description:
            "Pre-engagement, reconocimiento, escaneo, explotación manual, reporting y post-remediación. Nada de escaneos automáticos sin contexto.",
        },
        {
          title: "Stack probado y reproducible",
          description:
            "Herramientas open-source validadas (ZAP, nuclei, Nikto, Wappalyzer) y evidencia reproducible: cada hallazgo incluye pasos exactos de reproducción.",
        },
        {
          title: "Doble reporte",
          description:
            "Reporte ejecutivo para dirección (riesgo, impacto, prioridades) y reporte técnico para el equipo de desarrollo (payloads, evidencia, remediación).",
        },
        {
          title: "Reglas de engagement claras",
          description:
            "Antes de probar nada, firmamos reglas de engagement que definen alcance, ventanas y límites. Cero riesgo para tu operación.",
        },
      ],
      useCase: {
        title: "E-commerce con pagos y datos de clientes",
        description:
          "Una tienda en línea con pagos, webhooks de pasarela y datos personales de clientes requería auditoría antes de su campaña anual de ventas. Evaluamos la aplicación completa: autenticación, control de acceso, webhooks y exposición de secrets en el cliente.",
        metrics: [
          "OWASP Top 10 cubierto end-to-end",
          "Hallazgos priorizados por impacto real de negocio",
          "Re-test de verificación incluido post-remediación",
        ],
      },
      faq: [
        {
          q: "¿El pentesting puede tumbar mi sitio?",
          a: "No. Trabajamos con reglas de engagement firmadas, ventanas acordadas y control de tasa. Si algo es delicado, se prueba en staging o con datos controlados.",
        },
        {
          q: "¿Necesito prepararme antes?",
          a: "Solo acceso: URLs, credenciales de prueba y contexto del stack. Nosotros traemos las herramientas y la metodología.",
        },
        {
          q: "¿Sirve para compliance?",
          a: "El reporte ejecutivo está diseñado para presentarse a dirección y auditores. Alineamos hallazgos con las referencias OWASP correspondientes.",
        },
      ],
      pricing: {
        model: "tiered",
        sectionTitle: "Planes de Web Security",
        sectionSubtitle: "Según el tipo de aplicación y profundidad de alcance.",
        plans: [
          {
            tierName: "App Estática",
            tierSlug: "estatica",
            description: "Sitios informativos y landing pages con superficie mínima.",
            setupPrice: { min: 15000, max: 25000, suffix: " (único)" },
            features: [
              { text: "OWASP Top 10 sobre sitio público", included: true },
              { text: "Escaneo + validación manual", included: true },
              { text: "Reporte ejecutivo + técnico", included: true },
              { text: "Re-test post-remediación", included: true },
              { text: "Testing autenticado de lógica de negocio", included: false },
            ],
          },
          {
            tierName: "App Dinámica",
            tierSlug: "dinamica",
            description: "Aplicaciones con login, base de datos y transacciones.",
            setupPrice: { min: 25000, max: 45000, suffix: " (único)" },
            highlight: true,
            features: [
              { text: "Todo lo de App Estática", included: true },
              { text: "Testing autenticado (roles y permisos)", included: true },
              { text: "Lógica de negocio y control de acceso", included: true },
              { text: "APIs y webhooks", included: true },
              { text: "Re-test post-remediación", included: true },
            ],
          },
          {
            tierName: "Ecosistema",
            tierSlug: "ecosistema",
            description: "Múltiples aplicaciones, integraciones y pagos.",
            setupPrice: { min: 45000, max: 80000, suffix: " (único)", openEnded: true },
            features: [
              { text: "Todo lo de App Dinámica", included: true },
              { text: "Múltiples aplicaciones y subdominios", included: true },
              { text: "Pasarelas de pago y flujos transaccionales", included: true },
              { text: "Revisión de secrets y configuración cloud", included: true },
              { text: "Re-test + acompañamiento de remediación", included: true },
            ],
          },
        ],
        pricingFaq: [
          {
            q: "¿Cada cuánto se recomienda auditar?",
            a: "Con cada release mayor o mínimo una vez al año. Ofrecemos re-test anual con descuento para clientes recurrentes.",
          },
        ],
      },
    },
  ],
},
```

- [ ] **Step 2: Correr tests**

```bash
npm test
```

Esperado: PASS en "Security Testing (familia)". Persiste FAIL en orden del catálogo (falta `agent-visibility`) y en "Agent Visibility".

- [ ] **Step 3: Lint + Commit**

```bash
npm run lint
git add src/data/services.ts
git commit -m "feat: familia Security Testing — Agent Security migra, Web Security nuevo"
```

---

### Task 5: Agent Visibility (servicio nuevo completo)

**Files:**
- Modify: `src/data/services.ts`

**Interfaces:**
- Consumes: contrato de Task 2 (bloques "Agent Visibility" y "orden del catálogo").
- Produces: servicio plano `agent-visibility` con pricing tiered de 3 planes. Catálogo completo → todos los tests verdes.

- [ ] **Step 1: Insertar el servicio entre mapyourflow y ai-training**

Importar `Eye` de lucide-react. Insertar después del objeto `mapyourflow`:

```typescript
{
  slug: "agent-visibility",
  title: "Agent Visibility",
  subtitle: "Presencia Agéntica y AEO",
  icon: Eye,
  shortDescription:
    "Cuando un comprador pregunta a la IA, ¿te recomienda a ti o a tu competencia? Diagnosticamos y mejoramos tu presencia ante ChatGPT, Perplexity, Gemini y los agentes que ya deciden qué comprar ver.",
  longDescription:
    "La búsqueda cambió: millones de compras empiezan con una pregunta a una IA, no con un clic en Google. Agent Visibility mide si las IAs te encuentran, te entienden y te recomiendan cuando un comprador pregunta por lo que vendes — y corrige lo que falta. No vanity metrics de '¿se mencionó mi marca?': verificamos si la IA recomienda tu solución para el trabajo que genera revenue.",
  features: [
    {
      title: "Score de Presencia Agéntica 0-100",
      description:
        "Diagnóstico cuantitativo de qué tan visible eres para las IAs, con benchmark directo contra tu competencia en las consultas que importan.",
    },
    {
      title: "Buyer intent queries de tu vertical",
      description:
        "No medimos consultas genéricas. Diseñamos las preguntas reales que hacen tus compradores y auditamos qué responde cada IA sobre ti en cada una.",
    },
    {
      title: "Diagnóstico en 3 dimensiones",
      description:
        "Accesibilidad (¿la IA puede encontrarte?), Legibilidad (¿entiende qué ofreces?) y Confianza (¿tiene señales de que eres bueno?). Causa técnica de cada hueco, no solo el síntoma.",
    },
    {
      title: "Plan de fixes priorizado",
      description:
        "Inventario de acciones concretas —schema, contenido por jobs, estrategia de reviews, llms.txt— priorizadas por impacto y ordenadas en roadmap de 90 días.",
    },
    {
      title: "Re-medición y retainer de crecimiento",
      description:
        "La presencia agéntica no es one-shot. Re-medimos el score tras implementar y mantenemos la mejora con monitoreo mensual contra tu competencia.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Auditoría inicial",
      description:
        "Inventario de presencia: GBP, indexación, robots.txt, schema, reviews, directorios. Salida: score 0-100 y benchmark vs competencia.",
    },
    {
      step: 2,
      title: "Análisis de causas",
      description:
        "Por cada hueco de presencia, identificamos la causa técnica: schema faltante, precios no parseables, contenido que la IA no puede citar.",
    },
    {
      step: 3,
      title: "Plan de 90 días",
      description:
        "Roadmap priorizado de fixes con impacto estimado. Lo implementamos nosotros, tu equipo, o mezcla — tú decides.",
    },
    {
      step: 4,
      title: "Implementación y re-medición",
      description:
        "Ejecución de fixes y re-medición del score. Garantía de movimiento: si el score no avanza, seguimos sin costo hasta que avance.",
    },
  ],
  useCase: {
    title: "Clínica veterinaria en Coyoacán",
    description:
      "PetCare tenía sitio web, Google Business Profile activo y buenas reseñas — pero al preguntarle a ChatGPT por 'veterinaria confiable en Coyoacán', la IA recomendaba a su competencia. El diagnóstico encontró las causas: robots.txt bloqueando GPTBot, precios en imágenes no parseables y schema LocalBusiness incompleto.",
    metrics: [
      "Score inicial 18/100 vs 61% de menciones a la competencia",
      "8 fixes priorizados en roadmap de 90 días",
      "Meta: aparecer en el top 3 de recomendaciones de IA del barrio",
    ],
  },
  faq: [
    {
      q: "¿Esto es SEO?",
      a: "Es lo que el SEO era en el 2005: un canal nuevo donde los primeros que se posicionen se llevan la ventaja. Las técnicas se solapan (schema, contenido, reseñas) pero el objetivo es otro — no rankear en Google, sino ser la respuesta que da la IA.",
    },
    {
      q: "¿Qué IAs evalúan?",
      a: "Las que tus compradores usan: ChatGPT, Perplexity, Gemini y Copilot como base, más las específicas de tu vertical que detectemos en la auditoría.",
    },
    {
      q: "¿Cuánto tarda en moverse el score?",
      a: "Los fixes técnicos (schema, robots, parseo) mueven la aguja en semanas. Las señales de confianza (reviews, menciones) toman 2-3 meses. Por eso el plan es de 90 días.",
    },
    {
      q: "¿Sirve para mi negocio?",
      a: "Si tus clientes te buscan o comparan online —y sobre todo si te preguntan a una IA— sí. Si tu demanda es 100% referida y offline, hay mejores inversiones. Te lo decimos honestamente en la auditoría.",
    },
  ],
  pricing: {
    model: "tiered",
    sectionTitle: "Planes de Agent Visibility",
    sectionSubtitle:
      "Del diagnóstico puntual a la mejora continua. La auditoría inicial va incluida en todos.",
    plans: [
      {
        tierName: "Diagnóstico",
        tierSlug: "diagnostico",
        description: "Saber dónde estás y qué hacer al respecto.",
        setupPrice: { min: 8000, max: 12000, suffix: " (único)" },
        features: [
          { text: "Score de presencia agéntica 0-100", included: true },
          { text: "Benchmark contra 2-3 competidores directos", included: true },
          { text: "Auditoría en 3 dimensiones (accesibilidad/legibilidad/confianza)", included: true },
          { text: "Plan de fixes priorizado", included: true },
          { text: "Implementación de fixes", included: false },
          { text: "Re-medición", included: false },
        ],
      },
      {
        tierName: "Implementación 90 días",
        tierSlug: "implementacion",
        description: "Ejecutamos el plan completo y re-medimos.",
        setupPrice: { min: 15000, max: 25000, suffix: " (90 días)" },
        highlight: true,
        features: [
          { text: "Todo el plan Diagnóstico", included: true },
          { text: "Implementación de los fixes priorizados", included: true },
          { text: "Contenido orientado a jobs y buyer queries", included: true },
          { text: "Estrategia de reviews 90 días", included: true },
          { text: "Re-medición final con reporte de avance", included: true },
          { text: "Garantía de movimiento del score", included: true },
        ],
      },
      {
        tierName: "Retainer Growth",
        tierSlug: "retainer",
        description: "Presencia agéntica que se mantiene y crece.",
        monthlyPrice: { min: 1500, max: 2500, suffix: "/mes" },
        features: [
          { text: "Monitoreo mensual del score", included: true },
          { text: "Ajustes continuos ante cambios de las IAs", included: true },
          { text: "Respuesta a reviews con plantillas", included: true },
          { text: "Reporte mensual de mención vs competencia", included: true },
        ],
      },
    ],
    pricingFaq: [
      {
        q: "¿Qué es la 'garantía de movimiento'?",
        a: "Si tras los 90 días el score no avanzó significativamente, seguimos trabajando sin costo adicional hasta que lo haga. Nos pagan por resultados, no por horas.",
      },
    ],
  },
},
```

- [ ] **Step 2: Correr tests — TODO verde**

```bash
npm test
```

Esperado: todos PASS. El catálogo completo cumple el contrato.

- [ ] **Step 3: Lint + Commit**

```bash
npm run lint
git add src/data/services.ts
git commit -m "feat: servicio Agent Visibility con pricing tiered — catálogo 6 familias completo"
```

---

### Task 6: Extraer secciones de ServicePage a componentes

**Files:**
- Create: `src/components/service/FeaturesSection.tsx`
- Create: `src/components/service/UseCaseSection.tsx`
- Create: `src/components/service/FAQSection.tsx`
- Modify: `src/pages/ServicePage.tsx`

**Interfaces:**
- Consumes: nada nuevo.
- Produces: `FeaturesSection({ features }: { features: ServiceFeature[] })`, `UseCaseSection({ useCase }: { useCase: ServiceUseCase })`, `FAQSection({ faqs }: { faqs: ServiceFAQ[] })`. ServicePage mantiene comportamiento idéntico (refactor puro).

- [ ] **Step 1: Crear `FeaturesSection.tsx`**

Mover el JSX de la sección `{/* Features */}` de ServicePage (líneas 168-205) envuelto en componente:

```typescript
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import type { ServiceFeature } from "../../types/catalog";

export function FeaturesSection({ features }: { features: ServiceFeature[] }) {
  return (
    <section className="py-32 px-6 bg-slate-900/20">
      {/* …pegar el interior actual de la sección Features de ServicePage,
         sustituyendo service.features por features… */}
    </section>
  );
}
```

- [ ] **Step 2: Crear `UseCaseSection.tsx`**

Mismo patrón con la sección Use Case (líneas 244-282), prop `useCase: ServiceUseCase`, sustituyendo `service.useCase` por `useCase`.

- [ ] **Step 3: Crear `FAQSection.tsx`**

Mover `FAQAccordion` (líneas 15-59) y la sección FAQ (líneas 292-304) a un solo componente:

```typescript
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { ServiceFAQ } from "../../types/catalog";

export function FAQSection({
  faqs,
  title,
  alternate,
}: {
  faqs: ServiceFAQ[];
  title: string;
  alternate?: boolean;
}) {
  // FAQAccordion como componente interno (mismo código actual)
  // Sección: className={`py-32 px-6 ${alternate ? "bg-slate-900/20" : ""}`}
  // h2 usa {title}
}
```

- [ ] **Step 4: Actualizar ServicePage para usar los componentes**

Reemplazar las tres secciones inline por:

```typescript
<FeaturesSection features={service.features!} />
{/* Process se queda inline (no cambia) */}
<UseCaseSection useCase={service.useCase!} />
{service.pricing && <PricingSection pricing={service.pricing} serviceSlug={service.slug} />}
<FAQSection faqs={service.faq!} title={"Preguntas sobre " + service.title} alternate={!!service.pricing} />
```

(El `!` es temporal — Task 8 introduce la bifurcación que elimina estos non-null assertions.)

- [ ] **Step 5: Verificar refactor puro**

```bash
npm run lint && npm run build
```

Esperado: sin errores nuevos, build exitoso. `npm run dev` y revisar `/servicios/bb-one` visualmente idéntico (opcional pero recomendado).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: extraer FeaturesSection/UseCaseSection/FAQSection de ServicePage"
```

---

### Task 7: VariantNav (sticky sub-nav) + VariantBlock + QuotePricing

**Files:**
- Create: `src/components/service/VariantNav.tsx`
- Create: `src/components/service/VariantBlock.tsx`
- Create: `src/components/pricing/QuotePricing.tsx`
- Modify: `src/components/pricing/PricingSection.tsx`

**Interfaces:**
- Consumes: `ServiceVariant` (Task 1), `FeaturesSection`/`UseCaseSection`/`FAQSection` (Task 6), `PricingSection` (existente).
- Produces: `VariantNav({ variants, familySlug }: { variants: ServiceVariant[]; familySlug: string })`, `VariantBlock({ variant, familySlug }: { variant: ServiceVariant; familySlug: string })`, `QuotePricing({ quote, serviceSlug }: { quote: QuoteConfig; serviceSlug: string })`. PricingSection soporta `model: "quote"`.

- [ ] **Step 1: Crear `QuotePricing.tsx`**

```typescript
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { QuoteConfig } from "../../types/catalog";

export function QuotePricing({
  quote,
  serviceSlug,
}: {
  quote: QuoteConfig;
  serviceSlug: string;
}) {
  return (
    <div className="max-w-3xl p-8 rounded-2xl enterprise-border bg-slate-900/40">
      <p className="text-white font-display text-2xl font-black mb-6">
        {quote.priceLine}
      </p>
      <ul className="space-y-4 mb-8">
        {quote.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-gray-400 text-sm">
            <CheckCircle2 size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
            {b}
          </li>
        ))}
      </ul>
      {quote.note && <p className="text-gray-500 text-sm mb-6">{quote.note}</p>}
      <Link
        to={`/contacto?servicio=${serviceSlug}`}
        className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-bg font-bold text-[12px] rounded-md tracking-wider"
      >
        SOLICITAR COTIZACIÓN
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Wire de `quote` en PricingSection**

En `PricingSection.tsx`, agregar import de QuotePricing y el branch:

```typescript
{pricing.model === "quote" && pricing.quote && (
  <QuotePricing quote={pricing.quote} serviceSlug={serviceSlug} />
)}
```

- [ ] **Step 3: Crear `VariantNav.tsx`**

```typescript
import type { ServiceVariant } from "../../types/catalog";

export function VariantNav({
  variants,
  familySlug,
}: {
  variants: ServiceVariant[];
  familySlug: string;
}) {
  return (
    <div className="sticky top-20 z-30 bg-brand-bg/85 backdrop-blur-md border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-2 justify-center">
        {variants.map((v) => {
          const Icon = v.icon;
          return (
            <a
              key={v.slug}
              href={`#${v.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[12px] font-bold tracking-wider text-gray-400 hover:text-white hover:border-brand-accent/50 enterprise-border transition-colors"
            >
              <Icon size={14} className="text-brand-accent" />
              {v.name.toUpperCase()}
            </a>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Crear `VariantBlock.tsx`**

```typescript
import { motion } from "motion/react";
import { FeaturesSection } from "./FeaturesSection";
import { UseCaseSection } from "./UseCaseSection";
import { FAQSection } from "./FAQSection";
import { PricingSection } from "../pricing/PricingSection";
import type { ServiceVariant } from "../../types/catalog";

export function VariantBlock({
  variant,
  familySlug,
}: {
  variant: ServiceVariant;
  familySlug: string;
}) {
  const Icon = variant.icon;
  return (
    <section id={variant.slug} className="scroll-mt-40 border-t border-white/5 first:border-t-0">
      {/* Encabezado del sub-tipo */}
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                <Icon className="text-brand-accent" size={24} />
              </div>
              <p className="text-[11px] font-black tracking-[0.2em] text-brand-accent uppercase opacity-60">
                {variant.tagline}
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-6">
              {variant.name}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              {variant.description}
            </p>
          </motion.div>
        </div>
      </div>
      <FeaturesSection features={variant.features} />
      <UseCaseSection useCase={variant.useCase} />
      {variant.pricing && (
        <PricingSection
          pricing={variant.pricing}
          serviceSlug={`${familySlug}#${variant.slug}`}
        />
      )}
      <FAQSection
        faqs={variant.faq}
        title={"Preguntas sobre " + variant.name}
        alternate={!!variant.pricing}
      />
    </section>
  );
}
```

- [ ] **Step 5: Verificar**

```bash
npm run lint && npm run build
```

Esperado: sin errores. (Los componentes existen pero aún no se usan en familia — Task 8 los conecta.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: VariantNav sticky, VariantBlock y modelo de pricing quote"
```

---

### Task 8: Bifurcación de ServicePage (familia vs plano)

**Files:**
- Modify: `src/pages/ServicePage.tsx`

**Interfaces:**
- Consumes: todo lo de Tasks 6-7.
- Produces: ServicePage que renderiza familia (variants) o plano; faqJsonLd agrega FAQs de variants.

- [ ] **Step 1: Bifurcación del render**

Después del bloque `if (!service)` agregar:

```typescript
const isFamily = !!service.variants;
```

- Hero: sin cambios (usa title/subtitle/longDescription de la familia — ya correctos).
- Después del Hero: `{isFamily && <VariantNav variants={service.variants!} familySlug={service.slug} />}`
- Process: se queda inline como está (compartido por la familia).
- Sustituir el bloque plano (`FeaturesSection` … `FAQSection`) por:

```typescript
{isFamily ? (
  service.variants!.map((v) => (
    <VariantBlock key={v.slug} variant={v} familySlug={service.slug} />
  ))
) : (
  <>
    <FeaturesSection features={service.features!} />
    <UseCaseSection useCase={service.useCase!} />
    {service.pricing && (
      <PricingSection pricing={service.pricing} serviceSlug={service.slug} />
    )}
    <FAQSection
      faqs={service.faq!}
      title={"Preguntas sobre " + service.title}
      alternate={!!service.pricing}
    />
  </>
)}
```

- [ ] **Step 2: faqJsonLd agrega FAQs de variants**

```typescript
const allFaqs = isFamily
  ? [
      ...service.variants!.flatMap((v) => v.faq),
      ...service.variants!.flatMap((v) => v.pricing?.pricingFaq ?? []),
    ]
  : [...service.faq ?? [], ...service.pricing?.pricingFaq ?? []];

const faqJsonLd = allFaqs.length > 0 ? {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
} : undefined;
```

Y en el `<SEO jsonLd={[...]}>`: pasar `...(faqJsonLd ? [faqJsonLd] : [])`.

- [ ] **Step 3: Verificación funcional local**

```bash
npm run lint && npm run build && npm run dev
```

En el navegador (manual):
- `/servicios/coworkers-digitales`: hero de familia → sticky sub-nav (3 botones) → process → 3 VariantBlocks con anclas `#chat-agents`, `#voice-agents`, `agent-workflows` que hacen scroll correcto (no quedan bajo el navbar).
- `/servicios/security-testing`: idem con 2 sub-tipos.
- `/servicios/bb-one`, `/servicios/mapyourflow`, `/servicios/agent-visibility`, `/servicios/ai-training`: render plano como siempre, Agent Visibility muestra pricing tiered.
- `/servicios/voice-coworkers`: "Servicio no encontrado" (esperado hasta nunca — el slug ya no existe).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: ServicePage bifurca familia/plano — sticky sub-nav + faqJsonLd agregado"
```

---

### Task 9: Navbar, Footer, sitemap y hygiene tsc

**Files:**
- Modify: `src/components/Navbar.tsx:6-13`
- Modify: `src/components/Footer.tsx:3-10`
- Modify: `public/sitemap.xml`
- Modify (si trivial): `src/components/pricing/PlanCard.tsx`, `RoleCard.tsx` (errores tsc pre-existentes del prop `key`)

**Interfaces:**
- Consumes: slugs del catálogo final.
- Produces: navegación y sitemap alineados al catálogo nuevo; `grep -r "voice-coworkers\|agent-pentesting" src/ public/` vacío.

- [ ] **Step 1: Navbar — nuevo productLinks**

```typescript
const productLinks = [
  { label: "MAPYOURFLOW", href: "/servicios/mapyourflow" },
  { label: "BB ONE", href: "/servicios/bb-one" },
  { label: "COWORKERS", href: "/servicios/coworkers-digitales" },
  { label: "SECURITY", href: "/servicios/security-testing" },
  { label: "VISIBILITY", href: "/servicios/agent-visibility" },
  { label: "TRAINING", href: "/servicios/ai-training" },
];
```

- [ ] **Step 2: Footer — nuevo array services**

```typescript
const services = [
  { label: "BB One Hardware", to: "/servicios/bb-one" },
  { label: "Coworkers Digitales", to: "/servicios/coworkers-digitales" },
  { label: "Security Testing", to: "/servicios/security-testing" },
  { label: "MapYourFlow.app", to: "/servicios/mapyourflow" },
  { label: "Agent Visibility", to: "/servicios/agent-visibility" },
  { label: "AI Training", to: "/servicios/ai-training" },
];
```

- [ ] **Step 3: Sitemap — reemplazar las 2 URLs viejas**

En `public/sitemap.xml`: eliminar `<url>` de `voice-coworkers` y `agent-pentesting`; asegurar que existen `security-testing` y `agent-visibility` (mismas fechas de las demás entradas).

- [ ] **Step 4: Higiene tsc en pricing (si trivial)**

Corregir los 4 errores pre-existentes del prop `key` en `PlanCard.tsx`/`RoleCard.tsx` (typing). Si el fix es mayor a un cambio de typing (rediseño), dejarlos y anotar — no bloquean build.

- [ ] **Step 5: Verificación completa**

```bash
npm test && npm run lint && npm run build
grep -rn "voice-coworkers\|agent-pentesting" src/ public/ index.html || echo "CLEAN"
```

Esperado: tests PASS, tsc limpio, build OK, grep CLEAN.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: navegación, footer y sitemap alineados al catálogo de 6 familias"
```

---

### Task 10: Verificación final end-to-end + docs

**Files:**
- Modify: `CLAUDE.md` (del proyecto del portal)
- Modify: memoria KTM `project-agentes-robots-b2b.md` y `services-agentes-robots.md` (fuera del repo — la actualiza el orquestador, no el subagent)

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: verificación end-to-end documentada; docs al día.

- [ ] **Step 1: Checklist manual en dev server**

`npm run dev` y recorrer:

1. Home: grid de Solutions muestra las 6 familias nuevas (nombres: Coworkers Digitales, Security Testing, Agent Visibility visibles).
2. Las 6 rutas `/servicios/{slug}` cargan sin errores de consola.
3. Coworkers: sticky sub-nav funciona; anclas scrollean bien; chat y voice muestran pricing tiered; workflows muestra quote.
4. Security: agent-security muestra quote; web-security muestra tiered.
5. Agent Visibility: pricing tiered de 3 planes.
6. BB One y AI Training: idénticos a antes.
7. Navbar y Footer: links a las 6 familias, ningún 404.
8. Console del navegador sin errores.

- [ ] **Step 2: Actualizar CLAUDE.md del proyecto**

Reemplazar la tabla "Productos/Soluciones" por las 6 familias con sub-tipos; nota de arquitectura: `variants?` opcional en Service (Enfoque A), pricing por sub-tipo, familia = 1 página con sticky sub-nav.

- [ ] **Step 3: Commit final**

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md del portal con catálogo de 6 familias"
```

- [ ] **Step 4: Dry-run de deploy (lección [[feedback-deploy-verification]])**

```bash
npm run build && npm run preview
```

Recorrer el checklist del Step 1 sobre el build de producción (no solo dev). Los bugs que el dev server perdona, el build los escupe.

- [ ] **Step 5: Reporte al orquestador**

El subagent reporta: commits hechos, tests passing, checklist manual OK, y cualquier desviación del plan. La actualización de memoria KTM la hace el orquestador al cerrar (no el subagent).

---

## Notas de coordinación

- **Los números de pricing de Web Security y Agent Security (Tasks 4-5) son estimaciones coherentes con el catálogo** que Gil debe validar antes de deploy a producción. Están centralizados en `services.ts` — ajustarlos es un edit de un archivo.
- **Desviación del spec §4.3 (decisión de Gil pendiente)**: el spec decía useCase de Web Security = Imperam (engagement real). El plan usa un caso anónimo ("e-commerce con pagos, webhooks y datos de clientes") que describe el mismo trabajo. Rationale: Imperam tiene el RoE sin firmar y es cliente real — publicarlo en el portal público antes de cerrar el engagement es exposición comercial prematura. Si Gil prefiere nombrar a Imperam, el cambio es un edit al useCase en Task 4.
- **Feedback [[feedback-checkpoint-per-task]] de Gil**: cada task termina en commit + review limpia. Este plan lo respeta por diseño (un commit por task).
