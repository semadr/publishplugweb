<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
- Quote math lives only in `src/lib/pricing.ts` (pure, tested in `pricing.test.ts`); UI and pages call it — never duplicate price formulas.
- The services table is the price source of truth (`base_price` = Standard, `premium_price` = Premium for `tiered` services); a DB trigger re-prices author-inserted order lines from service code + quantity + tier.
- Packages are single tiered service lines (`pkg_*`); the services they include are listed in `PACKAGES[...].includes` and are not charged separately.
- Project stage rules (author may only go draft→quoted→ordered, order gates for rights/consent/custom quotes) are enforced by a DB trigger, not just UI; staff move later stages.
- Orders are placed only through the `pay_for_book` DB function (test-mode card checkout; card checks in `src/lib/test-card.ts`); it sums order prices server-side.
- Signed-in pages live under `src/routes/_authenticated/` and read data with the browser client + RLS via query options in `src/lib/books.ts` / `src/lib/workspace.ts`.
- Staff UI is gated by `useIsStaff` (reads `user_roles`) only as a hint; RLS and triggers enforce staff permissions.
- Public pages read the catalog through the `listServices` server function (publishable key), so SSR works signed-out.
- Logos are CDN assets (`src/assets/*.asset.json`), rendered by `components/brand/logo.tsx`; theme tokens use `brand`, `flame`, `sun` names in `src/styles.css`.
<!-- AGENT-MEMORY:END -->

