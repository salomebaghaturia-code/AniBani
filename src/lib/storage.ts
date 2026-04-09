/**
 * JSON storage abstraction with two backends:
 *
 *   - LOCAL  (default)            — reads/writes files in <projectRoot>/data/
 *   - GCS    (when GCS_BUCKET_NAME is set, e.g. on Cloud Run) — uses Google Cloud Storage
 *
 * Same public API for both: readJSON / writeJSON / withLock / updateJSON.
 *
 * Concurrency: in-process per-file Promise lock chain. This is sufficient for a single
 * Cloud Run instance. If you scale to multiple instances, you'll need a distributed lock
 * (e.g. GCS preconditions on the generation number, or Firestore).
 */

import { promises as fs } from "fs";
import path from "path";

// ---------- Lock chain (same shape regardless of backend) ----------

const lockTails = new Map<string, Promise<void>>();

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
  }
}

// ---------- Backend selection ----------

const GCS_BUCKET = process.env.GCS_BUCKET_NAME?.trim() || "";
const useGCS = GCS_BUCKET.length > 0;

function isValidFilename(filename: string): boolean {
  return !filename.includes("/") && !filename.includes("\\") && !filename.includes("..");
}

function assertValid(filename: string): void {
  if (!isValidFilename(filename)) {
    throw new Error(`Invalid storage filename: ${filename}`);
  }
}

// ---------- LOCAL filesystem backend ----------

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureLocalDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

async function readJSONLocal<T>(filename: string, defaultValue: T): Promise<T> {
  await ensureLocalDir();
  const fp = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(fp, "utf-8");
    if (!raw.trim()) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") return defaultValue;
    if (err instanceof SyntaxError) {
      console.warn(`[storage:local] ${filename} is corrupt, returning default:`, err.message);
      return defaultValue;
    }
    throw err;
  }
}

async function writeJSONLocal<T>(filename: string, data: T): Promise<void> {
  await ensureLocalDir();
  const fp = path.join(DATA_DIR, filename);
  const tmp = `${fp}.tmp.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2, 8)}`;
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(tmp, json, "utf-8");
  await fs.rename(tmp, fp);
}

// ---------- GCS backend ----------
//
// We lazy-import @google-cloud/storage so the local-dev path doesn't pay the
// require cost (and so the bundled standalone server doesn't need GCS creds
// to start when running locally).

type GCSBucket = {
  file(name: string): {
    download(): Promise<[Buffer]>;
    save(data: string, opts?: { contentType?: string; resumable?: boolean }): Promise<unknown>;
    exists(): Promise<[boolean]>;
  };
};

let cachedBucket: GCSBucket | null = null;
async function getBucket(): Promise<GCSBucket> {
  if (cachedBucket) return cachedBucket;
  const { Storage } = await import("@google-cloud/storage");
  const storage = new Storage();
  cachedBucket = storage.bucket(GCS_BUCKET) as unknown as GCSBucket;
  return cachedBucket;
}

async function readJSONGCS<T>(filename: string, defaultValue: T): Promise<T> {
  const bucket = await getBucket();
  const file = bucket.file(filename);
  try {
    const [buf] = await file.download();
    const raw = buf.toString("utf-8");
    if (!raw.trim()) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    const code = (err as { code?: number | string })?.code;
    // 404 from GCS = object doesn't exist yet
    if (code === 404 || code === "404") return defaultValue;
    if (err instanceof SyntaxError) {
      console.warn(`[storage:gcs] ${filename} is corrupt, returning default:`, err.message);
      return defaultValue;
    }
    console.error(`[storage:gcs] readJSON ${filename} error:`, err);
    throw err;
  }
}

async function writeJSONGCS<T>(filename: string, data: T): Promise<void> {
  const bucket = await getBucket();
  const file = bucket.file(filename);
  const json = JSON.stringify(data, null, 2);
  // resumable: false → faster for small JSON files
  await file.save(json, { contentType: "application/json; charset=utf-8", resumable: false });
}

// ---------- Public API (dispatches to selected backend) ----------

export async function readJSON<T>(filename: string, defaultValue: T): Promise<T> {
  assertValid(filename);
  return useGCS ? readJSONGCS(filename, defaultValue) : readJSONLocal(filename, defaultValue);
}

export async function writeJSON<T>(filename: string, data: T): Promise<void> {
  assertValid(filename);
  return useGCS ? writeJSONGCS(filename, data) : writeJSONLocal(filename, data);
}

/** Convenient read-modify-write helper, with locking. */
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

/** Diagnostic — exported so the admin layer can show which backend is in use. */
export function getStorageBackend(): "gcs" | "local" {
  return useGCS ? "gcs" : "local";
}
