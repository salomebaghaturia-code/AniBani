// Shared shapes for the JSON storage files

export type WaitlistEntry = {
  id: number;
  email: string;
  name: string | null;
  child_age: string | null;
  recommendation: string | null;
  source_button: string | null;
  language: string | null;
  /** ISO 8601 string, e.g. "2026-04-09T08:36:38.000Z" */
  created_at: string;
};

/** clicks.json — keyed by ISO date "YYYY-MM-DD", inner map is buttonName → count. */
export type ClicksByDate = Record<string, Record<string, number>>;

export type SessionsDay = {
  total: number;
  unique: number;
  /** Distinct session IDs seen on this date — used to determine uniqueness. */
  session_ids: string[];
};

/** sessions.json — keyed by ISO date "YYYY-MM-DD". */
export type SessionsByDate = Record<string, SessionsDay>;

export const FILES = {
  WAITLIST: "waitlist.json",
  CLICKS: "clicks.json",
  SESSIONS: "sessions.json"
} as const;

export function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}
