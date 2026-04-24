"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./Reveal";

export default function ParentPanel() {
  const { t } = useLanguage();

  return (
    <section id="parents" className="bg-cream py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="section-title mb-10 md:mb-14">{t.parent.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {t.parent.items.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 100}>
              <div className="bg-white rounded-card p-8 md:p-10 border border-coral/15 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 mb-5 flex items-center justify-center">
                  <Image
                    src={`/images/parent/${item.id}.png`}
                    alt={item.name}
                    width={176}
                    height={176}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-display font-bold text-ink text-xl md:text-2xl mb-3">
                  {item.name}
                </h3>
                <p className="text-base md:text-lg text-body leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
