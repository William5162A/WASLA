<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The Wasla app lives in src/wasla/WaslaApp.jsx (ported from the single-file HTML prototype) and renders client-only from src/routes/index.tsx; why: keeps prototype behavior intact while its view state drives navigation.
- Colors come from @theme tokens in src/styles.css (wasla*, ink, muted, sand, overridden slate scale); why: the ported markup uses those class names, so restyling happens in one place.
