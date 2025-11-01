"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const menuItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];
    return (
        <nav
            className="mx-[10%] w-full my-5 py-2 px-6 rounded-md md:rounded-2xl shadow-lg shadow-amber-50/10
                 bg-[#57689415] backdrop-blur-md text-white transition-all duration-500 relative"
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="md:flex">
                    <Image
                        src="/navbar/logo.jpg"
                        alt="Logo"
                        className="w-10 h-10 rounded-md md:w-20 md:h-20 md:rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-x-10 font-medium ml-10">
                    {menuItems.map((item) => (
                        <li key={item}>
                            <a href="#" className="hover:text-amber-400 transition-colors">{item}</a>
                        </li>
                    ))}
                </ul>


                {/* Hamburger Button (มือถือ) */}
                <button
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition-colors"
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
                        className="absolute top-full left-0 w-full bg-[#57689415] rounded-md shadow-lg p-6 flex flex-col gap-4 md:hidden"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.3 } }
                        }}
                    >
                        {menuItems.map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="hover:text-amber-400 transition-colors"
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
