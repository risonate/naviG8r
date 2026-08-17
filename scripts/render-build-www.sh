#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../apps/www"
npm install
# Optional build-time env (Render Dashboard):
#   VITE_ZOHO_FORM_PERMA — Zoho Forms iframe src
#   VITE_TURNSTILE_SITE_KEY — Explore portal Turnstile site key
npm run build
