"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onBackClick: () => void;
  isArticleView: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onBackClick, isArticleView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener to make the navbar slightly more opaque when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 lg:top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav
          className={`w-full max-w-4xl rounded-2xl md:rounded-full border border-white/10 shadow-2xl transition-all duration-300 ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl shadow-emerald-500/5"
              : "bg-black/40 backdrop-blur-lg"
          }`}
        >
          <div className="px-5 py-3 md:px-6 md:py-3.5 flex items-center justify-between">
            {/* Left: Logo & Back Button */}
            <div className="flex items-center space-x-4">
              <AnimatePresence>
                {isArticleView && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: "auto" }}
                    exit={{ opacity: 0, scale: 0.8, width: 0 }}
                    onClick={onBackClick}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="flex items-center space-x-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20">
                  <div className="absolute inset-0 rounded-xl bg-emerald-400 opacity-0 blur-md transition-opacity duration-300 hover:opacity-50" />
                  <span className="relative z-10 text-lg font-extrabold text-white">
                    {"A"}
                  </span>
                </div>
                <span className="hidden font-bold tracking-wide text-white sm:block text-lg">
                  Abu.
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 p-1 bg-white/5 rounded-full border border-white/5">
              <Link
                href="/"
                className="px-5 py-2 rounded-full text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                Home
              </Link>
              <Link
                href="/#projects"
                className="px-5 py-2 rounded-full text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] border border-emerald-500/30 transition-all duration-300"
              >
                Blog
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 md:hidden transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={20} className="text-gray-300 group-hover:text-white" />
              ) : (
                <Menu size={20} className="text-gray-300 group-hover:text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden border-t border-white/10"
              >
                <div className="flex flex-col space-y-2 p-5 bg-black/20">
                  <Link
                    href="/"
                    className="rounded-xl px-4 py-3 font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    Home
                  </Link>
                  <Link
                    href="/#projects"
                    className="rounded-xl px-4 py-3 font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/blog"
                    className="flex justify-between items-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 font-bold text-emerald-400"
                  >
                    <span>Blog</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.div>
    </>
  );
};

export default Navbar;