import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const productLinks = [
  { label: "MAPYOURFLOW", href: "/servicios/mapyourflow" },
  { label: "BB ONE", href: "/servicios/bb-one" },
  { label: "COWORKERS", href: "/servicios/coworkers-digitales" },
  { label: "VOICE", href: "/servicios/voice-coworkers" },
  { label: "PENTESTING", href: "/servicios/agent-pentesting" },
  { label: "TRAINING", href: "/servicios/ai-training" },
];

const navLinks = [
  { label: "NOSOTROS", href: "/nosotros" },
  { label: "CONTACTO", href: "/contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <span className="font-display text-2xl font-black tracking-tighter text-white">
            AGENTES<span className="text-brand-accent tracking-normal">&</span>ROBOTS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {productLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-[11px] font-bold tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <div className="w-[1px] h-4 bg-white/10 mx-2" />

          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-[11px] font-bold tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <Link to="/contacto">
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="inline-block px-6 py-2.5 bg-brand-accent text-brand-bg font-bold text-[12px] rounded-md tracking-wider shadow-lg shadow-brand-accent/20 cursor-pointer"
            >
              COMENZAR
            </motion.span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-white/5 px-6 py-8 flex flex-col gap-4 bg-brand-bg/95 backdrop-blur-md"
        >
          {productLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="font-display text-sm font-semibold tracking-widest text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="h-[1px] bg-white/5 my-2" />

          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="font-display text-sm font-semibold tracking-widest text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/contacto"
            className="bg-brand-accent text-brand-bg font-display text-xs font-bold px-6 py-3 rounded-md tracking-widest text-center mt-2"
            onClick={() => setIsOpen(false)}
          >
            COMENZAR
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
