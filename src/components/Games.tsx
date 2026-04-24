"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./Reveal";

export default function Games() {
  const { t } = useLanguage();

  return (
    <section id="games" className="relative bg-beige py-16 md:py-24 overflow-hidden">
      {/* Full-width background image */}
      <Image
        src="/images/games-bg.png"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="object-cover pointer-events-none select-none"
      />

      {/* Goat character — bottom-left, desktop only */}
      <div className="hidden md:block absolute left-0 bottom-0 w-[160px] lg:w-[220px] xl:w-[260px] pointer-events-none select-none">
        <Image
          src="/images/characters/goat.png"
          alt=""
          width={440}
          height={440}
          aria-hidden
          className="w-full h-auto drop-shadow-xl"
        />
      </div>

      <div className="relative container-page">
        <Reveal>
          <h2 className="section-title mb-10 md:mb-14">{t.games.title}</h2>
        </Reveal>

        {/*
          Uniform CSS grid:
          - mobile: grid-cols-2. All 5 cards equal width. 5th card spans 2 cols but
            is capped via max-w + mx-auto so its visible width matches the others.
          - md+: grid-cols-6 with each card col-span-2 (3 per row). Row 2 cards centered
            via col-start-2 on card #4 → cards 4 (cols 2-3) + 5 (cols 4-5).
        */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 items-stretch">
          {t.games.items.map((game, idx) => {
            const mobileClass =
              idx === 4
                ? "col-span-2 mx-auto w-full max-w-[calc(50%-0.5rem)] md:max-w-none md:mx-0"
                : "";
            const desktopClass =
              idx === 3 ? "md:col-start-2 md:col-span-2" : "md:col-span-2";
            return (
              <Reveal
                key={game.id}
                delay={idx * 80}
                className={`${mobileClass} ${desktopClass} h-full`}
              >
                <div className="bg-cream rounded-card p-5 md:p-6 border border-coral/10 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 mb-4 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={`/images/games/${game.id}.png`}
                      alt={game.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-display font-bold text-ink text-base md:text-xl mb-2">
                    {game.name}
                  </h3>
                  <p className="text-sm md:text-base text-body leading-snug">{game.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
