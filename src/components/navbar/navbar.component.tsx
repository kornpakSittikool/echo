"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // ใช้ตัวพิมพ์เล็ก/ใหญ่ปกติ เดี๋ยวฟอนต์ pixel จัดการเอง
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
            priority
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
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
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
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href="#"
                className="navbar__mobile-link"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
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
