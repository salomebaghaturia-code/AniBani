export type Lang = "ka" | "en";

export const translations = {
  ka: {
    nav: {
      about: "მშობლებისთვის",
      games: "თამაშები",
      pricing: "ფასები",
      contact: "კონტაქტი",
      download: "გადმოწერა",
      languageToggleLabel: "EN"
    },
    hero: {
      title: "აქციე ბავშვის ეკრანთან გატარებული დრო განვითარებად",
      titleLines: ["აქციე ბავშვის ეკრანთან", "გატარებული დრო განვითარებად"],
      subtitle:
        "ანი ბანი ეხმარება ბავშვებს ისწავლონ, იფიქრონ და განვითარდნენ თამაშით, უსაფრთხო და მათზე მორგებულ სამყაროში",
      subtitleLines: [
        "ანი ბანი ეხმარება ბავშვებს ისწავლონ, იფიქრონ და განვითარდნენ თამაშით,",
        "უსაფრთხო და მათზე მორგებულ სამყაროში"
      ],
      ctaPrimary: "გადმოწერა",
      ctaSecondary: "ადრეული წვდომა"
    },
    about: {
      title: "ანი ბანის შესახებ",
      paragraphs: [
        "ბავშვები ადრეული ასაკიდანვე იწყებენ ეკრანთან კონტაქტს და ყოველდღიურად მნიშვნელოვან დროს ატარებენ ციფრულ აუდიო-ვიდეო გარემოში, სადაც ხშირ შემთხვევაში პასიური მაყურებლების როლში არიან. ეს გამოცდილება იშვიათად უწყობს ხელს განვითარებას და შესაძლოა იწვევდეს გადაღლილობასა და გაღიზიანებას.",
        "ანი ბანი არის ინტერაქციული საგანმანათლებლო თამაში, რომელშიც მთავარი გმირი - ბაჭია ანი - ბავშვებს მიუძღვება სასწავლო თავგადასავალში და ეხმარება სამყაროს აღმოჩენასა და ასაკის შესაბამისი უნარების განვითარებაში.",
        "შემეცნებითი განვითარების პრინციპებზე დაყრდნობით, ანი ბანი თამაშის პროცესში ხელს უწყობს კოგნიტურ, ენობრივ და მოტორულ უნარების გამომუშავებას."
      ],
      skillsHeading: "უნარები, რომლებიც თამაშით ვითარდება",
      skills: [
        { id: "curiosity", label: "ცნობისმოყვარეობა" },
        { id: "focus", label: "ყურადღება და კონცენტრაცია" },
        { id: "observation", label: "დაკვირვება და აღმოჩენა" },
        { id: "classification", label: "შედარება და კლასიფიკაცია" },
        { id: "cause-effect", label: "მიზეზშედეგობრივი კავშირების გააზრება" },
        { id: "logical", label: "ლოგიკურ კრიტიკული აზროვნება" },
        { id: "problem-solving", label: "პრობლემის გადაჭრის უნარი" },
        { id: "creativity", label: "წარმოსახვა და კრეატიულობა" }
      ]
    },
    games: {
      title: "თამაშები",
      items: [
        { id: "alphabet", name: "ანბანი", desc: "ენა, მეხსიერება, მოტორული უნარები" },
        { id: "shapes-colors", name: "ფორმები და ფერები", desc: "ფერების და ფორმების ცნობა, ყურადღება" },
        { id: "math", name: "მათემატიკა", desc: "ლოგიკა, პრობლემის გადაჭრა" },
        { id: "cooking", name: "კულინარია", desc: "კრეატიულობა, თანმიმდევრულობა" },
        { id: "my-georgia", name: "ჩემი საქართველო", desc: "მშობლიური კულტურული ცნობიერება, მეხსიერება" }
      ]
    },
    parent: {
      title: "მშობლის პანელი",
      items: [
        {
          id: "profiles",
          name: "რამოდენიმე ბავშვის პროფილი",
          desc: "შექმენი რამოდენიმე ბავშვის პროფილი ერთი ანგარიშიდან"
        },
        {
          id: "progress",
          name: "ბავშვის პროგრესი",
          desc: "დააკვირდი რომელი თამაშები ითამაშა ბავშვმა"
        },
        {
          id: "screen-time",
          name: "აპლიკაციაში გატარებული დრო",
          desc: "აკონტროლე დღიური და კვირის ლიმიტები თამაშში"
        }
      ]
    },
    pricing: {
      title: "ფასი",
      cta: "გადმოწერა",
      plans: [
        { id: "free", name: "უფასო", price: "ლიმიტირებული წვდომა", priceUnit: "" },
        { id: "monthly", name: "თვეში", price: "4.99", priceUnit: "ლარი" },
        { id: "yearly", name: "წლიურად", price: "49.99", priceUnit: "ლარი", recommended: true }
      ]
    },
    emailCta: {
      title: "იყავი პირველი ვინც გამოცდის ანი ბანი-ს",
      subtitle: "მიიღე ადრეული წვდომა",
      placeholder: "შეიყვანე ელფოსტა",
      button: "დარეგისტრირდი"
    },
    footer: {
      tagline: "ჩამოტვირთე ანიბანი",
      available: "ხელმისაწვდომია",
      links: {
        about: "ჩვენ შესახებ",
        privacy: "კონფიდენციალურობა",
        terms: "წესები და პირობები",
        contact: "კონტაქტი"
      },
      copyright: "© 2025 Ani Bani. ყველა უფლება დაცულია."
    },
    modal: {
      title: "ადრეული წვდომის რეგისტრაცია",
      subtitle: "პირველი სატესტო ვერსია უკვე მზად არის",
      email: "ელფოსტა",
      emailPlaceholder: "your@email.com",
      mobileSystemLabel: "მობილური სისტემა:",
      androidButton: "Android",
      iosButton: "iPhone (iOS)",
      iosBodyText:
        "თუ იყენებთ IPhone / IPad (iOS), დაგვიდასტურეთ ამ მეილზე, რომ გსურთ ტესტირებაში მონაწილეობა და დაგამატებთ ტესტერთა სიაში. ამის შემდეგ თქვენს მეილზე მიიღებთ ოფიციალურ მოწვევას TestFlight-ის საშუალებით",
      submit: "დარეგისტრირდი",
      submitting: "იგზავნება...",
      success: "მადლობა! თქვენ წარმატებით დარეგისტრირდით",
      error: "მოხდა შეცდომა, გთხოვთ სცადეთ თავიდან",
      emailRequired: "გთხოვთ შეიყვანოთ ელფოსტა",
      emailInvalid: "გთხოვთ შეიყვანოთ სწორი ელფოსტა",
      close: "დახურვა"
    }
  },
  en: {
    nav: {
      about: "About",
      games: "Games",
      pricing: "Pricing",
      contact: "Contact",
      download: "Download",
      languageToggleLabel: "GE"
    },
    hero: {
      title: "Turn Your Child's Screen Time Into Development",
      titleLines: ["Turn Your Child's Screen Time", "Into Development"],
      subtitle:
        "Ani Bani helps children learn, think, and grow — through play, in a safe and structured world.",
      subtitleLines: [
        "Ani Bani helps children learn, think, and grow — through play,",
        "in a safe and structured world."
      ],
      ctaPrimary: "Download",
      ctaSecondary: "Early Access"
    },
    about: {
      title: "About Ani Bani",
      paragraphs: [
        "From an early age, children start engaging with screens and spend a significant part of the day in digital audio-visual environments — often as passive viewers. This kind of experience rarely supports development and can lead to fatigue and irritation.",
        "Ani Bani is an interactive educational game in which the main character — Ani the bunny — guides children through a learning adventure, helping them discover the world and build age-appropriate skills.",
        "Grounded in cognitive development principles, Ani Bani fosters cognitive, language, and motor skills through play."
      ],
      skillsHeading: "Skills developed through play",
      skills: [
        { id: "curiosity", label: "Curiosity" },
        { id: "focus", label: "Focus & Attention" },
        { id: "observation", label: "Observation & Discovery" },
        { id: "classification", label: "Comparison & Classification" },
        { id: "cause-effect", label: "Cause & Effect Understanding" },
        { id: "logical", label: "Logical-Critical Thinking" },
        { id: "problem-solving", label: "Problem Solving" },
        { id: "creativity", label: "Imagination & Creativity" }
      ]
    },
    games: {
      title: "Games",
      items: [
        { id: "alphabet", name: "Alphabet", desc: "Language, memory, fine motor skills" },
        { id: "shapes-colors", name: "Shapes & Colors", desc: "Defining shapes & colors, attention" },
        { id: "math", name: "Math", desc: "Logic, problem solving" },
        { id: "cooking", name: "Cooking", desc: "Creativity, sequencing" },
        { id: "my-georgia", name: "My Georgia", desc: "Native culture awareness, memory" }
      ]
    },
    parent: {
      title: "Parent Panel",
      items: [
        {
          id: "profiles",
          name: "Child Profiles",
          desc: "Manage multiple child profiles from one account"
        },
        {
          id: "progress",
          name: "Track Progress",
          desc: "See which games and levels your child has completed"
        },
        {
          id: "screen-time",
          name: "Time Spent",
          desc: "Monitor daily and weekly screen time in the app"
        }
      ]
    },
    pricing: {
      title: "Pricing",
      cta: "Download",
      plans: [
        { id: "free", name: "Free", price: "Limited access", priceUnit: "" },
        { id: "monthly", name: "Monthly", price: "4.99", priceUnit: "GEL" },
        { id: "yearly", name: "Yearly", price: "49.99", priceUnit: "GEL", recommended: true }
      ]
    },
    emailCta: {
      title: "Be the first to try Ani Bani",
      subtitle: "Get early access",
      placeholder: "Enter your email",
      button: "Join Now"
    },
    footer: {
      tagline: "Download Ani Bani",
      available: "Available on",
      links: {
        about: "About Us",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        contact: "Contact"
      },
      copyright: "© 2025 Ani Bani. All rights reserved."
    },
    modal: {
      title: "Early Access Registration",
      subtitle: "პირველი სატესტო ვერსია უკვე მზად არის",
      email: "Email",
      emailPlaceholder: "your@email.com",
      mobileSystemLabel: "Mobile system:",
      androidButton: "Android",
      iosButton: "iPhone (iOS)",
      iosBodyText:
        "If you use an iPhone / iPad (iOS), confirm on this email that you'd like to take part in testing, and we'll add you to the testers list. After that, you'll receive an official invitation to your email via TestFlight.",
      submit: "Register",
      submitting: "Submitting...",
      success: "Thank you! You've been successfully registered",
      error: "Something went wrong, please try again",
      emailRequired: "Please enter your email",
      emailInvalid: "Please enter a valid email",
      close: "Close"
    }
  }
} as const;

export type Translations = typeof translations.ka;
