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
      ctaPrimary: "გადმოწერა",
      ctaSecondary: "ადრეული წვდომა"
    },
    about: {
      title: "ანი ბანის შესახებ",
      paragraphs: [
        "ბავშვები ადრეული ასაკიდან იწყებენ ეკრანთან კონტაქტს, ყოველდღიურად დიდ დროს ატარებენ პასიურ კონტენტთან, რომელიც არ ემსახურება მათ განვითარებას. ხშირ შემთხვევაში მსგავსი კონტენტი ბავშვებში იწვევს გადაღლილობას, გაღიზიანებას და ტვინის ზედმეტ სტიმულაციას.",
        "ანი ბანი არის ინტერაქციული თამაში, რომელშიც მთავარი გმირი — ბაჭია ანი, ბავშვებს მიუძღვება სასწავლო თავგადასავალში და ხელს უწყობს მათ აღმოაჩინონ სამყარო და გააძლიერონ ასაკის შესაბამისი უნარები.",
        "შემეცნებითი განვითარების პრინციპებზე დაყრდნობით, ანი ბანი ეხმარება ბავშვებს თამაშით გამოიმუშაონ ისეთი კოგნიტური, ენობრივი და მოტორული უნარები, როგორიცაა:"
      ],
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
      subtitle: "შეავსე ფორმა და გახდი პირველი, ვინც გამოცდის ანი ბანი-ს",
      email: "ელფოსტა",
      emailPlaceholder: "your@email.com",
      name: "სახელი",
      namePlaceholder: "შენი სახელი",
      childAge: "ბავშვის ასაკი",
      childAgePlaceholder: "აირჩიე ასაკი",
      recommendation: "როგორ შეიტყვე ჩვენ შესახებ?",
      recommendationPlaceholder: "მიწერე...",
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
      ctaPrimary: "Download",
      ctaSecondary: "Early Access"
    },
    about: {
      title: "About Ani Bani",
      paragraphs: [
        "From an early age, children are exposed to passive content that does not support their development — often leading to overstimulation, irritation, and emotional imbalance.",
        "Ani Bani is an interactive learning game where the main character, Ani the bunny, guides children through a playful learning adventure — helping them explore the world and develop age-appropriate skills.",
        "Built on child development principles, Ani Bani supports the development of:"
      ],
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
      subtitle: "Fill out the form and be the first to try Ani Bani",
      email: "Email",
      emailPlaceholder: "your@email.com",
      name: "Name",
      namePlaceholder: "Your name",
      childAge: "Child's Age",
      childAgePlaceholder: "Select age",
      recommendation: "How did you hear about us?",
      recommendationPlaceholder: "Tell us...",
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
