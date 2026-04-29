"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { lang } = useLanguage();

  return (
    <SubPageLayout title={lang === "ka" ? "წესები და პირობები" : "Terms of Service"}>
      {lang === "ka" ? (
        <>
          <p>ბოლო განახლება: 2025</p>
          <p>
            ანი ბანის გამოყენებით თქვენ ეთანხმებით აქ აღწერილ პირობებს. გთხოვთ, ყურადღებით წაიკითხოთ.
          </p>
          <h2>გამოყენება</h2>
          <p>
            აპლიკაცია განკუთვნილია 3-7 წლის ბავშვებისთვის მშობლის ან მზრუნველის ზედამხედველობით.
          </p>
          <h2>ანგარიში</h2>
          <p>მშობლის ანგარიში პასუხისმგებელია ბავშვის პროფილების მართვაზე.</p>
          <h2>გადახდა</h2>
          <p>
            გამოწერა ავტომატურად ახლდება, თუ მისი გაუქმება დროულად არ მოხდა აპლიკაციის ან ანგარიშის
            პარამეტრებიდან.
          </p>
        </>
      ) : (
        <>
          <p>Last updated: 2025</p>
          <p>
            By using Ani Bani, you agree to the terms described here. Please read carefully.
          </p>
          <h2>Use</h2>
          <p>The app is intended for children aged 3-7 under parental or guardian supervision.</p>
          <h2>Account</h2>
          <p>The parent account is responsible for managing child profiles.</p>
          <h2>Payment</h2>
          <p>
            Subscriptions auto-renew unless cancelled in time through the app or account settings.
          </p>
        </>
      )}
    </SubPageLayout>
  );
}
