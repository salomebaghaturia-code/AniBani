"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";
import { trackClick } from "@/lib/analytics";
import Reveal from "./Reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailCTA() {
  const { t, lang } = useLanguage();
  const { open } = useModal();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      // Open the modal to collect more details (and show validation there)
      open("cta_register_invalid");
      return;
    }

    void trackClick("cta_register");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          sourceButton: "cta_register",
          language: lang
        })
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        setError(t.modal.error);
      }
    } catch {
      setError(t.modal.error);
    }
  };

  return (
    <section id="early-access" className="relative py-16 md:py-24 bg-coral overflow-hidden">
      {/* Scenic meadow/adventure background */}
      <Image
        src="/images/backgrounds/meadow-scene.png"
        alt=""
        fill
        aria-hidden
        priority={false}
        className="object-cover pointer-events-none select-none"
      />
      {/* Light coral tint — mountains, sun, and grass stay clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral/40 via-coral-light/30 to-coral/45 pointer-events-none" />

      <div className="container-page relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white leading-tight">
              {t.emailCta.title}
            </h2>
            <p className="mt-3 text-white/90 text-base md:text-lg">{t.emailCta.subtitle}</p>

            {submitted ? (
              <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-3 rounded-full text-white font-semibold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t.modal.success}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto bg-white p-2 rounded-3xl sm:rounded-full shadow-2xl"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailCta.placeholder}
                  className="flex-1 px-5 py-3 bg-transparent text-ink placeholder-body/60 outline-none rounded-full"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-full font-bold transition-colors whitespace-nowrap"
                >
                  {t.emailCta.button}
                </button>
              </form>
            )}
            {error && <p className="mt-3 text-white text-sm">{error}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
