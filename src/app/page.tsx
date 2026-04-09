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
      <Pricing />
      <EmailCTA />
      <Footer />
    </main>
  );
}
