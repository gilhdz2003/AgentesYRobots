import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { ServiceFAQ } from "../../types/catalog";

function FAQAccordion({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-white/5">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
          >
            <span className="text-white font-medium text-sm pr-8 group-hover:text-brand-accent transition-colors">
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180 text-brand-accent" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-gray-400 text-sm leading-relaxed pb-6 pr-12">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function FAQSection({
  faqs,
  title,
  alternate,
}: {
  faqs: ServiceFAQ[];
  title: string;
  alternate?: boolean;
}) {
  return (
    <section className={`py-32 px-6 ${alternate ? "bg-slate-900/20" : ""}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-[2px] bg-brand-accent" />
          <span className="label-tech text-brand-accent">FAQ</span>
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight text-white uppercase mb-12">
          {title}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
