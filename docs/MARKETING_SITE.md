# Marketing site — navig8r.org

## Status: **APPROVED FOR PROD** (2026-08-16)

Owner sign-off received. Ship by merging this work to `main`, deploying Render service `navig8r-www`, then attaching DNS at OpenSRS.

| Item | Value |
|------|--------|
| App | `apps/www` (Vite static) |
| Render service | `navig8r-www` |
| Deploy branch | `main` (after merge) |
| Contact | Zoho Forms (free) embed → email notification to `hello@navig8r.org` |
| Explore CTA | Human check gate → `https://navig8r-customer.onrender.com/` |
| Registrar | OpenSRS |
| Logo / brand | Typographic wordmark in layout; official files in `apps/www/public/brand/` for selective manual use |
| Claims | Soft / professional; do not overstate unshipped features |
| Domains | `navig8r.org` + `www.navig8r.org` |
| Bot guard | Zoho Forms CAPTCHA on contact; Explore portal uses Turnstile when `VITE_TURNSTILE_SITE_KEY` is set, otherwise math + checkbox |

## Zoho Forms (contact)

Contact is a [Zoho Forms](https://www.zoho.com/forms/) **Free** embed (1 user, 3 forms, 500 submissions/month). Mail stays in the same Zoho org / `hello@navig8r.org` inbox.

### Create the form (once)

Sign in to Forms on the **same Zoho account / data center as Zoho Mail** (India mail is typically [forms.zoho.in](https://forms.zoho.in)).

1. **New form** named `NaviG8r contact`.
2. Fields:
   - Name (single line, required)
   - Work email (email, required)
   - I am a… (dropdown, required): Shipper / manufacturer / trader; Carrier / fleet / owner-operator; Investor / fund; Press / partner / other
   - Company (single line, optional)
   - How can we help? (multi-line, required)
3. **Settings → Form settings → CAPTCHA** → enable **Zoho Forms CAPTCHA** (included on Free; reCAPTCHA / Turnstile are paid).
4. **Settings → Email notifications** → on submit, send to **`hello@navig8r.org`** (include all answers in the body).
5. Optional: Themes → light / cream so the iframe sits on the marketing page.
6. **Share → Embed → iframe** → copy the `src` URL. It looks like:
   `https://forms.zohopublic.in/<portal>/form/NaviG8rcontact/formperma/<token>`
   (`.com` / `.eu` if your Zoho DC is not India.)

### Wire it into Render

On **navig8r-www** → **Environment**, add build-time:

- `VITE_ZOHO_FORM_PERMA` = the iframe `src` URL from step 6

Redeploy. Vite bakes the URL into the static site. Until this is set, the contact card shows a mailto fallback to `hello@navig8r.org`.

Local:

```bash
cd apps/www
VITE_ZOHO_FORM_PERMA='https://forms.zohopublic.in/.../formperma/...' npm run dev
```

## Explore portal human check

Explore portal still requires a human check before redirect.

1. Optional: create a free [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) site widget.
2. Allow hostnames: `navig8r-www.onrender.com`, `navig8r.org`, `www.navig8r.org`, and `localhost`.
3. On Render → **navig8r-www** → **Environment**, add:
   - `VITE_TURNSTILE_SITE_KEY` = Turnstile **site** key
4. Redeploy.

Without the key, Explore uses a checkbox + simple math challenge, honeypot, and minimum interaction time.


## Sign-off checklist

- [x] Logo / brand assets OK for v1 (selective manual later)
- [x] `hello@navig8r.org` mailbox active
- [x] Registrar noted (OpenSRS)
- [x] Soft claims policy confirmed
- [x] Explore CTA → customer portal confirmed
- [x] Preview approved for production
- [ ] PR merged to `main` + Render deploy green
- [ ] Custom domains added on Render `navig8r-www`
- [ ] OpenSRS DNS records live + TLS issued
- [ ] Zoho Forms created; CAPTCHA on; notify `hello@navig8r.org`
- [ ] `VITE_ZOHO_FORM_PERMA` set on `navig8r-www` + redeploy

## Production cutover (Render + OpenSRS)

### Note: Blueprint vs dashboard

If Render → **Blueprints** says you have no Blueprint instances, that only means you never applied `render.yaml` as IaC. Your existing `navig8r-api` / `navig8r-customer-web` services can still be **dashboard-created** in the same workspace. You do **not** need a Blueprint to ship `navig8r-www`.

**Recommended for v1:** create a **Static Site** manually (same path as customer-web).  
Optional later: **New → Blueprint** → connect this repo to adopt `render.yaml` for future syncs (match existing service names carefully to avoid duplicates).

### 1. Create `navig8r-www` (manual Static Site)

In the **same Render workspace** as your API / customer web:

1. **New → Static Site**
2. Connect repo `uwais/naviG8r`, branch **`main`** (merge PR #88 first if not merged)
3. Settings:
   - **Name:** `navig8r-www`
   - **Build command:** `bash scripts/render-build-www.sh`
   - **Publish directory:** `apps/www/dist`
4. Deploy and confirm the `*.onrender.com` URL loads the marketing site.

SPA fallback (if a deep link 404s): Static Site → **Redirects/Rewrites** → rewrite `/*` → `/index.html` (source: rewrite).

### 2. Attach custom domains (Render Dashboard)

On **navig8r-www** → **Settings** → **Custom Domains**:

1. Add **`www.navig8r.org`**
2. Add **`navig8r.org`** (apex)
3. Copy the DNS targets Render displays (exact values can vary by account). Typical pattern:

| Host (OpenSRS) | Type | Target (example — use Render’s values) |
|----------------|------|----------------------------------------|
| `www` | CNAME | `navig8r-www.onrender.com` *(or the hostname Render shows)* |
| `@` (apex) | ALIAS / ANAME / or A records | Exactly as Render lists for apex |

If OpenSRS has no ALIAS/ANAME for apex, use the **A** records Render provides for the root domain, or CNAME-flattening if your DNS plan supports it.

### 3. OpenSRS DNS

1. Log in to OpenSRS → domain **navig8r.org** → DNS management.
2. Add/update the records from step 2.
3. Remove conflicting old A/CNAME records for `@` / `www` if any.
4. Wait for propagation (often minutes; up to 24–48h worst case).
5. Back in Render, wait until both domains show **Verified** / certificate **Issued**.

### 4. Post-cutover checks

- [ ] `https://www.navig8r.org` loads
- [ ] `https://navig8r.org` loads (and redirects or serves same site as preferred)
- [ ] Contact form: submit once; confirm Zoho notification arrives at `hello@`
- [ ] Mobile + desktop smoke on Products / Contact
- [ ] Optional: set preferred canonical to `https://navig8r.org` or `www` consistently

## Brand logos (manual / selective)

Official logo files are in **`apps/www/public/brand/`** but **not wired site-wide**.  
Update one surface at a time later: see [`apps/www/public/brand/README.md`](../apps/www/public/brand/README.md).

## Local preview

```bash
cd apps/www && npm install && npm run dev
```
