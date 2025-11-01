"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import styles from "./navbar.component.module.css";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuItems = ["Home", "About", "Services", "Portfolio", "Contact"];
  return (
    <nav className={styles.navbar}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="md:flex">
          <div className={styles.logoWrap}>
            <Image
              src="/navbar/logo.jpg"
              alt="Logo"
              width={80}
              height={80}
              className={styles.logoImage}
              priority
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className={styles.desktopMenu}>
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className={styles.navLink}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Button (มือถือ) */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.mobileMenu}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.3 } },
            }}
          >
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href="#"
                className={styles.navLink}
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
