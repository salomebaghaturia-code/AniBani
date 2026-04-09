"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <SubPageLayout title={lang === "ka" ? "ჩვენ შესახებ" : "About Us"}>
      {lang === "ka" ? (
        <>
          <p>
            ანი ბანი არის ქართული საგანმანათლებლო აპლიკაცია 3-7 წლის ბავშვებისთვის. ჩვენი მიზანია,
            ეკრანთან გატარებული დრო ვაქციოთ მათი განვითარების ნაწილად — თამაშით, უსაფრთხო და
            ბავშვებზე მორგებულ სამყაროში.
          </p>
          <h2>ჩვენი მისია</h2>
          <p>
            გვწამს, რომ ბავშვებს აქვთ უფლება ისწავლონ და განვითარდნენ ისე, რომ თამაში სიამოვნებას
            ანიჭებდეს, ხოლო პროდუქტი — მშობელს სიმშვიდეს. ანი ბანი დაგეხმარება ბავშვს გამოიმუშაოს
            კოგნიტური, ენობრივი და მოტორული უნარები.
          </p>
          <h2>გუნდი</h2>
          <p>
            ჩვენ ვართ ბავშვის ფსიქოლოგების, განათლების სპეციალისტების, დიზაინერებისა და
            დეველოპერების გუნდი, რომლებიც ერთად ვქმნით ბავშვებზე მორგებულ პროდუქტს.
          </p>
        </>
      ) : (
        <>
          <p>
            Ani Bani is a Georgian educational app for children aged 3-7. Our goal is to turn screen
            time into developmental time — through play, in a safe and child-friendly world.
          </p>
          <h2>Our Mission</h2>
          <p>
            We believe children deserve to learn and grow in a way that makes play joyful and gives
            parents peace of mind. Ani Bani helps children develop cognitive, language, and motor
            skills.
          </p>
          <h2>The Team</h2>
          <p>
            We are a team of child psychologists, education experts, designers, and developers
            building a product crafted for children.
          </p>
        </>
      )}
    </SubPageLayout>
  );
}
