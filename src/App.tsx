/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Process from "./components/Process";
import Stats from "./components/Stats";
import SocialProof from "./components/SocialProof";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import SEO from "./components/SEO";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agentes&Robots",
  url: "https://agentesyrobots.com",
  description:
    "Infraestructura de IA empresarial. Diseñamos y desplegamos soluciones de automatización con inteligencia artificial.",
  sameAs: [
    "https://linkedin.com/company/agentesyrobots",
    "https://github.com/agentesyrobots",
  ],
};

function HomePage() {
  return (
    <>
      <SEO jsonLd={ORG_JSON_LD} />
      <Hero />
      <Solutions />
      <Process />
      <Stats />
      <SocialProof />
      <FAQ />
      <CTA />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen selection:bg-brand-cyan/30 flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
