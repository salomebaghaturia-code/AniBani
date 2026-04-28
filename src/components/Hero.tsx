"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";
import { trackClick } from "@/lib/analytics";

export default function Hero() {
  const { t } = useLanguage();
  const { open } = useModal();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative w-full min-h-[620px] sm:min-h-[560px] md:min-h-0 md:aspect-[2412/1134] lg:aspect-[2412/1134]">
        {/* Desktop background */}
        <Image
          src="/images/hero-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />

        {/* Mobile background */}
        <Image
          src="/images/hero-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="md:hidden object-cover object-center"
        />

        {/* Mobile text block — bottom-right, not covering rabbit */}
        <div className="md:hidden absolute inset-0 flex flex-col items-end justify-end px-4 pb-8 z-10 pointer-events-none">
          <div className="text-right pointer-events-auto max-w-4xl lg:max-w-5xl">
            <h1
              className="font-display font-extrabold text-white text-[22px] sm:text-[28px] md:text-[32px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px]"
              style={{
                fontSize: "clamp(20px, 3vw, 56px)",
                lineHeight: 1.25,
                textShadow: "0 2px 8px rgba(0,0,0,0.6)"
              }}
            >
              <span className="block">{t.hero.titleLines[0]}</span>
              <span className="block">{t.hero.titleLines[1]}</span>
            </h1>
            <p
              className="mt-3 text-white/95 font-medium leading-relaxed ml-auto text-[13px] sm:text-base"
              style={{
                fontSize: "clamp(13px, 1.2vw, 20px)",
                textShadow: "0 2px 6px rgba(0,0,0,0.6)"
              }}
            >
              {t.hero.subtitleLines[0]}
              <br />
              {t.hero.subtitleLines[1]}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => open("hero_download")}
                className="btn-primary text-sm md:text-base"
              >
                {t.hero.ctaPrimary}
              </button>
              <a
                href="#early-access"
                onClick={() => void trackClick("hero_early_access")}
                className="inline-flex items-center justify-center px-7 py-3 bg-white/15 backdrop-blur hover:bg-white/25 text-white border-2 border-white rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 text-sm md:text-base"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>

        {/* Desktop text block — bottom-right, live-site font sizes */}
        <div className="hidden md:flex absolute inset-0 z-10 pointer-events-none flex-col items-end justify-end pr-8 lg:pr-16 xl:pr-24 pb-[2.5%] lg:pb-[3%]">
          <div className="text-right pointer-events-auto max-w-4xl lg:max-w-5xl">
            <h1
              className="font-display font-extrabold text-white text-[22px] sm:text-[28px] md:text-[32px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px]"
              style={{
                fontSize: "clamp(20px, 3vw, 56px)",
                lineHeight: 1.25,
                textShadow: "0 2px 8px rgba(0,0,0,0.6)"
              }}
            >
              <span className="block whitespace-nowrap">{t.hero.titleLines[0]}</span>
              <span className="block whitespace-nowrap">{t.hero.titleLines[1]}</span>
            </h1>
            <p
              className="mt-4 md:mt-5 text-white/95 font-medium leading-relaxed text-sm md:text-base lg:text-lg ml-auto"
              style={{
                fontSize: "clamp(13px, 1.2vw, 20px)",
                textShadow: "0 2px 6px rgba(0,0,0,0.6)"
              }}
            >
              <span className="block whitespace-nowrap">{t.hero.subtitleLines[0]}</span>
              <span className="block whitespace-nowrap">{t.hero.subtitleLines[1]}</span>
            </p>
            <div className="mt-7 lg:mt-9 flex flex-wrap gap-4 justify-end">
              <button
                onClick={() => open("hero_download")}
                className="btn-primary text-lg md:text-xl px-9 py-4"
              >
                {t.hero.ctaPrimary}
              </button>
              <a
                href="#early-access"
                onClick={() => void trackClick("hero_early_access")}
                className="inline-flex items-center justify-center px-9 py-4 bg-white/20 backdrop-blur hover:bg-white/30 text-white border-2 border-white rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 text-lg md:text-xl"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
