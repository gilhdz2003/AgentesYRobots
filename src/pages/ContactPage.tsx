import { motion } from "motion/react";
import { MessageCircle, Mail, Linkedin, ArrowRight } from "lucide-react";
import SEO, { breadcrumbSchema } from "../components/SEO";
import { services } from "../data/services";

const WA_NUMBER = "525512345678";

const serviceOptions = services.map((s) => ({
  label: s.title,
  slug: s.slug,
}));

function waLink(serviceSlug?: string) {
  const selected = serviceOptions.find((s) => s.slug === serviceSlug);
  const serviceText = selected
    ? `Me interesa conocer más sobre ${selected.label}`
    : "Me interesa conocer más sobre sus servicios de IA";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(serviceText)}`;
}

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contacto"
        description="Contacta a Agentes&Robots. Diagnóstico inicial sin costo. Respuesta en menos de 24 horas."
        canonical="/contacto"
        jsonLd={[
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Contacto", url: "/contacto" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-brand-accent" />
              <span className="label-tech text-brand-accent">CONTACTO</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-white uppercase mb-8 max-w-4xl">
              Hablemos de tu<br />
              <span className="text-brand-accent">operación</span>
            </h1>

            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-2xl">
              El diagnóstico inicial es sin costo. Cuéntanos qué procesos te
              gustaría automatizar y en 2 semanas te presentamos un plan
              concreto con ROI estimado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Main CTA */}
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight text-white uppercase mb-8">
                Elige cómo empezar
              </h2>

              <div className="space-y-4">
                {serviceOptions.map((service) => (
                  <motion.a
                    key={service.slug}
                    href={waLink(service.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-6 rounded-xl enterprise-border bg-slate-900/40 hover:bg-slate-900/60 hover:border-brand-accent/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <MessageCircle
                        size={20}
                        className="text-brand-accent"
                      />
                      <span className="text-white font-medium">
                        {service.label}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-gray-500 group-hover:text-brand-accent transition-colors"
                    />
                  </motion.a>
                ))}

                {/* General inquiry */}
                <motion.a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-6 rounded-xl bg-brand-accent/10 border border-brand-accent/30 hover:border-brand-accent/60 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <MessageCircle size={20} className="text-brand-accent" />
                    <span className="text-white font-bold">
                      Consulta general
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-brand-accent"
                  />
                </motion.a>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl enterprise-border bg-slate-900/40">
                <h3 className="text-white font-bold text-lg mb-4">
                  ¿Qué esperar?
                </h3>
                <ol className="space-y-4 text-gray-400 text-sm leading-relaxed">
                  <li className="flex gap-4">
                    <span className="text-brand-accent font-bold flex-shrink-0">
                      01
                    </span>
                    <span>
                      Escribes por WhatsApp. Respondemos en menos de 24 horas.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-accent font-bold flex-shrink-0">
                      02
                    </span>
                    <span>
                      Agendamos una llamada de 30 minutos para entender tu
                      operación.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-brand-accent font-bold flex-shrink-0">
                      03
                    </span>
                    <span>
                      En 2 semanas recibes el diagnóstico con oportunidades
                      priorizadas y ROI estimado.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="p-8 rounded-2xl enterprise-border bg-slate-900/40">
                <h3 className="text-white font-bold text-lg mb-6">
                  Otros canales
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hola@agentesyrobots.com"
                    className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail size={18} className="text-brand-accent" />
                    <span className="text-sm">hola@agentesyrobots.com</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/agentesyrobots"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin size={18} className="text-brand-accent" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
