# Marketing site — navig8r.org

## Status: PREVIEW — awaiting sign-off

Do **not** point `navig8r.org` / `www` DNS at this service until the owner explicitly approves the preview.

| Item | Value |
|------|--------|
| App | `apps/www` (Vite static) |
| Render service | `navig8r-www` in `render.yaml` |
| Preview branch | `cursor/marketing-site-cf53` |
| Contact | Form → FormSubmit → `hello@navig8r.org` |
| Production domain | Pending sign-off |

## Sign-off checklist

- [ ] Copy / claims reviewed (products match what we actually ship)
- [ ] Visual design approved on desktop + mobile
- [ ] Contact form tested (FormSubmit activation email confirmed for `hello@`)
- [ ] `hello@navig8r.org` mailbox exists and is monitored
- [ ] Approve attaching custom domain in Render

## After sign-off

1. In Render → `navig8r-www` → Custom Domains → add `navig8r.org` and `www.navig8r.org`
2. At the registrar, add the CNAME/A records Render shows
3. Optionally switch blueprint `branch` from preview branch to `main` after merge
