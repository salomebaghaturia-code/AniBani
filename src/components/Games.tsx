"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./Reveal";

export default function Games() {
  const { t } = useLanguage();

  return (
    <section id="games" className="relative bg-beige py-16 md:py-24 overflow-hidden">
      {/* Goat character — bottom-left decoration, desktop only */}
      <div className="hidden md:block absolute left-0 bottom-0 w-[160px] lg:w-[220px] z-10 pointer-events-none select-none">
        <Image
          src="/images/characters/goat.png"
          alt=""
          width={440}
          height={440}
          aria-hidden
          className="w-full h-auto drop-shadow-xl"
        />
      </div>

      <div className="relative container-page z-20">
        <Reveal>
          <h2 className="section-title mb-10 md:mb-14">{t.games.title}</h2>
        </Reveal>

        {/*
          Uniform CSS grid:
          - mobile: grid-cols-2, 5th card spans 2 cols (full width row)
          - md+: grid-cols-6 with each card col-span-2 (3 per row). Cards 4 & 5 centered
            via col-start-2 on card #4 → cards 4 (cols 2-3) + 5 (cols 4-5) sit centered.
        */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
          {t.games.items.map((game, idx) => {
            const mobileClass = idx === 4 ? "col-span-2" : "";
            const desktopClass =
              idx === 3 ? "md:col-start-2 md:col-span-2" : "md:col-span-2";
            return (
              <Reveal
                key={game.id}
                delay={idx * 80}
                className={`${mobileClass} ${desktopClass}`}
              >
                <div className="bg-white rounded-card p-5 md:p-6 border border-coral/15 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 mb-4 flex items-center justify-center bg-cream rounded-2xl">
                    <Image
                      src={`/images/games/${game.id}.png`}
                      alt={game.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className="font-display font-bold text-ink text-base md:text-lg mb-1.5">
                    {game.name}
                  </h3>
                  <p className="text-xs md:text-sm text-body leading-snug">{game.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
