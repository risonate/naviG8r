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

**Setup:** create the form in the same Zoho org as Mail, enable Zoho Forms CAPTCHA, set the email notification to `hello@navig8r.org`, then put the iframe `src` in `VITE_ZOHO_FORM_PERMA` (see [`docs/MARKETING_SITE.md`](../../docs/MARKETING_SITE.md)). Until that env is set, the page shows a mailto fallback.

## Preview vs production

1. Deploy the Render static service `navig8r-www` (see root `render.yaml`).
2. Share the `*.onrender.com` preview URL for design/copy sign-off.
3. Only after written approval, attach custom domain `navig8r.org` / `www.navig8r.org` in Render DNS.
