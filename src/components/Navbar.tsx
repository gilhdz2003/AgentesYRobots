import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1"
        >
          <span className="font-display text-2xl font-black tracking-tighter text-white">
            AGENTES<span className="text-brand-accent tracking-normal">&</span>ROBOTS
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {["MAPYOURFLOW", "BB ONE", "COWORKERS", "VOICE", "PENTESTING", "TRAINING"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[12px] font-bold tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-6 py-2.5 bg-brand-accent text-brand-bg font-bold text-[12px] rounded-md tracking-wider shadow-lg shadow-brand-accent/20"
          >
            COMENZAR
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 px-6 py-8 flex flex-col gap-6 bg-brand-bg/95 backdrop-blur-md"
        >
          {["MAPYOURFLOW", "BB ONE", "COWORKERS", "VOICE", "PENTESTING", "TRAINING"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-display text-sm font-semibold tracking-widest text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="bg-brand-accent text-brand-bg font-display text-xs font-bold px-6 py-3 rounded-md tracking-widest">
            COMENZAR
          </button>
        </motion.div>
      )}
    </nav>
  );
}
