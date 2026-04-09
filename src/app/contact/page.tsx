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
        <a href="mailto:hello@anibani.ge">hello@anibani.ge</a>
      </p>
      <h2>{lang === "ka" ? "ტელეფონი" : "Phone"}</h2>
      <p>
        <a href="tel:+995555000000">+995 555 00 00 00</a>
      </p>
      <h2>{lang === "ka" ? "მისამართი" : "Address"}</h2>
      <p>{lang === "ka" ? "თბილისი, საქართველო" : "Tbilisi, Georgia"}</p>
    </SubPageLayout>
  );
}
