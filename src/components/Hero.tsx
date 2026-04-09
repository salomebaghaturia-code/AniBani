"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";

export default function Hero() {
  const { t } = useLanguage();
  const { open } = useModal();

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <div className="container-page pt-6 md:pt-10 pb-12 md:pb-20">
        <div className="relative rounded-[28px] md:rounded-[40px] overflow-hidden shadow-soft bg-cream">
          <div className="relative w-full aspect-[16/10] md:aspect-[16/8.5]">
            {/* Background scene (clean) */}
            <Image
              src="/images/hero/background.png"
              alt=""
              fill
              priority
              className="object-cover"
            />

            {/* Strong dark gradient overlay — transparent at top, dark at bottom (covers ~65%) */}
            <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-b from-transparent via-black/40 to-black/75 pointer-events-none" />

            {/* Bunny character (lower-left) */}
            <div className="absolute left-[2%] md:left-[3%] bottom-0 w-[24%] md:w-[22%] lg:w-[20%] z-20 pointer-events-none">
              <Image
                src="/images/characters/ani-bunny.png"
                alt="Ani the bunny"
                width={1172}
                height={1432}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            {/* Cat character (lower-right) */}
            <div className="hidden sm:block absolute right-[3%] bottom-[4%] w-[16%] md:w-[14%] lg:w-[13%] z-20 pointer-events-none">
              <Image
                src="/images/characters/bani-cat.png"
                alt="Bani the cat"
                width={559}
                height={515}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            {/* Centered text overlay — sits in the lower-middle, on top of the dark gradient */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-[10%] md:pb-[8%] px-6 md:px-12 z-10 pointer-events-none">
              <div className="max-w-3xl text-center pointer-events-auto">
                <h1
                  className="font-display font-extrabold text-white text-[22px] sm:text-2xl md:text-[30px] lg:text-[36px] xl:text-[40px]"
                  style={{
                    lineHeight: 1.45,
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)"
                  }}
                >
                  {t.hero.titleLines[0]}
                  <br />
                  {t.hero.titleLines[1]}
                </h1>
                <p
                  className="mt-3 md:mt-5 text-white/95 font-medium leading-relaxed mx-auto max-w-2xl text-sm md:text-base lg:text-lg"
                  style={{ textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}
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
                  <button
                    onClick={() => open("hero_early_access")}
                    className="inline-flex items-center justify-center px-7 py-3 bg-white/15 backdrop-blur hover:bg-white/25 text-white border-2 border-white rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 text-sm md:text-base"
                  >
                    {t.hero.ctaSecondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
