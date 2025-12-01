"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "./config/navbar.config";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <Link
          href="/"
          className="navbar__logo-wrapper"
        >
          <Image
            src="/navbar/logo.jpg"
            alt="Logo"
            width={64}
            height={64}
            priority
            className="navbar__logo"
          />
        </Link>

        <ul className="navbar__menu">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="navbar__link"
              >
                {item.label}
              </Link>
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
            {NAV_ITEMS.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href={item.href}
                  className="navbar__mobile-link"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
