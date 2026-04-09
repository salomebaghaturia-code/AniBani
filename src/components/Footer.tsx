"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";

export default function Footer() {
  const { t, lang } = useLanguage();
  const { open } = useModal();

  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="container-page py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Logo + tagline + store badges */}
          <div className="md:col-span-1">
            <Image
              src={lang === "ka" ? "/images/logo/logo-ka.png" : "/images/logo/logo-en.png"}
              alt="Ani Bani"
              width={504}
              height={124}
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              {t.footer.tagline} — {t.footer.available}
            </p>
            <button
              onClick={() => open("footer_appstore")}
              className="block w-full max-w-xs hover:opacity-80 transition-opacity"
              aria-label="Download on the App Store / Get it on Google Play"
            >
              <Image
                src="/images/badges/store-badges.png"
                alt="App Store and Google Play"
                width={1568}
                height={252}
                className="w-full h-auto"
              />
            </button>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">{t.nav.about}</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href="/about" className="hover:text-coral transition-colors">
                  {t.footer.links.about}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-coral transition-colors">
                  {t.footer.links.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-coral transition-colors">
                  {t.footer.links.terms}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coral transition-colors">
                  {t.footer.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">{t.footer.links.contact}</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a href="mailto:hello@anibani.ge" className="hover:text-coral transition-colors">
                  hello@anibani.ge
                </a>
              </li>
              <li>
                <a href="tel:+995555000000" className="hover:text-coral transition-colors">
                  +995 555 00 00 00
                </a>
              </li>
              <li>{lang === "ka" ? "თბილისი, საქართველო" : "Tbilisi, Georgia"}</li>
            </ul>

            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-coral flex items-center justify-center transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-coral flex items-center justify-center transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
