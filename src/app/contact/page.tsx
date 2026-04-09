"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang } = useLanguage();

  return (
    <SubPageLayout title={lang === "ka" ? "კონტაქტი" : "Contact"}>
      <p>
        {lang === "ka"
          ? "მოგვწერეთ ნებისმიერ შეკითხვაზე — გვიხარია, რომ უკავშირდები ანი ბანის გუნდს."
          : "Reach out with any question — we're glad to hear from you."}
      </p>
      <h2>{lang === "ka" ? "ელფოსტა" : "Email"}</h2>
      <p>
        <a href="mailto:salomebaghaturia@anibani.app">salomebaghaturia@anibani.app</a>
      </p>
      <h2>{lang === "ka" ? "ტელეფონი" : "Phone"}</h2>
      <p>
        <a href="tel:+995557102107">+995 557 10 21 07</a>
      </p>
      <h2>{lang === "ka" ? "მისამართი" : "Address"}</h2>
      <p>{lang === "ka" ? "თბილისი, საქართველო" : "Tbilisi, Georgia"}</p>
      <h2>{lang === "ka" ? "სოციალური ქსელები" : "Social Media"}</h2>
      <p>
        <a
          href="https://www.facebook.com/anibaniapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        {" · "}
        <a
          href="https://www.facebook.com/anibaniapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </p>
    </SubPageLayout>
  );
}
