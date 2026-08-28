/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Process from "./components/Process";
import Stats from "./components/Stats";
import SocialProof from "./components/SocialProof";
import FAQ, { faqJsonLd } from "./components/FAQ";
import CTA from "./components/CTA";
import PortfolioSection from "./components/PortfolioSection";
import Footer from "./components/Footer";
import SEO, { websiteSchema } from "./components/SEO";
import ScrollToTop from "./components/ScrollToTop";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";

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
      <SEO jsonLd={[ORG_JSON_LD, websiteSchema(), faqJsonLd]} />
      <Hero />
      <Solutions />
      <Process />
      <Stats />
      <SocialProof />
      <PortfolioSection />
      <FAQ />
      <CTA />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/servicios/:slug" element={<ServicePage />} />
                <Route path="/nosotros" element={<AboutPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/casos" element={<CaseStudiesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  );
}
