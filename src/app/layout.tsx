import type { Metadata } from "next";
import Script from "next/script";
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

// Read at request time (server component) so we can flip these via env vars
// without rebuilding the image. Empty string -> falsy -> not rendered.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://anibani.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ani Bani — Learn, Think, Grow Through Play",
  description:
    "Ani Bani is an interactive educational app for children aged 3-7 that turns screen time into safe, structured developmental play.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Ani Bani — ბავშვების სასწავლო თამაში",
    description: "აქციე ბავშვის ეკრანთან გატარებული დრო განვითარებად",
    images: ["/images/hero/hero-full.png"]
  },
  // Renders <meta name="google-site-verification" content="..."> only when set
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${notoGeorgian.variable}`}>
      <body className="bg-cream">
        {/* Google Analytics 4 — only loaded when NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

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
