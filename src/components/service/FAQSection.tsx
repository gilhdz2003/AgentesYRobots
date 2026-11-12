import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ServiceFAQ } from "../../types/catalog";

function FAQAccordion({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-line">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-line">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
          >
            <span className="pr-4 text-[15px] font-medium text-paper/90 transition-colors group-hover:text-yellow">
              {faq.q}
            </span>
            <span
              aria-hidden="true"
              className={`flex-shrink-0 inline-block font-mono text-lg leading-none transition-transform duration-200 ${
                openIndex === i ? "rotate-45 text-yellow" : "text-muted"
              }`}
            >
              +
            </span>
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
                <p className="pb-6 pr-12 text-sm leading-relaxed text-muted">
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
    <section className={`px-4 py-20 min-[760px]:px-7 min-[760px]:py-28 ${alternate ? "hairline-t" : ""}`}>
      <div className="mx-auto max-w-3xl">
        <span className="label-telemetry mb-6 block text-muted">[ FAQ ]</span>
        <h2 className="mb-12 font-serif text-4xl font-extrabold uppercase leading-[0.85] tracking-tight text-paper md:text-5xl">
          {title}
        </h2>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
