"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useModal } from "@/context/ModalContext";
import Reveal from "./Reveal";

export default function Pricing() {
  const { t } = useLanguage();
  const { open } = useModal();

  return (
    <section id="pricing" className="bg-beige py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="section-title mb-10 md:mb-14">{t.pricing.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {t.pricing.plans.map((plan, idx) => {
            const recommended = "recommended" in plan && plan.recommended;
            return (
              <Reveal key={plan.id} delay={idx * 100}>
                <div
                  className={`relative bg-white rounded-card p-6 md:p-8 border-2 transition-all duration-300 h-full flex flex-col items-center text-center ${
                    recommended
                      ? "border-coral shadow-card md:-translate-y-2"
                      : "border-coral/20 shadow-soft hover:-translate-y-1 hover:shadow-card"
                  }`}
                >
                  {recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                      ★
                    </div>
                  )}
                  <h3 className="font-display font-extrabold text-ink text-2xl md:text-3xl mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-6 min-h-[60px] flex flex-col items-center justify-center">
                    {plan.id === "free" ? (
                      <p className="text-body text-base">{plan.price}</p>
                    ) : (
                      <>
                        <p className="font-display text-4xl md:text-5xl font-extrabold text-coral leading-none">
                          {plan.price}
                        </p>
                        <p className="text-body text-sm mt-1">{plan.priceUnit}</p>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => open(`pricing_${plan.id}`)}
                    className={`w-full py-3 rounded-full font-bold transition-all ${
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
