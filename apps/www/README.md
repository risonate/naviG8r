# NaviG8r marketing site (`apps/www`)

Public marketing site for **navig8r.org** (preview first; custom domain only after sign-off).

## Local

```bash
cd apps/www
npm install
npm run dev
```

## Build

```bash
cd apps/www
npm install
npm run build
# output: apps/www/dist
```

## Contact form

The contact form is a [Zoho Forms](https://www.zoho.com/forms/) Free embed. Submissions notify `hello@navig8r.org` (same Zoho Mail inbox).

**Setup:** CAPTCHA and email notification are configured in Zoho Forms. The iframe URL is baked into the site; override with `VITE_ZOHO_FORM_PERMA` if you recreate the form (see [`docs/MARKETING_SITE.md`](../../docs/MARKETING_SITE.md)).

## Preview vs production

1. Deploy the Render static service `navig8r-www` (see root `render.yaml`).
2. Share the `*.onrender.com` preview URL for design/copy sign-off.
3. Only after written approval, attach custom domain `navig8r.org` / `www.navig8r.org` in Render DNS.
