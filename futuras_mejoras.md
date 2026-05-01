# Agentes&Robots — Futuras Mejoras

> **Creado**: 25 de Abril, 2026
> **Estado**: Planeacion
> **Prioridad**: Post-deploy
> **Stack actual**: Vite 6 + React 19 + Tailwind CSS 4 (sitio estatico, sin backend)

---

## 1. Agente IA de Chat (Preventa / Postventa)

### Concepto

Un widget de chat flotante que demuestre en vivo lo que vendemos: "Este es el tipo de agente que podemos implementar para ti". El agente responde preguntas sobre servicios, precios, casos de uso y guía al visitante hacia un contacto o demo.

### Opciones de Implementacion

| Opcion | Descripcion | Costo | Complejidad |
|--------|-------------|-------|-------------|
| **A. Tawk.to + Custom Bot** | Widget de chat con bot basico integrado, manos a humano cuando se necesita | Gratis | Baja |
| **B. Chatbase / Dante AI** | Entrenar un chatbot con el contenido del sitio (scraping auto) | ~$20-50/mes | Baja |
| **C. Vercel AI SDK + API Route** | Chat custom con Claude/GPT via API, integrado en el sitio | ~$5-15/mes (API) | Media |
| **D. Agente WhatsApp Business** | Redirigir chat a WhatsApp con agente IA (Evolution API + ElevenLabs) | Variable | Alta |

### Recomendacion: Opcion C (Vercel AI SDK)

Razones:
- Control total sobre la personalidad del agente (system prompt custom)
- El chat vive dentro del sitio, no es un iframe externo
- Demuestra la tecnologia real que vendemos
- La API route puede desplegarse en Vercel (gratis) o Netlify Functions
- Se puede conectar a Claude (Anthropic) o GPT-4o

### Flujo del Agente

```
Visitante entra al sitio
    ↓
Widget de chat aparece (esquina inferior derecha, despues de 3s)
    ↓
Agente saluda: "Hola, soy el agente virtual de Agentes&Robots.
                ¿En que puedo ayudarte? Puedo contarte sobre
                nuestros servicios, agendar una demo o resolver dudas."
    ↓
Conversacion contextual:
    - "¿Que es BB One?" → Descripcion del producto + link a /servicios/bb-one
    - "¿Cuanto cuesta?" → Rango de precios + CTA agendar llamada
    - "Necesito un voice agent" → Recomienda Voice Coworkers + caso de uso
    - "Quiero hablar con alguien" → Ofrecer agendar meeting o WhatsApp
    ↓
CTA al cierre: "¿Te gustaria agendar una llamada de 15 min con nuestro equipo?"
```

### Componentes Necesarios

```
src/
├── components/
│   ├── ChatWidget.tsx        # Widget flotante (boton + ventana)
│   ├── ChatMessage.tsx       # Burbuja de mensaje (user / agent)
│   └── ChatInput.tsx         # Input con send
├── hooks/
│   └── useChat.ts            # Hook para manejar conversacion
└── lib/
    └── chat-api.ts           # Cliente para la API del agente
```

### Requisito: Backend para la API

El sitio es estatico, asi que la API del agente necesita un endpoint. Opciones:

1. **Vercel Serverless Function** (recomendado) — Deploy gratuito, un solo archivo `api/chat.ts`
2. **Netlify Function** — Similar a Vercel
3. **Supabase Edge Function** — Si ya tenemos Supabase en el ecosistema
4. **Hostinger no sirve** — El plan Business es Apache estatico, no corre Node.js

### Personalidad del Agente (System Prompt Draft)

```
Eres el agente virtual de Agentes&Robots, una empresa de infraestructura
de IA y automatizacion empresarial.

Tu objetivo: ayudar al visitante a entender nuestros servicios y guiarlo
hacia una llamada de descubrimiento o demo.

Tono: Profesional pero cercano. Hablas en español. Eres experto en IA
pero no usas jerga innecesaria.

Servicios que conoces:
- BB One: Hardware dedicado para automatizaciones IA locales
- Coworkers Digitales: Agentes de texto en WhatsApp/Telegram
- Voice Coworkers: Agentes telefonicos con IA
- Agent Pentesting: Auditorias de seguridad para agentes IA
- MapYourFlow.app: Plataforma mapeo de procesos
- AI Training: Capacitacion empresarial en herramientas IA

Reglas:
- Siempre ofreces agendar una llamada como siguiente paso
- No inventas precios especificos, das rangos
- Si no sabes algo, ofreces conectar con un humano
- Maximo 3 mensajes antes de ofrecer el CTA de reunion
```

### Metricas a Medir

- Tasa de apertura del widget (% de visitantes que abren el chat)
- Conversaciones iniciadas / visitas totales
- Tasa de conversion a reunion agendada
- Temas mas consultados (para mejorar contenido del sitio)

---

## 2. Animaciones y Dinamismo Visual

### Animaciones de Scroll (Motion)

Mejorar las transiciones al hacer scroll con efectos mas elaborados:

- **Stagger animations**: Elementos aparecen en secuencia (cards, features)
- **Parallax sutil**: Imagenes de fondo se mueven mas lento que el contenido
- **Counter animations**: Numeros de estadisticas cuentan hacia arriba al entrar en viewport
- **Reveal on scroll**: Secciones aparecen con fade-in + slide-up

### Microinteracciones

- **Hover effects** en cards de servicios: glow, scale sutil, border highlight
- **Cursor personalizado**: Efecto trail o spotlight que sigue el mouse
- **Particles/constellation**: Fondo con puntos conectados (sutil, no abrumador)

### Video o GIF en Hero

- Agregar un video loop corto o GIF animado mostrando un agente en accion
- Ejemplo: Screen recording de un Voice Coworker atendiendo una llamada
- O un mockup animado del dashboard de MapYourFlow

---

## 3. Contenido Dinamico (Sin Backend)

### Testimonials / Casos de Exito

- Agregar seccion con testimonios (hardcodeados inicialmente)
- Formato: Card con foto, nombre, empresa, cita
- Animacion: Carousel o masonry con fade

### Blog / Crónicas de Robots

- Crear subdominio `cronicas.agentesyrobots.com` o seccion `/blog`
- Contenido estatico generado con Vite (markdown → HTML)
- Opciones: MDX files, o usar un CMS headless (Sanity, Contentful)
- Inicialmente: 3-5 articulos flagship de valor

### FAQ Interactivo

- Expandir la seccion FAQ actual con mas preguntas
- Agregar busqueda/filtro por tema
- Animacion de expand/collapse mas elaborada

---

## 4. SEO y Presencia

### Schema Markup Adicional

Actualmente tiene JSON-LD basico. Agregar:

- **Organization** schema con datos de la empresa
- **Service** schema por cada servicio
- **FAQPage** schema para rich snippets en Google
- **BreadcrumbList** para navegacion en SERPs

### Open Graph Optimizado

- Imagenes OG personalizadas por pagina (para compartir en redes)
- Se puede generar con `@vercel/og` o `satori` en build time

### Geo (Generative Engine Optimization)

Ya tenemos `robots.txt` permitiendo bots de IA. Siguiente paso:

- Contenido estructurado y citable (listas, definiciones claras)
- FAQ con respuestas concisas que los bots puedan citar
- About page con datos verificables de la empresa

---

## 5. Conversion y Captacion

### Formulario de Contacto Funcional

Actualmente `/contacto` es estatico. Opciones para hacerlo funcional:

| Solucion | Como funciona | Costo |
|----------|---------------|-------|
| **Formspree** | Form action apunta a Formspree, envia email | Gratis (50/mes) |
| **Getform** | Similar a Formspree | Gratis (50/mes) |
| **Resend + API Route** | Email transaccional via Resend API | Gratis (100/dia) |
| **WhatsApp CTA** | Redirigir a WhatsApp con mensaje prellenado | Gratis |

Recomendacion: **WhatsApp CTA + Formspree** como backup. Para el publico B2B en LATAM, WhatsApp es el canal preferido.

### Calendly / Cal.com Integration

- Embed de Calendly para agendar reuniones directamente
- O self-hosted con **Cal.com** (open source)
- Boton "Agendar Demo" prominente en hero y CTA sections

### Lead Magnet

- Descargable: "Guia de Automatizacion con IA para Empresas" (PDF)
- A cambio de email (captura via Formspree → lista de correo)
- O conectar con ConvertKit / Beehiiv para newsletter

---

## 6. Roadmap Sugerido

| Fase | Que | Cuando | Esfuerzo |
|------|-----|--------|----------|
| **Post-deploy** | Formulario contacto (WhatsApp CTA) | Semana 1 | 2 horas |
| **Fase 1** | Animaciones scroll + microinteracciones | Semana 2-3 | 1 dia |
| **Fase 2** | Chat agent IA (Vercel AI SDK) | Semana 3-4 | 2-3 dias |
| **Fase 3** | Testimonials + casos de exito | Semana 4-5 | 1 dia |
| **Fase 4** | Blog/Cronicas + schema markup | Mes 2 | 3-5 dias |
| **Fase 5** | Lead magnet + email capture | Mes 2 | 1 dia |

---

## 7. Notas para Desarrollo

### Restricciones del Stack Actual

- **Sin backend propio**: Todo lo dinamico necesita un servicio externo (Vercel, Supabase, Formspree)
- **SPA routing**: Las animaciones de transicion entre paginas son nativas con React Router + Motion
- **Build estatico**: No hay SSR, SEO depende de meta tags + schema markup (no de contenido renderizado server-side)

### Consideracion: Migrar a Next.js?

Si en algun momento necesitamos:
- SSR para mejor SEO
- API routes nativas (para el chat agent)
- ISR para contenido dinamico sin rebuild completo

La migracion de Vite + React a Next.js es directa (mismo React, mismo Tailwind). Pero por ahora, **el stack actual es suficiente** para las mejoras de Fase 1-3.

---

*Documento de planeacion. Se actualiza conforme se definen prioridades y se ejecutan fases.*
