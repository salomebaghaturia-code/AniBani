"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";
import Reveal from "./Reveal";

export default function Pricing() {
  const { t } = useLanguage();
  const { open } = useModal();

  return (
    <section id="pricing" className="relative z-10 bg-transparent py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="section-title mb-10 md:mb-14 text-white" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>{t.pricing.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {t.pricing.plans.map((plan, idx) => {
            const recommended = "recommended" in plan && plan.recommended;
            return (
              <Reveal key={plan.id} delay={idx * 100}>
                <div
                  className={`relative bg-white rounded-card p-8 md:p-12 border-2 transition-all duration-300 h-full flex flex-col items-center text-center ${
                    recommended
                      ? "border-coral shadow-card md:-translate-y-2"
                      : "border-coral/20 shadow-soft hover:-translate-y-1 hover:shadow-card"
                  }`}
                >
                  {recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral text-white text-base font-bold px-5 py-1.5 rounded-full uppercase tracking-wider">
                      ★
                    </div>
                  )}
                  <h3 className="font-display font-extrabold text-ink text-3xl md:text-4xl mb-5">
                    {plan.name}
                  </h3>
                  <div className="mb-7 min-h-[80px] flex flex-col items-center justify-center">
                    {plan.id === "free" ? (
                      <p className="text-body text-lg md:text-xl">{plan.price}</p>
                    ) : (
                      <>
                        <p className="font-display text-5xl md:text-6xl font-extrabold text-coral leading-none">
                          {plan.price}
                        </p>
                        <p className="text-body text-base mt-2">{plan.priceUnit}</p>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => open(`pricing_${plan.id}`)}
                    className={`w-full py-4 rounded-full font-bold text-lg md:text-xl transition-all ${
                      recommended
                        ? "bg-coral hover:bg-coral-dark text-white shadow-soft"
                        : "bg-white hover:bg-coral hover:text-white text-coral border-2 border-coral"
                    }`}
                  >
                    {t.pricing.cta}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
