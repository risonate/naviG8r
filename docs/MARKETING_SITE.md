# Marketing site — navig8r.org

## Status: **APPROVED FOR PROD** (2026-08-16)

Owner sign-off received. Ship by merging this work to `main`, deploying Render service `navig8r-www`, then attaching DNS at OpenSRS.

| Item | Value |
|------|--------|
| App | `apps/www` (Vite static) |
| Render service | `navig8r-www` |
| Deploy branch | `main` (after merge) |
| Contact | Form → FormSubmit → `hello@navig8r.org` (mailbox active) |
| Registrar | OpenSRS |
| Logo / brand | Typographic wordmark in layout; official files in `apps/www/public/brand/` for selective manual use |
| Explore CTA | `https://navig8r-customer-web.onrender.com/` |
| Claims | Soft / professional; do not overstate unshipped features |
| Domains | `navig8r.org` + `www.navig8r.org` |

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
- [ ] FormSubmit activation confirmed (first real form submit → confirm email from FormSubmit)

## Production cutover (Render + OpenSRS)

### 1. Merge & deploy

1. Merge PR to `main` (blueprint already sets `navig8r-www` → `branch: main`).
2. In Render, confirm service **`navig8r-www`** builds from `main` and the `*.onrender.com` URL loads the marketing site.

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
- [ ] Contact form: submit once; complete FormSubmit confirmation email to `hello@` if prompted
- [ ] Mobile + desktop smoke on Products / Contact
- [ ] Optional: set preferred canonical to `https://navig8r.org` or `www` consistently

## Brand logos (manual / selective)

Official logo files are in **`apps/www/public/brand/`** but **not wired site-wide**.  
Update one surface at a time later: see [`apps/www/public/brand/README.md`](../apps/www/public/brand/README.md).

## Local preview

```bash
cd apps/www && npm install && npm run dev
```
