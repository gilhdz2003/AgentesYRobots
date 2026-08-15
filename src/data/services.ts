import {
  Cpu,
  Eye,
  MessageSquare,
  Phone,
  ShieldCheck,
  Bot,
  Globe,
  Map,
  GraduationCap,
  Receipt,
  CreditCard,
  BarChart3,
  Calculator,
  Workflow,
} from "lucide-react";
import type {
  Service,
  ServiceFeature,
  ServiceProcessStep,
  ServiceFAQ,
  ServiceUseCase,
  ServiceVariant,
} from "../types/catalog";

// Re-export de compatibilidad: el resto del código sigue importando
// estos tipos desde data/services.
export type {
  Service,
  ServiceFeature,
  ServiceProcessStep,
  ServiceFAQ,
  ServiceUseCase,
  ServiceVariant,
};

export const services: Service[] = [
  {
    slug: "bb-one",
    title: "BB One",
    subtitle: "Bot Box Hardware",
    icon: Cpu,
    shortDescription:
      "Hardware dedicado que ejecuta automatizaciones de IA de forma local y segura con latencia cero. Tu infraestructura privada de inteligencia artificial.",
    longDescription:
      "BB One es un dispositivo de hardware dedicado que ejecuta modelos de IA y automatizaciones directamente en tus instalaciones. Sin dependencia de la nube, sin latencia, sin riesgo de que tus datos salgan de tu red. Piensa en él como tu servidor privado de inteligencia artificial.",
    features: [
      {
        title: "Latencia cero",
        description:
          "Procesamiento 100% local. Sin dependencia de internet para inferencia. Respuestas en milisegundos, no segundos.",
      },
      {
        title: "Seguridad por diseño",
        description:
          "Tus datos nunca salen de tu red. Cumplimiento automático con regulaciones de protección de datos mexicanas e internacionales.",
      },
      {
        title: "Plug-and-play",
        description:
          "Conecta, configura y opera. Sin instalaciones complejas, sin dependencia de equipo técnico interno.",
      },
      {
        title: "Actualizaciones remotas",
        description:
          "Modelos y automatizaciones se actualizan de forma remota sin interrumpir la operación.",
      },
      {
        title: "Monitoreo 24/7",
        description:
          "Dashboard en tiempo real con métricas de rendimiento, uso y salud del sistema.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Diagnóstico de infraestructura",
        description:
          "Evaluamos tu red, sistemas existentes y necesidades de procesamiento para dimensionar el hardware adecuado.",
      },
      {
        step: 2,
        title: "Configuración y despliegue",
        description:
          "Instalamos BB One en tus instalaciones, configuramos los modelos de IA y conectamos con tus sistemas.",
      },
      {
        step: 3,
        title: "Capacitación y handoff",
        description:
          "Tu equipo aprende a operar el sistema. Entregamos documentación y acceso al dashboard de monitoreo.",
      },
      {
        step: 4,
        title: "Soporte continuo",
        description:
          "Monitoreo remoto, actualizaciones de modelos y soporte técnico incluido.",
      },
    ],
    useCase: {
      title: "Despacho de ajustes de siniestros",
      description:
        "GMB Ajustes necesitaba procesar 500+ documentos diarios sin enviar datos sensibles a la nube. BB One procesa OCR, clasificación y extracción de datos localmente.",
      metrics: [
        "500+ documentos/día procesados localmente",
        "0 datos enviados a servicios externos",
        "3x más rápido que el proceso manual",
      ],
    },
    faq: [
      {
        q: "¿Qué modelos de IA puede ejecutar BB One?",
        a: "BB One soporta modelos LLM locales (Llama, Mistral, Phi), modelos de visión para OCR y clasificación, y modelos de voz para transcripción. La selección depende del hardware dimensionado para tu caso.",
      },
      {
        q: "¿Necesito conexión a internet?",
        a: "Solo para actualizaciones remotas y monitoreo. La inferencia y procesamiento funcionan 100% offline. Si se cae tu internet, BB One sigue operando.",
      },
      {
        q: "¿Cuánto espacio físico ocupa?",
        a: "El dispositivo base tiene el tamaño de un mini-PC. Se instala en tu rack de servidores o en cualquier superficie plana con conexión eléctrica y de red.",
      },
      {
        q: "¿Qué pasa si el hardware falla?",
        a: "Incluimos respaldo automático de configuración y modelos. Si el hardware necesita reemplazo, desplegamos uno nuevo con tu configuración restaurada en menos de 24 horas.",
      },
    ],
    pricing: {
      model: "modular",
      sectionTitle: "Inversión en Automatización",
      sectionSubtitle:
        "Un Hub en tu oficina + empleados virtuales según la complejidad de tus procesos.",
      hubPrice: { min: 1500, max: 1500, suffix: "/mes" },
      hubDescription:
        "El servidor local donde viven y trabajan tus empleados virtuales administrativos.",
      implementationTiers: [
        {
          tierName: "Básica",
          tierSlug: "basica",
          description: "1 sistema, flujo corto, pocas reglas.",
          setupPrice: {
            min: 5000,
            max: 8000,
            suffix: " (único)",
          },
          features: [
            { text: "Descarga de reportes y envío por correo", included: true },
            { text: "Carga de archivos a portales", included: true },
            { text: "Tareas simples sin excepciones", included: true },
            { text: "Baja frecuencia de ejecución", included: true },
          ],
        },
        {
          tierName: "Intermedia",
          tierSlug: "intermedia",
          description: "2-3 sistemas, facturación o cobranza.",
          setupPrice: {
            min: 12000,
            max: 20000,
            suffix: " (único)",
          },
          features: [
            {
              text: "Generación de CFDI y envío por correo",
              included: true,
            },
            { text: "Recordatorios de pago y cobranza", included: true },
            { text: "Consolidación de reportes multi-sistema", included: true },
            {
              text: "Reglas de negocio con validaciones",
              included: true,
            },
            { text: "Reintentos automáticos y logs", included: true },
          ],
          highlight: true,
        },
        {
          tierName: "Avanzada",
          tierSlug: "avanzada",
          description: "3+ sistemas, conciliación, flujos complejos.",
          setupPrice: {
            min: 25000,
            max: 45000,
            suffix: " (único)",
            openEnded: true,
          },
          features: [
            {
              text: "Conciliación bancaria/contable multi-fuente",
              included: true,
            },
            { text: "Cobranza integral multicanal", included: true },
            {
              text: "Flujos completos de punta a punta",
              included: true,
            },
            {
              text: "Manejo de errores y alertas en tiempo real",
              included: true,
            },
            { text: "Reportes de KPIs y monitoreo crítico", included: true },
          ],
        },
      ],
      rentTiers: [
        {
          tierName: "Nivel 1",
          tierSlug: "renta-basica",
          description: "Monitoreo básico, 1 ajuste menor/mes.",
          monthlyPrice: { min: 700, max: 1000, suffix: "/mes" },
          features: [
            { text: "Monitoreo de disponibilidad", included: true },
            { text: "1 ajuste menor mensual", included: true },
            { text: "Alertas por fallas", included: true },
          ],
        },
        {
          tierName: "Nivel 2",
          tierSlug: "renta-intermedia",
          description: "Alertas, 2-3 ajustes, revisión trimestral.",
          monthlyPrice: { min: 1500, max: 2500, suffix: "/mes" },
          features: [
            { text: "Monitoreo y alertas proactivas", included: true },
            { text: "2-3 ajustes menores mensuales", included: true },
            { text: "Revisión trimestral del flujo", included: true },
            { text: "Notificación de anomalías", included: true },
          ],
          highlight: true,
        },
        {
          tierName: "Nivel 3",
          tierSlug: "renta-avanzada",
          description: "Prioridad, bolsa de horas, revisión mensual.",
          monthlyPrice: {
            min: 3000,
            max: 5000,
            suffix: "/mes",
            openEnded: true,
          },
          features: [
            {
              text: "Monitoreo priorizado casi en tiempo real",
              included: true,
            },
            { text: "Bolsa de 2-4 horas de soporte/mes", included: true },
            { text: "Revisión mensual de desempeño", included: true },
            { text: "Propuestas de optimización continua", included: true },
          ],
        },
      ],
      roles: [
        {
          name: "Facturación",
          icon: Receipt,
          description: "Genera CFDI, timbra y envía facturas automáticamente.",
          exampleTasks: [
            "Facturación masiva desde datos del ERP",
            "Envío automático por correo al cliente",
            "Validación de datos antes de timbrar",
          ],
        },
        {
          name: "Cobranza",
          icon: CreditCard,
          description:
            "Recordatorios de pago, estados de cuenta y enlaces de pago.",
          exampleTasks: [
            "Envío de recordatorios por vencimiento",
            "Generación de estados de cuenta",
            "Seguimiento automatizado de pagos",
          ],
        },
        {
          name: "Reportes",
          icon: BarChart3,
          description:
            "Descarga, consolida y envía reportes de tus sistemas.",
          exampleTasks: [
            "Consolidación diaria de múltiples fuentes",
            "Envío de resúmenes por correo",
            "Generación de dashboards periódicos",
          ],
        },
        {
          name: "Contable",
          icon: Calculator,
          description:
            "Conciliaciones, cruces y validaciones contables automáticas.",
          exampleTasks: [
            "Conciliación bancaria automática",
            "Cruces entre bancos y sistema contable",
            "Validaciones previas al cierre mensual",
          ],
        },
      ],
      pricingFaq: [
        {
          q: "¿El precio del Hub incluye el hardware?",
          a: "El Hub es el servicio de software y monitoreo que corre en un mini-PC. El costo del hardware físico se cotiza por separado según los requerimientos de procesamiento de tu caso.",
        },
        {
          q: "¿Puedo tener un solo empleado virtual?",
          a: "Sí. Puedes empezar con un solo bot de backoffice y agregar más conforme lo necesites. Cada uno tiene su propio costo de implementación y renta mensual.",
        },
        {
          q: "¿Qué pasa si mi proceso crece en complejidad?",
          a: "Si un bot básico necesita manejar más sistemas o reglas, evaluamos la migración al siguiente nivel. Solo pagas la diferencia de implementación.",
        },
      ],
    },
  },
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
      {
        step: 1,
        title: "Mapeo de conversaciones",
        description:
          "Identificamos los flujos de conversación más frecuentes en tu operación actual para diseñar el agente.",
      },
      {
        step: 2,
        title: "Diseño y entrenamiento",
        description:
          "Configuramos la personalidad, el conocimiento base y las integraciones con tus sistemas.",
      },
      {
        step: 3,
        title: "Piloto controlado",
        description:
          "Desplegamos con un grupo piloto de usuarios. Monitoreamos y ajustamos antes del lanzamiento completo.",
      },
    ],
    variants: [
      {
        slug: "chat-agents",
        name: "Chat Agents",
        tagline: "Atención conversacional en WhatsApp, Telegram y web",
        icon: MessageSquare,
        description:
          "Agentes de texto que atienden clientes y equipos en los canales que ya usan. Comprenden lenguaje natural, manejan contexto de conversaciones largas y ejecutan flujos de múltiples pasos: cotizar, confirmar, agendar, notificar.",
        features: [
          {
            title: "WhatsApp Business nativo",
            description:
              "Integración directa con WhatsApp Business API. Tus clientes interactúan sin instalar nada nuevo.",
          },
          {
            title: "Comprensión de contexto",
            description:
              "El agente recuerda historial de conversaciones, conoce tus productos y entiende la jerga de tu industria.",
          },
          {
            title: "Acciones reales",
            description:
              "No solo responde preguntas: consulta inventarios, genera cotizaciones, agenda citas, crea tickets en tu CRM.",
          },
          {
            title: "Escalamiento a humanos",
            description:
              "Cuando el agente detecta que no puede resolver algo, escala automáticamente a un operador humano con todo el contexto.",
          },
          {
            title: "Multi-canal",
            description:
              "Mismo agente, múltiples canales. WhatsApp, Telegram, web chat y APIs internas con una sola configuración.",
          },
          {
            title: "Analytics integrado",
            description:
              "Dashboard con métricas de conversaciones, satisfacción, resoluciones y tiempos de respuesta.",
          },
        ],
        useCase: {
          title: "Coordinación de inspectores de siniestros",
          description:
            "GMB Ajustes manejaba la asignación de citas de inspectores por llamadas y WhatsApp manual. Un Coworker Digital ahora gestiona automáticamente la asignación, confirmación y seguimiento.",
          metrics: [
            "60% reducción en tiempo de coordinación",
            "29,000+ registros procesados",
            "Disponible 24/7 sin intervención humana",
          ],
        },
        faq: [
          {
            q: "¿Pueden los Coworkers manejar conversaciones complejas?",
            a: "Sí. No son chatbots de menú. Comprenden lenguaje natural, manejan contexto de conversaciones largas y pueden ejecutar flujos de múltiples pasos (cotizar, confirmar, agendar, notificar).",
          },
          {
            q: "¿Cuánto toma implementar un Coworker Digital?",
            a: "El piloto funcional se despliega en 2-3 semanas. La fase de producción completa con todas las integraciones toma 4-6 semanas.",
          },
          {
            q: "¿Puedo tener más de un Coworker?",
            a: "Sí. Puedes tener agentes especializados: uno para atención al cliente, otro para operaciones internos, otro para soporte técnico. Cada uno con su propia personalidad y conocimiento.",
          },
        ],
        pricing: {
          model: "tiered",
          sectionTitle: "Planes de Coworkers Digitales",
          sectionSubtitle:
            "Desde atención básica hasta operación omnicanal completa. Todos incluyen diagnóstico sin costo.",
          plans: [
            {
              tierName: "Starter",
              tierSlug: "starter",
              description: "Para negocios pequeños que quieren dejar de perder mensajes.",
              setupPrice: { min: 4000, max: 7000, suffix: " (único)" },
              monthlyPrice: { min: 1200, max: 2000, suffix: "/mes" },
              features: [
                { text: "1 canal (WhatsApp o web)", included: true },
                { text: "Respuestas a preguntas frecuentes", included: true },
                { text: "Captura de datos de contacto", included: true },
                { text: "Hasta 1,000 conversaciones IA/mes", included: true },
                { text: "Flujos guiados con árboles de decisión", included: true },
                { text: "Integración CRM avanzada", included: false },
                { text: "Reportes mensuales", included: false },
              ],
              addOns: ["Solo atención al cliente"],
            },
            {
              tierName: "Growth",
              tierSlug: "growth",
              description:
                "Para clínicas, gimnasios, escuelas e inmobiliarias con flujo constante.",
              setupPrice: { min: 8000, max: 15000, suffix: " (único)" },
              monthlyPrice: { min: 2500, max: 4500, suffix: "/mes" },
              highlight: true,
              features: [
                { text: "2 canales (WhatsApp + web)", included: true },
                { text: "IA para respuestas abiertas", included: true },
                { text: "Agenda de citas y recordatorios", included: true },
                { text: "Hasta 4,000 conversaciones IA/mes", included: true },
                { text: "Integración con Google Calendar/CRM ligero", included: true },
                { text: "Reporte mensual simple", included: true },
                { text: "4+ canales omnicanal", included: false },
              ],
              addOns: [
                "+1 Empleado Virtual Administrativo a elegir:",
                "• Facturación básica",
                "• Recordatorios de pago",
                "• Envío de notificaciones automáticas",
              ],
            },
            {
              tierName: "Pro Omnicanal",
              tierSlug: "pro",
              description:
                "Para empresas con volúmenes importantes y múltiples sistemas.",
              setupPrice: { min: 18000, max: 35000, suffix: " (único)" },
              monthlyPrice: { min: 6000, max: 10000, suffix: "/mes" },
              features: [
                { text: "3-4 canales (WhatsApp, web, Facebook, Instagram)", included: true },
                { text: "Integración CRM/ERP (HubSpot, Zoho, etc.)", included: true },
                { text: "Flujo completo desde contacto hasta venta", included: true },
                { text: "Hasta 10,000-15,000 conversaciones IA/mes", included: true },
                { text: "Reportes avanzados con KPIs", included: true },
                { text: "Modelos IA avanzados para tareas complejas", included: true },
                { text: "Soporte prioritario", included: true },
              ],
              addOns: [
                "+2-3 Empleados Virtuales Administrativos:",
                "• Facturación + cobranza",
                "• Reportes/consolidación contable",
              ],
            },
          ],
          pricingFaq: [
            {
              q: "¿Qué pasa si supero el límite de conversaciones?",
              a: "Si superas el límite de tu plan de forma recurrente (2+ meses consecutivos), aplicamos un cargo adicional por bloque extra de conversaciones o te recomendamos migrar al plan superior. Sin sorpresas.",
            },
            {
              q: "¿El setup incluye todo?",
              a: "El setup cubre diseño de flujos, personalización, conexión a canales y rondas de ajustes. Si necesitas integraciones adicionales no contempladas inicialmente, se cotizan por separado.",
            },
            {
              q: "¿Puedo cambiar de plan?",
              a: "Sí. Puedes escalar de Starter a Growth o de Growth a Pro en cualquier momento. Solo pagas la diferencia proporcional del setup.",
            },
          ],
        },
      },
      {
        slug: "voice-agents",
        name: "Voice Agents",
        tagline: "Atención telefónica con voz natural",
        icon: Phone,
        description:
          "Agentes de voz que atienden llamadas con voces en español neutro que no suenan robóticas, integrados a tu telefonía IP y CRM. Capturan, verifican, transfieren y escalan cada llamada de forma inteligente.",
        features: [
          {
            title: "Voz natural ultra-realista",
            description:
              "Voces en español neutro y latino que no suenan robóticas. Latencia de respuesta menor a 1 segundo.",
          },
          {
            title: "Telefonía IP integrada",
            description:
              "Compatible con FreeSWITCH, Twilio, Vonage y cualquier sistema SIP estándar.",
          },
          {
            title: "CRM bidireccional",
            description:
              "Consulta y actualiza información en Salesforce, HubSpot y cualquier CRM durante la llamada en tiempo real.",
          },
          {
            title: "Transcripción en vivo",
            description:
              "Cada llamada se transcribe automáticamente para análisis, calidad y cumplimiento.",
          },
          {
            title: "Flujos conversacionales",
            description:
              "Maneja llamadas de ventas, soporte, encuestas y seguimiento con flujos personalizados por tipo.",
          },
        ],
        useCase: {
          title: "Centro de atención de seguros",
          description:
            "Una aseguradora recibía 200+ llamadas diarias de reporte de siniestros. Voice Coworker captura datos del reporte, verifica póliza y asigna ajustador automáticamente.",
          metrics: [
            "200+ llamadas/día atendidas automáticamente",
            "70% de llamadas resueltas sin intervención humana",
            "45 segundos promedio de ahorro por llamada",
          ],
        },
        faq: [
          {
            q: "¿La voz suena robótica?",
            a: "No. Usamos modelos de síntesis de voz de última generación con voces en español neutro. La mayoría de los callers no distinguen que están hablando con una IA.",
          },
          {
            q: "¿Funciona con mi central telefónica actual?",
            a: "Probablemente sí. Voice Agents es compatible con cualquier sistema que soporte SIP (FreeSWITCH, Asterisk, 3CX, Twilio, Vonage, etc.). Hacemos la auditoría antes de empezar.",
          },
          {
            q: "¿Qué pasa si la llamada es muy compleja?",
            a: "El agente detecta cuando una llamada supera su capacidad y transfiere a un agente humano con todo el contexto de la conversación. Sin que el caller tenga que repetir información.",
          },
        ],
        pricing: {
          model: "tiered",
          sectionTitle: "Planes de Voice Agents",
          sectionSubtitle:
            "Desde atención básica por teléfono hasta operación completa con CRM integrado.",
          plans: [
            {
              tierName: "Starter",
              tierSlug: "starter",
              description:
                "Para negocios que reciben llamadas frecuentes y necesitan filtrar y atender las más comunes.",
              setupPrice: { min: 8000, max: 15000, suffix: " (único)" },
              monthlyPrice: { min: 2500, max: 4000, suffix: "/mes" },
              features: [
                { text: "1 línea telefónica", included: true },
                { text: "Flujos de atención básica (FAQ, horarios, citas)", included: true },
                { text: "Transcripción automática de llamadas", included: true },
                { text: "Hasta 500 minutos/mes", included: true },
                { text: "Escalamiento a humano con contexto", included: true },
                { text: "Integración CRM bidireccional", included: false },
                { text: "Reportes avanzados", included: false },
              ],
              addOns: ["Solo atención telefónica"],
            },
            {
              tierName: "Growth",
              tierSlug: "growth",
              description:
                "Para centros de contacto con volumen medio que necesitan CRM y seguimiento.",
              setupPrice: { min: 15000, max: 25000, suffix: " (único)" },
              monthlyPrice: { min: 5000, max: 8000, suffix: "/mes" },
              highlight: true,
              features: [
                { text: "2-3 líneas telefónicas", included: true },
                { text: "Flujos de ventas, soporte y seguimiento", included: true },
                { text: "Integración CRM (HubSpot, Salesforce)", included: true },
                { text: "Hasta 2,000 minutos/mes", included: true },
                { text: "Transcripción + análisis de sentimiento", included: true },
                { text: "Reporte mensual de KPIs", included: true },
                { text: "Multi-idioma", included: false },
              ],
              addOns: [
                "+1 Empleado Virtual Administrativo:",
                "• Transcripción y clasificación automática",
                "• Seguimiento post-llamada por correo",
              ],
            },
            {
              tierName: "Pro",
              tierSlug: "pro",
              description:
                "Para operaciones de alto volumen con telefonía compleja y múltiples integraciones.",
              setupPrice: { min: 30000, max: 50000, suffix: " (único)" },
              monthlyPrice: { min: 10000, max: 18000, suffix: "/mes" },
              features: [
                { text: "Líneas ilimitadas según PBX", included: true },
                { text: "Flujos personalizados por tipo de llamada", included: true },
                { text: "CRM bidireccional + APIs internas", included: true },
                { text: "Hasta 10,000 minutos/mes", included: true },
                { text: "Dashboards en tiempo real", included: true },
                { text: "Análisis de calidad y compliance", included: true },
                { text: "Soporte prioritario 24/7", included: true },
              ],
              addOns: [
                "+2-3 Empleados Virtuales Administrativos:",
                "• Reportes automáticos de operación",
                "• Conciliación de datos de llamadas vs CRM",
              ],
            },
          ],
          pricingFaq: [
            {
              q: "¿Los minutos son por línea o totales?",
              a: "Son minutos totales consumidos por todas las líneas del plan. Si necesitas más minutos, se agregan por bloque con costo proporcional.",
            },
            {
              q: "¿La integración con mi PBX tiene costo extra?",
              a: "La integración con SIP estándar (FreeSWITCH, Asterisk, 3CX) está incluida en el setup. Si tu sistema requiere desarrollo personalizado, se cotiza por separado.",
            },
            {
              q: "¿Qué proveedor de telefonía usan?",
              a: "Trabajamos con tu proveedor actual si soporta SIP. También podemos configurar con Twilio, Vonage u otros según la región y cobertura que necesites.",
            },
          ],
        },
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
        features: [
          {
            title: "60+ patrones de ataque",
            description:
              "Suite completa de pruebas que cubre inyección de prompts, jailbreaking, extracción de datos y manipulación de contexto.",
          },
          {
            title: "7 categorías de vulnerabilidad",
            description:
              "Inyección directa, indirecta, role-playing, encoding, multi-turno, lateral y de infraestructura.",
          },
          {
            title: "Reportes ejecutivos y técnicos",
            description:
              "Dos niveles de reporte: uno ejecutivo con riesgo y recomendaciones, otro técnico con payloads y reproducción exacta.",
          },
          {
            title: "Re-tests incluidos",
            description:
              "Después de cada remediación, verificamos que las vulnerabilidades estén efectivamente cerradas.",
          },
          {
            title: "Compliance-ready",
            description:
              "Alineado con OWASP Top 10 para LLMs y mejores prácticas de seguridad de la industria.",
          },
        ],
        useCase: {
          title: "Agente de atención al cliente en producción",
          description:
            "Una empresa de fintech tenía un agente de IA atendiendo consultas de saldo y movimientos. Nuestra auditoría encontró que podía ser manipulado para revelar datos de otros usuarios.",
          metrics: [
            "12 vulnerabilidades encontradas",
            "3 críticas de filtración de datos",
            "0 incidentes post-remediación",
          ],
        },
        faq: [
          {
            q: "¿Necesito tener un agente de IA para contratar este servicio?",
            a: "Sí. El pentesting evalúa agentes existentes. Si estás planeando construir uno, te recomendamos hacerlo como parte del proceso de despliegue.",
          },
          {
            q: "¿Cuánto toma una auditoría completa?",
            a: "Depende de la complejidad del agente. Un agente simple (chatbot) toma 3-5 días. Un sistema multi-agente con integraciones puede tomar 2-3 semanas.",
          },
          {
            q: "¿El pentesting puede afectar mi operación?",
            a: "No. Ejecutamos en ambiente de staging o con controles que no afectan usuarios reales. Nunca probamos con datos de producción reales.",
          },
        ],
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
  {
    slug: "mapyourflow",
    title: "MapYourFlow",
    subtitle: "Mapeo de Procesos con IA",
    icon: Map,
    shortDescription:
      "Plataforma para visualizar, simular y optimizar las interacciones y decisiones de tus agentes automatizados con scoring de automatización.",
    longDescription:
      "MapYourFlow es nuestra plataforma SaaS que te permite diagnosticar qué tan automatizable es cada proceso de tu empresa. Con un scoring de 0-100 y entrevistas guiadas por IA, identificas exactamente dónde invertir en automatización y cuáles procesos son mejor dejarlos humanos.",
    features: [
      {
        title: "Scoring de automatización (SAI)",
        description:
          "Cada proceso recibe un score de 0-100 que indica su potencial de automatización. Datos, no opiniones.",
      },
      {
        title: "Entrevistas guiadas por IA",
        description:
          "Motor de entrevistas que extrae información operativa de tu equipo de forma estructurada y eficiente.",
      },
      {
        title: "Visualización de procesos",
        description:
          "Diagramas generados automáticamente que muestran el flujo actual, cuellos de botella y oportunidades.",
      },
      {
        title: "Roadmap priorizado",
        description:
          "Listado de procesos ordenados por impacto y factibilidad de automatización con estimaciones de ROI.",
      },
      {
        title: "Multi-equipo",
        description:
          "Cada departamento mapea sus procesos independientemente con vista consolidada para dirección.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Crear organización",
        description:
          "Configuras tu empresa, departamentos y equipo. La plataforma se adapta a tu estructura.",
      },
      {
        step: 2,
        title: "Entrevistas de diagnóstico",
        description:
          "Tu equipo responde entrevistas guiadas por IA sobre sus procesos. Sin necesidad de consultores presenciales.",
      },
      {
        step: 3,
        title: "Análisis y scoring",
        description:
          "MapYourFlow calcula el SAI de cada proceso y genera el roadmap priorizado.",
      },
    ],
    useCase: {
      title: "Diagnóstico de automatización empresarial",
      description:
        "SONARA (compañía de logística) usó MapYourFlow para diagnosticar sus procesos. Obtuvo un score global de 76/100 con 8 procesos críticos identificados para automatización inmediata.",
      metrics: [
        "76/100 score global de automatización",
        "8 procesos críticos identificados",
        "ROI estimado de 3.2x en primer año",
      ],
    },
    faq: [
      {
        q: "¿Es MapYourFlow solo para empresas grandes?",
        a: "No. Funciona para cualquier empresa que quiera entender qué automatizar. Desde 5 hasta 500+ empleados. El diagnóstico escala con tu tamaño.",
      },
      {
        q: "¿Cuánto toma un diagnóstico completo?",
        a: "Un departamento típico completa sus entrevistas en 1-2 semanas. El diagnóstico completo de una empresa mediana toma 3-4 semanas.",
      },
      {
        q: "¿Necesito equipo técnico para usarlo?",
        a: "Cero. La plataforma está diseñada para perfiles operativos. Las entrevistas son conversacionales y los resultados se presentan de forma visual e intuitiva.",
      },
    ],
  },
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
        "Del diagnóstico puntual a la mejora continua. Si continúas a Implementación, el Diagnóstico se descuenta completo de tu paquete.",
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
  {
    slug: "ai-training",
    title: "AI Training",
    subtitle: "Capacitación Empresarial",
    icon: GraduationCap,
    shortDescription:
      "Capacitación especializada para equipos. Enseñamos a integrar y colaborar eficientemente con herramientas de IA para elevar la productividad.",
    longDescription:
      "AI Training es nuestro programa de capacitación empresarial en herramientas de IA. No es un curso genérico: diseñamos programas personalizados con casos prácticos de tu industria, tu equipo y tus herramientas. Desde principiantes hasta power users.",
    features: [
      {
        title: "3 niveles de profundidad",
        description:
          "Principiante (fundamentos), Intermedio (herramientas y flujos) y Avanzado (automatización y agentes). Tu equipo avanza a su ritmo.",
      },
      {
        title: "Casos prácticos de tu industria",
        description:
          "No ejercicios genéricos. Usamos escenarios reales de tu negocio para que el aprendizaje sea inmediatamente aplicable.",
      },
      {
        title: "Herramientas que usarás",
        description:
          "Capacitamos en ChatGPT, Claude, Copilot, n8n, Make y las herramientas específicas que tu equipo necesita.",
      },
      {
        title: "Talleres hands-on",
        description:
          "Sesiones prácticas donde tu equipo construye automatizaciones reales durante la capacitación.",
      },
      {
        title: "Seguimiento post-training",
        description:
          "Evaluación de adopción y soporte durante las primeras semanas para asegurar que el aprendizaje se convierta en hábito.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Diagnóstico de necesidades",
        description:
          "Evaluamos el nivel actual del equipo, herramientas en uso y objetivos de productividad.",
      },
      {
        step: 2,
        title: "Programa personalizado",
        description:
          "Diseñamos el temario, casos prácticos y ejercicios específicos para tu equipo y tu industria.",
      },
      {
        step: 3,
        title: "Sesiones de capacitación",
        description:
          "Impartimos las sesiones (presencial u online) con contenido práctico y ejercicios hands-on.",
      },
      {
        step: 4,
        title: "Seguimiento y medición",
        description:
          "Evaluamos adopción, resolvemos dudas y medimos el impacto en productividad real.",
      },
    ],
    useCase: {
      title: "Capacitación de equipo de operaciones",
      description:
        "GMB capacitó a su equipo de operaciones en herramientas de IA para procesamiento de documentos y reportes automatizados. El equipo pasó de procesos manuales a flujos semi-automatizados en 3 semanas.",
      metrics: [
        "15 personas capacitadas en 3 niveles",
        "40% reducción en tareas repetitivas",
        "100% de adopción de herramientas en 30 días",
      ],
    },
    faq: [
      {
        q: "¿Las capacitaciones son presenciales u online?",
        a: "Ambas. Ofrecemos sesiones presenciales en tu oficina (CDMX y área metropolitana) y sesiones online para equipos distribuidos. También tenemos formato híbrido.",
      },
      {
        q: "¿Cuánto dura el programa completo?",
        a: "El programa básico (nivel principiante) son 4 sesiones de 2 horas. El programa completo (3 niveles) son 12 sesiones distribuidas en 4-6 semanas.",
      },
      {
        q: "¿Necesito experiencia previa en IA?",
        a: "No. El nivel principiante arranca desde cero: qué es la IA, cómo funciona, cómo interactuar con ella. Solo necesitas saber usar una computadora.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
