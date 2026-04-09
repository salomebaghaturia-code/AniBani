"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SubPageLayout({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <section className="bg-cream py-16 md:py-24">
        <div className="container-page max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-ink mb-8 text-center">
            {title}
          </h1>
          <div className="prose prose-lg max-w-none text-body leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-base [&_p]:leading-relaxed [&_a]:text-coral [&_a]:underline">
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
