"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";
import { trackClick } from "@/lib/analytics";

export default function Hero() {
  const { t } = useLanguage();
  const { open } = useModal();

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <div className="container-page pt-6 md:pt-10 pb-12 md:pb-20">
        <div className="relative rounded-[28px] md:rounded-[40px] overflow-hidden shadow-soft bg-cream">
          {/*
            Sizing strategy (mobile overlap-proof):
              - mobile (< 640):  min-height 680px — bunny 200px tall at top, text+buttons bottom, >=140px gap
              - sm   (640-1023): min-height 520px
              - lg+  (1024+):    drop min-height, use 16:9 aspect for desktop framing
          */}
          <div className="relative w-full min-h-[680px] sm:min-h-[520px] lg:min-h-0 lg:aspect-[16/9]">
            {/* Background scene (clean) */}
            <Image
              src="/images/hero/background.png"
              alt=""
              fill
              priority
              className="object-cover"
            />

            {/* Dark gradient — stronger on mobile (covers bottom 55%) to guarantee text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] md:h-[75%] bg-gradient-to-b from-transparent via-black/55 to-black/85 pointer-events-none" />

            {/*
              Bunny character:
                - mobile: top-centered, ~52% wide capped at 200px → height ~205px. With top-[16px] bottom ~221px.
                - desktop: absolute lower-left, ~20% width
            */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[16px] w-[52%] max-w-[200px] sm:left-[3%] sm:translate-x-0 sm:top-auto sm:bottom-0 sm:w-[30%] sm:max-w-none md:left-[3%] md:w-[22%] lg:w-[20%] z-20 pointer-events-none">
              <Image
                src="/images/characters/ani-bunny.png"
                alt="Ani the bunny"
                width={1172}
                height={1432}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            {/* Cat character (lower-right) — hidden on mobile, visible from sm+ */}
            <div className="hidden sm:block absolute right-[3%] bottom-[4%] w-[22%] sm:w-[18%] md:w-[14%] lg:w-[13%] z-20 pointer-events-none">
              <Image
                src="/images/characters/bani-cat.png"
                alt="Bani the cat"
                width={559}
                height={515}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            {/*
              Text block — always bottom-anchored with flex justify-end.
              Mobile min-h 680 + bunny bottom ~229 + text content ~241 + pb-8 = text starts ~407. Gap ~178px above bunny.
            */}
            <div className="absolute inset-0 flex flex-col items-center justify-end px-6 md:px-12 pb-8 md:pb-[8%] z-10 pointer-events-none">
              <div className="max-w-3xl lg:max-w-4xl text-center pointer-events-auto">
                <h1
                  className="font-display font-extrabold text-white text-[22px] sm:text-[28px] md:text-[32px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px]"
                  style={{
                    lineHeight: 1.35,
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)"
                  }}
                >
                  {t.hero.titleLines[0]}
                  <br />
                  {t.hero.titleLines[1]}
                </h1>
                <p
                  className="mt-3 md:mt-5 text-white/95 font-medium leading-relaxed mx-auto max-w-2xl text-[13px] sm:text-base md:text-base lg:text-lg"
                  style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
                >
                  {t.hero.subtitle}
                </p>
                <div className="mt-5 md:mt-7 flex flex-wrap gap-3 justify-center">
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
          </div>
        </div>
      </div>
    </section>
  );
}
