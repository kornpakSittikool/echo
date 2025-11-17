"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuItems = ["Home", "About", "Services", "Portfolio", "Contact"];
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <div className="navbar__logo-wrapper">
          <Image
            src="/navbar/logo.jpg"
            alt="Logo"
            width={64}
            height={64}
            className="navbar__logo"
          />
        </div>

        <ul className="navbar__menu">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="navbar__link"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="navbar__mobile-menu"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.3 } },
            }}
          >
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href="#"
                className="navbar__mobile-link"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
