import { notFound } from "next/navigation";
import type { Lang } from "@/lib/translations";

const SUPPORTED: Lang[] = ["ka", "en"];

export function generateStaticParams() {
  return SUPPORTED.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!SUPPORTED.includes(params.lang as Lang)) {
    notFound();
  }
  return <>{children}</>;
}
