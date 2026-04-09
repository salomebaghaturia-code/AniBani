// Client-side analytics helpers

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("anibani-session-id");
  if (!id) {
    id = uuid();
    localStorage.setItem("anibani-session-id", id);
  }
  return id;
}

export async function trackSession(): Promise<void> {
  if (typeof window === "undefined") return;
  const sessionId = getOrCreateSessionId();
  try {
    await fetch("/api/analytics/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId })
    });
  } catch {
    // Silently fail — analytics shouldn't break UX
  }
}

export async function trackClick(buttonName: string): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/analytics/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buttonName })
    });
  } catch {
    // Silently fail
  }
}
