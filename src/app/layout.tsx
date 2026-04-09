import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ModalProvider } from "@/context/ModalContext";
import WaitlistModal from "@/components/WaitlistModal";
import SessionTracker from "@/components/SessionTracker";

const notoGeorgian = localFont({
  src: [
    { path: "../../public/fonts/NotoSansGeorgian-Thin.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/NotoSansGeorgian-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/NotoSansGeorgian-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/NotoSansGeorgian-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/NotoSansGeorgian-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/NotoSansGeorgian-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/NotoSansGeorgian-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/NotoSansGeorgian-Black.ttf", weight: "900", style: "normal" }
  ],
  variable: "--font-noto",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Ani Bani — Learn, Think, Grow Through Play",
  description:
    "Ani Bani is an interactive educational app for children aged 3-7 that turns screen time into safe, structured developmental play.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Ani Bani — ბავშვების სასწავლო თამაში",
    description: "აქციე ბავშვის ეკრანთან გატარებული დრო განვითარებად",
    images: ["/images/hero/hero-full.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${notoGeorgian.variable}`}>
      <body className="bg-cream">
        <LanguageProvider>
          <ModalProvider>
            <SessionTracker />
            {children}
            <WaitlistModal />
          </ModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
