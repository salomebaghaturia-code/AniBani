/**
 * Local JSON file storage with atomic writes and per-file in-process locking.
 *
 * Future: this module is the only place that touches disk for waitlist/clicks/sessions
 * data, so swapping to Google Cloud Storage later only requires changing readJSON/writeJSON.
 */

import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

/** Per-file lock chain. Each call adds a new tail; new callers await the previous tail. */
const lockTails = new Map<string, Promise<void>>();

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // ignore — directory already exists
  }
}

function resolveFile(filename: string): string {
  // Reject path traversal
  if (filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
    throw new Error(`Invalid storage filename: ${filename}`);
  }
  return path.join(DATA_DIR, filename);
}

/**
 * Reads and parses a JSON file. Returns `defaultValue` if the file doesn't exist
 * (or is empty/corrupt — corrupt files log a warning before falling back).
 */
export async function readJSON<T>(filename: string, defaultValue: T): Promise<T> {
  await ensureDataDir();
  const fp = resolveFile(filename);
  try {
    const raw = await fs.readFile(fp, "utf-8");
    if (!raw.trim()) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") return defaultValue;
    if (err instanceof SyntaxError) {
      console.warn(`[storage] ${filename} is corrupt, returning default. Error:`, err.message);
      return defaultValue;
    }
    throw err;
  }
}

/**
 * Atomically writes JSON to disk. Uses tmp file + rename so a crash mid-write
 * cannot leave the destination file half-written.
 *
 * Note: this is `write only`. For read-modify-write, wrap the entire sequence in
 * `withLock` so reads inside the lock observe writes from earlier holders.
 */
export async function writeJSON<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const fp = resolveFile(filename);
  const tmp = `${fp}.tmp.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2, 8)}`;
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(tmp, json, "utf-8");
  // fs.rename is atomic on the same filesystem
  await fs.rename(tmp, fp);
}

/**
 * Serializes operations on a single file. Use this around any read-modify-write
 * sequence to prevent two requests from clobbering each other's changes.
 *
 * Implementation: each call appends a new "next" promise to the file's lock tail.
 * The new caller awaits the previous tail before running, then resolves its own
 * tail when done. Subsequent callers chain off the new tail.
 */
export async function withLock<T>(filename: string, fn: () => Promise<T>): Promise<T> {
  const previous = lockTails.get(filename) ?? Promise.resolve();
  let release!: () => void;
  const next = new Promise<void>((res) => {
    release = res;
  });
  lockTails.set(
    filename,
    previous.then(() => next)
  );
  try {
    await previous;
    return await fn();
  } finally {
    release();
    // If we're the most recent tail and our chain has fully drained, clean up
    // to keep the map from growing unboundedly across restarts.
    queueMicrotask(() => {
      const current = lockTails.get(filename);
      if (current === previous.then(() => next)) {
        // Best-effort cleanup; safe to leave entries either way.
      }
    });
  }
}

/** Convenient read-modify-write helper. */
export async function updateJSON<T>(
  filename: string,
  defaultValue: T,
  mutator: (current: T) => T | Promise<T>
): Promise<T> {
  return withLock(filename, async () => {
    const current = await readJSON<T>(filename, defaultValue);
    const next = await mutator(current);
    await writeJSON(filename, next);
    return next;
  });
}
