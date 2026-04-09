"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { lang } = useLanguage();

  return (
    <SubPageLayout title={lang === "ka" ? "კონფიდენციალურობის პოლიტიკა" : "Privacy Policy"}>
      {lang === "ka" ? (
        <>
          <p>ბოლო განახლება: 2025</p>
          <p>
            ანი ბანი მნიშვნელოვნად აფასებს ბავშვებისა და მათი ოჯახების კონფიდენციალურობას. წინამდებარე
            დოკუმენტი აღწერს, თუ რა ინფორმაციას ვაგროვებთ და როგორ ვიყენებთ მას.
          </p>
          <h2>ბავშვების კონფიდენციალურობა (COPPA / GDPR-K)</h2>
          <p>
            ჩვენ არ ვაგროვებთ პერსონალურ ინფორმაციას 13 წლამდე ბავშვებისგან მშობლის თანხმობის გარეშე.
            აპლიკაციაში ბავშვის პროფილი ანონიმურია და მისი მონაცემები არ გადაეცემა მესამე მხარეს.
          </p>
          <h2>რა ინფორმაციას ვაგროვებთ</h2>
          <p>
            მშობლის ანგარიშის შესაქმნელად — ელფოსტა, სახელი (სურვილისამებრ). საიტზე — ანონიმური
            სტატისტიკური მონაცემები (გვერდის ნახვები, ღილაკზე დაჭერა).
          </p>
          <h2>კონტაქტი</h2>
          <p>
            თუ გაქვთ შეკითხვა, მოგვწერეთ: <a href="mailto:salomebaghaturia@anibani.app">salomebaghaturia@anibani.app</a>
          </p>
        </>
      ) : (
        <>
          <p>Last updated: 2025</p>
          <p>
            Ani Bani values the privacy of children and their families. This document explains what
            information we collect and how we use it.
          </p>
          <h2>Children's Privacy (COPPA / GDPR-K)</h2>
          <p>
            We do not collect personal information from children under 13 without verifiable
            parental consent. Child profiles are anonymous and child data is never shared with third
            parties.
          </p>
          <h2>What We Collect</h2>
          <p>
            For the parent account — email and name (optional). On the website — anonymous analytics
            (page views, button clicks).
          </p>
          <h2>Contact</h2>
          <p>
            If you have questions, write to us at{" "}
            <a href="mailto:salomebaghaturia@anibani.app">salomebaghaturia@anibani.app</a>
          </p>
        </>
      )}
    </SubPageLayout>
  );
}
