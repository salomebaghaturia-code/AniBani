"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative bg-cream py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div className="relative container-page">
        <Reveal>
          <h2 className="section-title mb-8 md:mb-10">{t.about.title}</h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-5 text-body text-center md:text-left text-xl md:text-2xl leading-relaxed">
            {t.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="section-title mt-14 md:mt-20 mb-8 md:mb-10">
            {t.about.skillsHeading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {t.about.skills.map((skill, idx) => (
            <Reveal key={skill.id} delay={idx * 60}>
              <div className="bg-white rounded-card p-4 md:p-5 border border-coral/15 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 mb-4 flex items-center justify-center">
                  <Image
                    src={`/images/skills/${skill.id}.png`}
                    alt={skill.label}
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm md:text-base font-semibold text-ink leading-tight">
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
