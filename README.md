# passout.club

The website for **Passout**, an informal week-long club-passing juggling gathering.
It's a static site built with [Astro](https://astro.build/) and published automatically
to GitHub Pages.

You do **not** need to know how to code to keep this site up to date. Everything you'd
edit lives in the **`content/`** folder at the top of this repository. (All the technical
machinery lives in **`web/`** — you can ignore it.) The two common jobs — **adding an
event** and **editing the homepage wording** — are explained below.

---

## ✏️ Common tasks (no coding needed)

### Add a new event

Each event is one folder. To add one, using the GitHub website:

1. Open the file [`content/events/_TEMPLATE.md.txt`](content/events/_TEMPLATE.md.txt)
   and copy the block it describes.
2. Create a new folder at `content/events/` named like `2026-virginia`
   (year + place, lowercase, no spaces). In the GitHub web editor you make a folder by
   typing `2026-virginia/index.md` as the new file's name.
3. Paste the template into that `index.md` and fill in the details (title, dates,
   location, a one-line summary, workshops, and a paragraph or two of text).
4. Add the photos:
   - Click **Add file → Upload files**.
   - Drag your photos in, and put them in a `photos` folder inside your event folder
     (so they end up at `content/events/2026-virginia/photos/`).
   - Name one of them to match the `cover:` line in your `index.md` (e.g. `cover.jpg`).
5. **Commit** the changes. Within a minute or two the site rebuilds and your event
   appears as its own section on the home page (under *Past events*), with a photo
   gallery built automatically from the folder.

That's it — you never edit any code, and you never list the photos anywhere. Just drop
them in the folder.

### Edit the homepage wording

Edit [`content/site/home.md`](content/site/home.md). It's plain text with simple
formatting. The big headline and the one-line tagline are the `heroTitle` and `tagline`
near the top; everything below is the page text.

---

## 🛠️ Running it on your own computer (optional, for developers)

Requires [Node.js](https://nodejs.org/) 18.20+ (or 20.3+ / 22+). All the technical
machinery lives in **`web/`**, so run the commands from there:

```bash
cd web
npm install        # install dependencies (first time only)
npm run dev        # preview at http://localhost:4321
npm run build      # produce the static site in web/dist/
npm run preview    # preview the built site
```

The bundled sample event (`2025-virginia`) uses generated placeholder images. To
regenerate them run `node web/scripts/make-placeholders.mjs` (from the repo root). Delete
that event folder and the script once you've added real events.

---

## 🌐 How publishing works (one-time setup)

- Every push to the `main` branch triggers the workflow in
  [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site
  and deploys it to GitHub Pages.
- In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

### Custom domain (passout.club)

The file [`web/public/CNAME`](web/public/CNAME) tells GitHub Pages to serve the site at
`passout.club`. To make the domain point at GitHub, add these DNS records at your domain
registrar:

| Type  | Name / Host | Value                                   |
| ----- | ----------- | --------------------------------------- |
| A     | `@`         | `185.199.108.153`                       |
| A     | `@`         | `185.199.109.153`                       |
| A     | `@`         | `185.199.110.153`                       |
| A     | `@`         | `185.199.111.153`                       |
| AAAA  | `@`         | `2606:50c0:8000::153`                   |
| AAAA  | `@`         | `2606:50c0:8001::153`                   |
| AAAA  | `@`         | `2606:50c0:8002::153`                   |
| AAAA  | `@`         | `2606:50c0:8003::153`                   |
| CNAME | `www`       | `<your-github-username>.github.io.`     |

Then, in **Settings → Pages → Custom domain**, enter `passout.club` and enable
**Enforce HTTPS** once the certificate is issued. (GitHub's current Pages IPs are listed
in their docs in case the addresses above ever change.)

---

## 📁 Where things live

```
content/             ← EVERYTHING YOU EDIT lives here
  events/            ← one folder per event (this is what you'll edit most)
  site/              ← homepage text (home.md)
web/                 ← all the technical machinery (you can ignore this)
  public/            ← files served as-is (CNAME, favicon)
  scripts/           ← one-off helpers (sample placeholder images)
  src/
    pages/           ← the site's pages (code — usually no need to touch)
    components/      ← reusable pieces: gallery, cards, header, footer (code)
    layouts/         ← the shared page shell (code)
    styles/global.css← colors and fonts live at the top of this file
```
