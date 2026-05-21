"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useLanguage } from "@/context/LanguageContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ANDROID_URL = "https://transfer.it/t/WBnuB2g1DL7L";

export default function WaitlistModal() {
  const { isOpen, close, source, prefillEmail } = useModal();
  const { t, lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"android" | "ios" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Apply prefilled email when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail(prefillEmail ?? "");
    }
  }, [isOpen, prefillEmail]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setEmail("");
        setSelectedPlatform(null);
        setError(null);
        setSuccess(false);
        setSubmitting(false);
      }, 200);
      return () => clearTimeout(timer);
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

  const handleAndroidClick = () => {
    setSelectedPlatform("android");
    window.open(ANDROID_URL, "_blank", "noopener,noreferrer");
  };

  const handleIosClick = () => {
    setSelectedPlatform("ios");
  };

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
          name: "",
          childAge: "",
          recommendation: "",
          sourceButton: source ? `${source}_ios_testflight` : "ios_testflight",
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

  const platformButtonClasses =
    "flex-1 px-8 py-3.5 rounded-full font-bold transition-colors bg-coral hover:bg-coral-dark text-white";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:px-4 sm:py-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg max-h-[100dvh] sm:max-h-[calc(100dvh-3rem)] bg-white rounded-t-3xl rounded-b-none sm:rounded-card shadow-2xl overflow-hidden animate-slideUp flex flex-col">
        <button
          onClick={close}
          aria-label={t.modal.close}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-cream hover:bg-beige flex items-center justify-center text-ink transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto flex-1">
          <div className="bg-gradient-to-br from-coral to-coral-light px-8 pt-10 pb-6 sm:pt-12 sm:pb-8 text-white text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">{t.modal.title}</h2>
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
            <div className="px-6 sm:px-8 py-5 sm:py-6">
              <p className="text-sm font-semibold text-ink mb-3">{t.modal.mobileSystemLabel}</p>

              <div className="flex gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleAndroidClick}
                  className={platformButtonClasses}
                >
                  {t.modal.androidButton}
                </button>
                <button
                  type="button"
                  onClick={handleIosClick}
                  className={platformButtonClasses}
                >
                  {t.modal.iosButton}
                </button>
              </div>

              {selectedPlatform === "ios" && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

                  <p className="text-sm text-body leading-relaxed">{t.modal.iosBodyText}</p>

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
          )}
        </div>
      </div>
    </div>
  );
}
