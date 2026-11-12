# Bret Michael Dumaraos — Personal Portfolio

A responsive, buildless portfolio for GitHub Pages. Includes an Alpine.js perspective hover gallery with expandable project previews, keyboard focus and touch support; original-proportion screenshot galleries; outbound project links; entrance and hover animations; reduced-motion support; email copying; and a downloadable contact card. Alpine.js 3.14.9 and its MIT license are bundled in assets/vendor; no CDN is needed for the gallery.

## Publish on GitHub Pages

1. Create a GitHub repository named `YOUR-USERNAME.github.io` for a root website (or any repository name for a project website).
2. Upload `index.html`, `styles.css`, `script.js`, `.nojekyll`, and the complete `assets` folder to the repository root.
3. In the repository, open **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/(root)**. Save.
4. Once GitHub displays the published URL, use that URL as the destination for your calling-card QR code. Test it on a phone before printing.

All asset paths are relative, so both root and project GitHub Pages URLs work. No npm install, build step, API key, or server is needed.

## Update your portfolio

- Edit project names, descriptions, links, and image lists in `script.js`.
- Project links point to the supplied CAAP, OFSAM, infrastructure monitoring, and online payment URLs. Completion statuses are not assumed.
- Project previews retain the originally supplied screenshots; linked websites are not used as image sources.
- Edit your bio and credentials in `index.html`, and your contact card in `assets/bret-dumaraos.vcf`.
- Replace PNG files in `assets` to refresh project screenshots. Review screenshots before public release to ensure all displayed information is intended for your portfolio.
- Colors, layout, and responsive breakpoints are in `styles.css`.

Google Fonts is optional: the site falls back to system fonts if unavailable. All imagery is stored locally.

## Local preview

With XAMPP Apache running, open `http://localhost/bret.dumaraos/`. You can also open `index.html` directly; clipboard access depends on browser permissions and a secure context. GitHub Pages serves over HTTPS.




## Added portfolio features

- Dark mode follows the system initially and remembers the visitor's selection.
- Project dialogs include purpose, workflow, and original screenshots.
- The independent-work section currently features this portfolio.
- The résumé PDF is in `assets/bret-dumaraos-resume.pdf`.
- Credential details include supplied organization/training-provider names. Add certificate image paths and verification URLs in the `credentialEvidence` array in `script.js`.
- Add a portrait path to `profileAssets.portrait` in `script.js` when available. No portrait or certificate image is displayed until a file is supplied.
