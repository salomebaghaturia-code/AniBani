// Client-side helpers for talking to the protected /api/admin endpoints

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("anibani-admin-token");
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("anibani-admin-token");
}

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = getAdminToken();
  return fetch(path, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
}

export async function adminGetJSON<T>(path: string): Promise<T> {
  const res = await adminFetch(path);
  if (res.status === 401) {
    clearAdminToken();
    if (typeof window !== "undefined") window.location.href = "/admin";
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoISO(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
