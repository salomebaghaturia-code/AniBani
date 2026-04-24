"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";
import { trackClick } from "@/lib/analytics";

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const { open } = useModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    void trackClick(`nav_${id}`);
  };

  const navLinks = [
    { href: "#about", label: t.nav.about, id: "about" },
    { href: "#games", label: t.nav.games, id: "games" },
    { href: "#pricing", label: t.nav.pricing, id: "pricing" },
    { href: "#contact", label: t.nav.contact, id: "contact" }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-soft" : "bg-white"
      }`}
    >
      <nav className="flex items-center justify-between h-16 md:h-20 gap-3 pl-6 md:pl-10 lg:pl-16 xl:pl-24 2xl:pl-32 pr-8 lg:pr-16 xl:pr-24 2xl:pr-32 w-full">
        <a href="#top" className="flex items-center shrink-0" aria-label="Ani Bani">
          <Image
            src={lang === "ka" ? "/images/logo/logo-ka.png" : "/images/logo/logo-en.png"}
            alt="Ani Bani"
            width={504}
            height={124}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-ink font-semibold">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => handleNavClick(link.id)}
                className="hover:text-coral transition-colors text-lg lg:text-xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 md:gap-5 shrink-0">
          {/* EN/GE toggle — always visible on every viewport */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-11 rounded-full border-2 border-coral text-coral hover:bg-coral hover:text-white font-bold text-base transition-colors"
          >
            {t.nav.languageToggleLabel}
          </button>
          <button
            onClick={() => open("navbar_download")}
            className="hidden md:inline-flex btn-primary text-lg py-3 px-7"
          >
            {t.nav.download}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-ink"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-soft animate-fadeIn">
          <div className="container-page py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavClick(link.id)}
                className="py-2 text-ink font-semibold hover:text-coral transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                open("navbar_download");
              }}
              className="btn-primary text-sm py-2.5 mt-1"
            >
              {t.nav.download}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
