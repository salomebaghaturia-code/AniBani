"use client";

import SubPageLayout from "@/components/SubPageLayout";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { lang } = useLanguage();

  return (
    <SubPageLayout title={lang === "ka" ? "გამოყენების წესები" : "Terms of Use"}>
      {lang === "ka" ? (
        <>
          <p>ბოლო განახლება: 30 მაისი, 2026</p>
          <p>მოგესალმებით Ani Bani-ში.</p>
          <p>
            Ani Bani აპლიკაციის გადმოწერით ან გამოყენებით, თქვენ ეთანხმებით აღნიშნულ გამოყენების
            წესებს.
          </p>
          <h2>1. Ani Bani-ის შესახებ</h2>
          <p>
            Ani Bani არის საგანმანათლებლო აპლიკაცია 3–7 წლის ბავშვებისთვის, რომელიც ორიენტირებულია
            ქართული ენის, კულტურისა და ადრეული განვითარების მხარდაჭერაზე.
          </p>
          <h2>2. გამოყენების პირობები</h2>
          <p>აპლიკაცია განკუთვნილია მხოლოდ პირადი და არაკომერციული გამოყენებისთვის.</p>
          <p>აკრძალულია:</p>
          <ul>
            <li>აპლიკაციის მასალების კოპირება ან გავრცელება</li>
            <li>კონტენტის ცვლილება</li>
            <li>აპლიკაციის ტექნიკური სტრუქტურის დარღვევა</li>
            <li>აპლიკაციის უკანონო მიზნებისთვის გამოყენება</li>
          </ul>
          <h2>3. მშობლის პასუხისმგებლობა</h2>
          <p>
            მშობელი ან მეურვე პასუხისმგებელია ბავშვის მიერ აპლიკაციის გამოყენების ზედამხედველობაზე
            და მშობლის ფუნქციების მართვაზე.
          </p>
          <h2>4. გარე ბმულები</h2>
          <p>
            მშობლებისთვის განკუთვნილი ზოგიერთი ფუნქცია შესაძლოა შეიცავდეს გარე ბმულებს, რომლებიც
            დაცულია Parent Gate სისტემით.
          </p>
          <p>Ani Bani პასუხისმგებელი არ არის მესამე მხარის ვებგვერდებზე ან სერვისებზე.</p>
          <h2>5. ინტელექტუალური საკუთრება</h2>
          <p>
            აპლიკაციის დიზაინი, ვიზუალები, ანიმაციები, ხმოვანი მასალა, პერსონაჟები, საგანმანათლებლო
            კონტენტი და ბრენდინგი ეკუთვნის ანი ბანი-ს, თუ სხვა რამ არ არის მითითებული.
          </p>
          <p>მათი უნებართვო გამოყენება აკრძალულია.</p>
          <h2>6. ხელმისაწვდომობა</h2>
          <p>
            ჩვენ შეგვიძლია ნებისმიერ დროს განვაახლოთ, შევცვალოთ, დავამატოთ ან დროებით შევზღუდოთ
            აპლიკაციის ფუნქციები.
          </p>
          <h2>7. სამომავლო ფასიანი ფუნქციები</h2>
          <p>მომავალში Ani Bani შესაძლოა მოიცავდეს:</p>
          <ul>
            <li>ფასიან მოდულებს</li>
            <li>გამოწერებს</li>
            <li>დამატებით ფუნქციებს</li>
          </ul>
          <p>
            ნებისმიერი გადახდა განხორციელდება ოფიციალური App Store ან Google Play გადახდის სისტემებით.
          </p>
          <h2>8. პასუხისმგებლობის შეზღუდვა</h2>
          <p>
            Ani Bani მოწოდებულია არსებული მდგომარეობით და არ იძლევა უწყვეტი ან შეცდომების გარეშე
            მუშაობის გარანტიას.
          </p>
          <h2>9. ბავშვების უსაფრთხოება</h2>
          <p>Ani Bani შექმნილია ბავშვებისთვის უსაფრთხო და ასაკის შესაბამისი გამოცდილების უზრუნველსაყოფად.</p>
          <p>მშობლის ფუნქციები და გარე ბმულები დაცულია Parent Gate სისტემით.</p>
          <h2>10. კონტაქტი</h2>
          <p>
            დახმარებისთვის ან კითხვებისთვის დაგვიკავშირდით:{" "}
            <a href="mailto:info@anibani.app">info@anibani.app</a>
          </p>
        </>
      ) : (
        <>
          <p>Last Updated: May 30, 2026</p>
          <p>Welcome to Ani Bani.</p>
          <p>By downloading or using the Ani Bani application, you agree to these Terms of Use.</p>
          <h2>1. About Ani Bani</h2>
          <p>
            Ani Bani is an educational application designed for children ages 3–7, focused on
            supporting Georgian language learning, culture, and early childhood development.
          </p>
          <h2>2. Permitted Use</h2>
          <p>Ani Bani is intended for personal, non-commercial educational use only.</p>
          <p>Users may not:</p>
          <ul>
            <li>copy or redistribute app materials</li>
            <li>modify app content</li>
            <li>interfere with the technical structure of the application</li>
            <li>use the application for unlawful purposes</li>
          </ul>
          <h2>3. Parent Responsibility</h2>
          <p>
            Parents or guardians are responsible for supervising children’s use of the application
            and managing parent-related features.
          </p>
          <h2>4. External Links</h2>
          <p>
            Certain parent-related features may contain external links protected behind a Parent
            Gate system.
          </p>
          <p>Ani Bani is not responsible for third-party websites or external services.</p>
          <h2>5. Intellectual Property</h2>
          <p>
            All application designs, visuals, animations, audio materials, characters, educational
            content, and branding belong to Ani Bani unless otherwise stated.
          </p>
          <p>Unauthorized use is prohibited.</p>
          <h2>6. Availability</h2>
          <p>
            We may update, modify, add, temporarily limit, or discontinue certain features of the
            application at any time.
          </p>
          <h2>7. Future Paid Features</h2>
          <p>Future versions of Ani Bani may include:</p>
          <ul>
            <li>paid educational modules</li>
            <li>subscriptions</li>
            <li>additional premium features</li>
          </ul>
          <p>
            Any future payments will be processed through official App Store or Google Play payment
            systems.
          </p>
          <h2>8. Limitation of Liability</h2>
          <p>
            Ani Bani is provided “as is” and does not guarantee uninterrupted or error-free
            operation.
          </p>
          <h2>9. Child Safety</h2>
          <p>Ani Bani is designed to provide a safe and age-appropriate experience for children.</p>
          <p>Parent-related features and external links are protected through a Parent Gate system.</p>
          <h2>10. Contact</h2>
          <p>
            For support or questions, please contact:{" "}
            <a href="mailto:info@anibani.app">info@anibani.app</a>
          </p>
        </>
      )}
    </SubPageLayout>
  );
}
