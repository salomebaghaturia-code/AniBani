"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";
import Reveal from "./Reveal";

export default function EmailCTA() {
  const { t } = useLanguage();
  const { open } = useModal();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    open("early_access", email.trim());
  };

  return (
    <section
      id="early-access"
      className="relative z-10 py-24 md:py-32 bg-transparent scroll-mt-20"
    >
      <div className="container-page relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white"
              style={{
                lineHeight: 1.45,
                textShadow: "0 2px 10px rgba(0,0,0,0.6)"
              }}
            >
              {t.emailCta.title}
            </h2>
            <p
              className="mt-3 text-white text-base md:text-lg"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
            >
              {t.emailCta.subtitle}
            </p>

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
              />
              <button
                type="submit"
                className="px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-full font-bold transition-colors whitespace-nowrap"
              >
                {t.emailCta.button}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
