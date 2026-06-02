"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { lang } = useLanguage();

  return (
    <SubPageLayout title={lang === "ka" ? "კონფიდენციალურობის პოლიტიკა" : "Privacy Policy"}>
      {lang === "ka" ? (
        <>
          <p>ბოლო განახლება: 30 მაისი, 2026</p>
          <p>მოგესალმებით ანი ბანი-ში.</p>
          <p>
            ანი ბანი არის საგანმანათლებლო მობილური აპლიკაცია 3–7 წლის ბავშვებისთვის, რომელიც ხელს
            უწყობს ადრეულ განვითარებას ინტერაქტიული ქართულენოვანი საგანმანათლებლო აქტივობების
            საშუალებით.
          </p>
          <p>
            ჩვენთვის განსაკუთრებით მნიშვნელოვანია ბავშვებისა და ოჯახების უსაფრთხოება და პირადი
            ინფორმაციის დაცვა. შესაბამისად, ვცდილობთ პასუხისმგებლობით მოვეპყროთ მომხმარებლის
            ინფორმაციას.
          </p>
          <h2>1. რა ინფორმაციას ვაგროვებთ</h2>
          <h3>ანალიტიკური ინფორმაცია</h3>
          <p>
            ანი ბანი იყენებს Firebase Analytics-ს აპლიკაციის მუშაობის, ფუნქციონალის გაუმჯობესებისა და
            საგანმანათლებლო გამოცდილების განვითარებისთვის.
          </p>
          <p>შესაძლოა შეგროვდეს:</p>
          <ul>
            <li>მოწყობილობის ტიპი</li>
            <li>ოპერაციული სისტემის ვერსია</li>
            <li>აპლიკაციის გამოყენების ანონიმური სტატისტიკა</li>
            <li>შეცდომებისა და წარმადობის მონაცემები</li>
          </ul>
          <p>ჩვენ არ ვიყენებთ ანალიტიკურ მონაცემებს ქცევითი ან პერსონალიზებული რეკლამისთვის.</p>
          <h3>საინფორმაციო გამოწერის ინფორმაცია</h3>
          <p>
            მშობლებს ან მეურვეებს სურვილის შემთხვევაში შეუძლიათ მიუთითონ ელფოსტა ანი ბანი-ს
            სიახლეების, განახლებებისა და საგანმანათლებლო ინფორმაციის მისაღებად.
          </p>
          <p>
            ელფოსტის მითითება ნებაყოფლობითია და განკუთვნილია მხოლოდ მშობლებისთვის ან მეურვეებისთვის.
          </p>
          <h2>2. ბავშვების კონფიდენციალურობა</h2>
          <p>
            ანი ბანი შექმნილია ბავშვებისთვის, თუმცა მშობლებისთვის განკუთვნილი ფუნქციები (მაგალითად:
            ელფოსტის შეყვანა ან გარე ბმულები) დაცულია Parent Gate სისტემით.
          </p>
          <p>ჩვენ შეგნებულად არ ვაგროვებთ ბავშვების პირად ინფორმაციას.</p>
          <p>ანი ბანი არ შეიცავს:</p>
          <ul>
            <li>მესამე მხარის რეკლამებს</li>
            <li>ქცევით რეკლამას</li>
            <li>შეუზღუდავ ინტერნეტ წვდომას</li>
            <li>საჯარო ჩატ ფუნქციას</li>
            <li>ბავშვებისთვის სოციალურ ქსელებთან ინტეგრაციას</li>
          </ul>
          <h2>3. ბავშვთა კონფიდენციალურობის დაცვა</h2>
          <p>
            ანი ბანი შექმნილია ბავშვების უსაფრთხოებისა და კონფიდენციალურობის დაცვის პრინციპების
            გათვალისწინებით.
          </p>
          <p>
            ჩვენ ვცდილობთ დავიცვათ ბავშვთა მონაცემების დაცვის შესაბამისი პრინციპები, მათ შორის
            COPPA-სა და GDPR-K-ის მოთხოვნები საჭიროების შემთხვევაში.
          </p>
          <p>
            მშობლებისთვის განკუთვნილი ფუნქციები, მათ შორის ელფოსტის შეყვანა და გარე ბმულები, დაცულია
            Parent Gate სისტემით.
          </p>
          <h2>4. ოფლაინ გამოყენება</h2>
          <p>
            ანი ბანი-ის ძირითადი საგანმანათლებლო ფუნქციები ხელმისაწვდომია ოფლაინ რეჟიმში ინსტალაციის
            შემდეგ.
          </p>
          <p>ინტერნეტი შესაძლოა საჭირო იყოს მხოლოდ გარკვეული მშობლის ფუნქციებისთვის.</p>
          <h2>5. ინფორმაციის გაზიარება</h2>
          <p>ჩვენ არ ვყიდით მომხმარებლის პირად ინფორმაციას.</p>
          <p>
            შესაძლოა გამოყენებული იყოს სანდო მესამე მხარის სერვისები, როგორიცაა Firebase, მხოლოდ
            ანალიტიკისა და აპლიკაციის ფუნქციონირების მიზნით.
          </p>
          <h2>6. ინფორმაციის უსაფრთხოება</h2>
          <p>
            ჩვენ ვიღებთ გონივრულ ტექნიკურ და ორგანიზაციულ ზომებს ინფორმაციის უსაფრთხოებისა და
            ბავშვებისთვის უსაფრთხო გარემოს უზრუნველსაყოფად.
          </p>
          <h2>7. მშობლების უფლებები</h2>
          <p>მშობლებს ან მეურვეებს ნებისმიერ დროს შეუძლიათ დაგვიკავშირდნენ:</p>
          <ul>
            <li>კონფიდენციალურობასთან დაკავშირებულ კითხვებზე</li>
            <li>ელფოსტის გამოწერის გაუქმებაზე</li>
            <li>მონაცემებთან დაკავშირებულ საკითხებზე</li>
          </ul>
          <p>
            კონტაქტი: <a href="mailto:info@anibani.app">info@anibani.app</a>
          </p>
          <h2>8. სამომავლო ფუნქციები</h2>
          <p>მომავალში ანი ბანი შესაძლოა მოიცავდეს:</p>
          <ul>
            <li>გამოწერებს</li>
            <li>მომხმარებლის ანგარიშებს</li>
            <li>ბავშვის პროგრესის შენახვას</li>
            <li>დამატებით საგანმანათლებლო მოდულებს</li>
          </ul>
          <p>
            აპლიკაციის განვითარებასთან ერთად კონფიდენციალურობის პოლიტიკა შესაძლოა პერიოდულად
            განახლდეს.
          </p>
          <h2>9. კონტაქტი</h2>
          <p>
            თუ გაქვთ კითხვები კონფიდენციალურობის პოლიტიკასთან დაკავშირებით, დაგვიკავშირდით:{" "}
            <a href="mailto:info@anibani.app">info@anibani.app</a>
          </p>
        </>
      ) : (
        <>
          <p>Last Updated: May 30, 2026</p>
          <p>Welcome to Ani Bani.</p>
          <p>
            Ani Bani is an educational mobile application designed for children ages 3–7 to support
            early learning through interactive Georgian-language educational activities.
          </p>
          <p>
            We value the privacy and safety of children and families and are committed to protecting
            user information responsibly.
          </p>
          <h2>1. Information We Collect</h2>
          <h3>Analytics Information</h3>
          <p>
            Ani Bani uses Firebase Analytics to help us understand app performance, improve
            functionality, and enhance the educational experience.
          </p>
          <p>This may include:</p>
          <ul>
            <li>device type</li>
            <li>operating system version</li>
            <li>anonymous app usage statistics</li>
            <li>crash and performance information</li>
          </ul>
          <p>
            We do not use analytics for behavioral advertising or personalized advertising purposes.
          </p>
          <h3>Newsletter Information</h3>
          <p>
            Parents may voluntarily provide an email address to subscribe to updates, product news,
            or educational announcements related to Ani Bani.
          </p>
          <p>Providing an email address is optional and intended only for parents or guardians.</p>
          <h2>2. Children’s Privacy</h2>
          <p>
            Ani Bani is designed for children, but certain parent-related features (such as
            newsletter signup or external links) are protected behind a parent gate.
          </p>
          <p>We do not knowingly collect personal information directly from children.</p>
          <p>Ani Bani does not include:</p>
          <ul>
            <li>third-party advertising</li>
            <li>behavioral advertising</li>
            <li>unrestricted internet browsing</li>
            <li>public chat functionality</li>
            <li>social media integrations for children</li>
          </ul>
          <h2>3. Children’s Privacy Compliance</h2>
          <p>Ani Bani is designed with children’s privacy and safety in mind.</p>
          <p>
            We aim to follow applicable child privacy protection principles, including requirements
            related to COPPA and GDPR-K where applicable.
          </p>
          <p>
            Parent-related features, including newsletter signup and external links, are protected
            behind a parent gate.
          </p>
          <h2>4. Offline Usage</h2>
          <p>Most educational features of Ani Bani are available offline after installation.</p>
          <p>Internet access may only be required for optional parent-related features.</p>
          <h2>5. Data Sharing</h2>
          <p>We do not sell personal information.</p>
          <p>
            We may use trusted third-party service providers, such as Firebase, solely for analytics
            and app functionality purposes.
          </p>
          <h2>6. Data Security</h2>
          <p>
            We take reasonable technical and organizational measures to protect information and
            maintain a safe experience for children and families.
          </p>
          <h2>7. Parent Rights</h2>
          <p>Parents or guardians may contact us at any time regarding:</p>
          <ul>
            <li>privacy questions</li>
            <li>newsletter removal requests</li>
            <li>data-related concerns</li>
          </ul>
          <p>
            Contact: <a href="mailto:info@anibani.app">info@anibani.app</a>
          </p>
          <h2>8. Future Features</h2>
          <p>Future versions of Ani Bani may include:</p>
          <ul>
            <li>subscriptions</li>
            <li>user accounts</li>
            <li>child progress tracking</li>
            <li>additional educational modules</li>
          </ul>
          <p>This Privacy Policy may be updated as the app evolves.</p>
          <h2>9. Contact</h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact:{" "}
            <a href="mailto:info@anibani.app">info@anibani.app</a>
          </p>
        </>
      )}
    </SubPageLayout>
  );
}
