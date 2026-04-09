"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-cream py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="section-title mb-8 md:mb-10">{t.about.title}</h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="max-w-3xl mx-auto space-y-4 text-body text-center md:text-left text-base md:text-[17px] leading-relaxed">
            {t.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {t.about.skills.map((skill, idx) => (
            <Reveal key={skill.id} delay={idx * 60}>
              <div className="bg-white rounded-card p-4 md:p-5 border border-coral/15 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center">
                  <Image
                    src={`/images/skills/${skill.id}.png`}
                    alt={skill.label}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm font-semibold text-ink leading-tight">
                  {skill.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
