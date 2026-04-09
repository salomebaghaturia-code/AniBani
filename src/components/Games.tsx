"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./Reveal";

export default function Games() {
  const { t } = useLanguage();

  return (
    <section id="games" className="relative bg-beige py-16 md:py-24 overflow-hidden">
      {/* Goat character — bottom-left decoration, hidden on smallest viewports */}
      <div className="hidden sm:block absolute left-0 bottom-0 w-[140px] md:w-[180px] lg:w-[220px] z-10 pointer-events-none select-none">
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

        {/* Layout: 3 per row on desktop, 2 on mobile, last 2 centered on desktop */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-6 max-w-5xl mx-auto">
          {t.games.items.map((game, idx) => (
            <Reveal key={game.id} delay={idx * 80}>
              <div className="w-[calc(50%-0.625rem)] sm:w-[260px] md:w-[280px] bg-white rounded-card p-5 md:p-6 border border-coral/15 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center">
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
          ))}
        </div>
      </div>
    </section>
  );
}
