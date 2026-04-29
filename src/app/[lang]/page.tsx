import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Games from "@/components/Games";
import ParentPanel from "@/components/ParentPanel";
import Pricing from "@/components/Pricing";
import EmailCTA from "@/components/EmailCTA";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return [{ lang: "ka" }, { lang: "en" }];
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Games />
      <ParentPanel />
      {/* Pricing + EmailCTA share one continuous background scene */}
      <div className="relative overflow-hidden min-h-[600px] md:min-h-[700px] bg-beige">
        <Image
          src="/images/pricing-bg.png"
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          className="object-cover pointer-events-none select-none"
          style={{ objectPosition: "center center" }}
        />
        <Pricing />
        <EmailCTA />
      </div>
      <Footer />
    </main>
  );
}
