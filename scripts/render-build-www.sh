#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../apps/www"
npm install
# Optional: set VITE_TURNSTILE_SITE_KEY on the Render static site for Cloudflare Turnstile.
npm run build
