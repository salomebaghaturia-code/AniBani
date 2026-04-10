import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Games from "@/components/Games";
import ParentPanel from "@/components/ParentPanel";
import Pricing from "@/components/Pricing";
import EmailCTA from "@/components/EmailCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Games />
      <ParentPanel />
      {/* Meadow scene spans both Pricing and EmailCTA as one continuous background */}
      <div className="relative overflow-hidden min-h-[600px] md:min-h-[700px] bg-beige">
        <Image
          src="/images/backgrounds/meadow-scene.png"
          alt=""
          fill
          aria-hidden
          className="object-cover pointer-events-none select-none"
          style={{ objectPosition: "center 60%" }}
        />
        <Pricing />
        <EmailCTA />
      </div>
      <Footer />
    </main>
  );
}
