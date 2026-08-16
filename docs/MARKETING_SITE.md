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
| Logo / brand | Wordmark + mark OK for v1 |
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

## After sign-off

1. In Render → `navig8r-www` → Custom Domains → add `navig8r.org` and `www.navig8r.org`
2. At OpenSRS, add the CNAME/A records Render shows
3. Optionally switch blueprint `branch` from preview branch to `main` after merge
