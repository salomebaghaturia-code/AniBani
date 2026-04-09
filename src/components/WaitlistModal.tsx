"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { useLanguage } from "@/context/LanguageContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistModal() {
  const { isOpen, close, source } = useModal();
  const { t, lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setEmail("");
        setName("");
        setChildAge("");
        setRecommendation("");
        setError(null);
        setSuccess(false);
        setSubmitting(false);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(t.modal.emailRequired);
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError(t.modal.emailInvalid);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          childAge,
          recommendation: recommendation.trim(),
          sourceButton: source,
          language: lang
        })
      });
      if (!res.ok) {
        setError(t.modal.error);
        setSubmitting(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError(t.modal.error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-card shadow-2xl overflow-hidden animate-slideUp">
        <button
          onClick={close}
          aria-label={t.modal.close}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-cream hover:bg-beige flex items-center justify-center text-ink transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gradient-to-br from-coral to-coral-light px-8 pt-10 pb-8 text-white text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-4">
            <Image src="/images/logo/logo-ka.png" alt="Ani Bani" width={64} height={64} />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t.modal.title}</h2>
          <p className="text-white/90 text-sm leading-relaxed">{t.modal.subtitle}</p>
        </div>

        {success ? (
          <div className="px-8 py-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="text-ink font-semibold text-lg mb-6">{t.modal.success}</p>
            <button
              onClick={close}
              className="px-8 py-3 bg-coral hover:bg-coral-dark text-white rounded-full font-semibold transition-colors"
            >
              {t.modal.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">
                {t.modal.email} <span className="text-coral">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.modal.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all text-ink"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">{t.modal.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.modal.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all text-ink"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">{t.modal.childAge}</label>
              <select
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all text-ink bg-white"
              >
                <option value="">{t.modal.childAgePlaceholder}</option>
                {["2", "3", "4", "5", "6", "7", "8+"].map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">{t.modal.recommendation}</label>
              <textarea
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                placeholder={t.modal.recommendationPlaceholder}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all text-ink resize-none"
              />
            </div>

            {error && (
              <div className="text-coral text-sm bg-coral/10 px-4 py-2 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-coral hover:bg-coral-dark disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full font-bold transition-colors text-base"
            >
              {submitting ? t.modal.submitting : t.modal.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
