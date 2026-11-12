import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "¿Cuánto cuesta implementar un agente de IA en mi empresa?",
    a: "Depende de la complejidad. Un Coworker Digital para atención al cliente en WhatsApp arranca desde $15,000 MXN con todo incluido (diseño, implementación, capacitación). Proyectos enterprise como Voice Coworkers con integración CRM van desde $80,000 MXN. El diagnóstico inicial es sin costo.",
  },
  {
    q: "¿Mis datos están seguros con agentes de IA?",
    a: "Sí. BB One opera 100% local — tus datos nunca salen de tu red. Para soluciones cloud, usamos encriptación end-to-end y cumplimos con estándares de protección de datos. Además, nuestro servicio de Agent Pentesting audita la seguridad antes de poner cualquier agente en producción.",
  },
  {
    q: "¿Cuánto tiempo toma ver resultados?",
    a: "Las primeras automatizaciones operativas se despliegan en 4-6 semanas. El diagnóstico (2 semanas) identifica oportunidades de rápido impacto. Clientes como GMB vieron reducción de 60% en tiempo de coordinación desde la primera semana de producción.",
  },
  {
    q: "¿Puedo integrar IA con los sistemas que ya uso?",
    a: "Absolutamente. Nuestros agentes se integran con CRMs (Salesforce, HubSpot), ERPs, bases de datos SQL/NoSQL, APIs REST, WhatsApp Business, telefonía IP, Google Workspace y más. El diagnóstico mapea todos tus sistemas existentes.",
  },
  {
    q: "¿Qué diferencia a Agentes&Robots de otras consultoras de IA?",
    a: "No solo diseñamos — desplegamos y operamos. Tenemos productos propios (BB One, MapYourFlow) y proyectos reales en producción, no solo presentaciones. Nuestro enfoque es infraestructura: sistemas que funcionan 24/7 sin intervención humana.",
  },
  {
    q: "¿Qué pasa si el agente se equivoca?",
    a: "Todo agente incluye guardrails configurables: detección de alucinaciones, escalamiento automático a humanos cuando la confianza es baja, logs completos de cada decisión, y rollback a versiones anteriores. Monitoreamos performance continuamente.",
  },
  {
    q: "¿Necesito contratar personal técnico para mantener los agentes?",
    a: "No. Nuestro modelo incluye monitoreo continuo y soporte. BB One es plug-and-play. Los Coworkers Digitales se actualizan remotamente. Si prefieres autonomía total, capacitamos a tu equipo en la fase de implementación.",
  },
  {
    q: "¿Ofrecen capacitación en IA para mi equipo?",
    a: "Sí, es uno de nuestros 6 productos. AI Training incluye programas para niveles principiante a avanzado, casos prácticos de tu industria, y talleres hands-on con las herramientas que tu equipo usará día a día.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

// La FAQ es sección de la home: su JSON-LD lo consume el <SEO> de HomePage.
// Un <SEO> aquí pisa el título de la home (último Helmet montado gana).
export { faqJsonLd };

function FAQItem({ q, a }: { q: string; a: string; key?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group cursor-pointer"
      >
        <span className="font-medium text-[15px] pr-4 text-paper/90 group-hover:text-yellow transition-colors">
          {q}
        </span>
        <span
          aria-hidden="true"
          className={`flex-shrink-0 inline-block font-mono text-lg leading-none transition-transform duration-200 ${
            open ? "rotate-45 text-yellow" : "text-muted"
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-muted text-sm leading-relaxed pb-6 pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="px-4 py-24 min-[760px]:px-7 min-[760px]:py-28" aria-label="Preguntas frecuentes">
      <div className="mx-auto max-w-3xl">
        <span className="label-telemetry block mb-6 text-muted">
          [ PREGUNTAS FRECUENTES ]
        </span>
        <h2 className="mb-10 font-serif text-5xl font-extrabold uppercase leading-[0.85] tracking-tight min-[760px]:text-7xl">
          PREGUNTAS
          <br />
          <em className="text-orange not-italic">SIN RODEOS.</em>
        </h2>

        <div className="border-t border-line">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
