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

- Determine delayed-offer visibility from the Vturb element's playback time, not a page-load timer, so resumed playback and seeking reveal the offer at the configured video threshold.
- Keep advertising head snippets inert until the shared browser consent controller records explicit acceptance; UTMify requires acceptance because it can collect form identifiers. Reload on withdrawal to stop third-party listeners without a revocation API.
