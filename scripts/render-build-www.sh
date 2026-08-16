#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../apps/www"
npm install
npm run build
