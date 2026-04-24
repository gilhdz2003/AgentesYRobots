/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="min-h-screen selection:bg-brand-cyan/30">
      <Navbar />
      <Hero />
      <Solutions />
      <CTA />
      <Footer />
    </main>
  );
}
