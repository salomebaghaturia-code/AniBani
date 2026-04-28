# Deploy notes

## Cloud Run deploy workflow

1. Generate `env.yaml` from `.env.local`. **Every var in `.env.local` must end up in `env.yaml`** — `gcloud run deploy --env-vars-file` replaces the entire env block, it does not merge.
2. Swap `ADMIN_JWT_SECRET` to the production value (it is intentionally the local dev value in `.env.local`).
3. Deploy:
   ```bash
   CLOUDSDK_PYTHON=/c/ProgramData/anaconda3/python.exe gcloud run deploy anibani-app \
     --source . --region europe-west1 --env-vars-file env.yaml --allow-unauthenticated
   ```
4. Delete `env.yaml` immediately after the deploy finishes.

## Required env vars for the live service

| Var | Source of truth |
|---|---|
| `ADMIN_USERNAME` | `.env.local` |
| `ADMIN_PASSWORD` | `.env.local` |
| `ADMIN_JWT_SECRET` | **prod value, NOT the one in `.env.local`** |
| `GCS_BUCKET_NAME` | `.env.local` (must be `anibani-data-plasma`) — without this, `src/lib/storage.ts` falls back to ephemeral local FS and silently loses writes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | `.env.local` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `.env.local` (may be empty) |

## Regression that motivated this doc

On 2026-04-10 09:02 UTC, revision 00012 was deployed with an `env.yaml` generated from a partial `.env.local` containing only the three `ADMIN_*` vars. `GCS_BUCKET_NAME` and the three `NEXT_PUBLIC_*` vars were dropped. The app fell back to local-FS storage (`/app/data/`), writes went to ephemeral container disk and were lost on every container restart. ~60 registrations between 2026-04-10 and 2026-04-24 went to ephemeral memory, and only the 2026-04-14 → 2026-04-18 window survived (via a long-lived warm container and a manual Excel export). The fix was to (a) restore `GCS_BUCKET_NAME` to the env, and (b) add the prod-only vars to `.env.local` so they cannot be dropped from the next env.yaml generation.
