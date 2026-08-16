# Marketing site — navig8r.org

## Status: PREVIEW — awaiting final prod sign-off

Do **not** point `navig8r.org` / `www` DNS at this service until the owner explicitly approves production cutover.

| Item | Value |
|------|--------|
| App | `apps/www` (Vite static) |
| Render service | `navig8r-www` in `render.yaml` |
| Preview branch | `cursor/marketing-site-cf53` |
| Contact | Form → FormSubmit → `hello@navig8r.org` (mailbox active) |
| Registrar | OpenSRS |
| Logo / brand | Typographic wordmark in layout for now; official files kept in `apps/www/public/brand/` for selective manual use |
| Explore CTA | Links to shipper portal `https://navig8r-customer-web.onrender.com/` |
| Claims | Soft / professional; do not overstate unshipped features |
| Production domain | Pending explicit prod approval |

## Sign-off checklist

- [x] Logo / brand assets OK for v1
- [x] `hello@navig8r.org` mailbox active
- [x] Registrar noted (OpenSRS)
- [x] Soft claims policy confirmed
- [x] Explore CTA → customer portal confirmed
- [ ] Visual / copy approved on preview (incl. “Built to Deliver” audience heading)
- [ ] FormSubmit activation confirmed from `hello@`
- [ ] Approve attaching custom domain in Render

## Brand logos

Official logo files are stored in `apps/www/public/brand/` for **selective manual placement later**.  
They are **not** applied site-wide in the current preview (full auto-swap felt jarring on hero/header/footer).

See **`apps/www/public/brand/README.md`** for which asset to use where, safe order of updates (favicon → header → footer → hero), and QA checks.

## After sign-off

1. In Render → `navig8r-www` → Custom Domains → add `navig8r.org` and `www.navig8r.org`
2. At OpenSRS, add the CNAME/A records Render shows
3. Optionally switch blueprint `branch` from preview branch to `main` after merge
