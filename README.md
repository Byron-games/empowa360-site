# Empowa360: CRM website

Built from your 16 Figma screens. Plain HTML, CSS and JavaScript. No build step, no framework.

## Run it in VS Code
1. `File → Open Folder…` and pick this folder.
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server**.

Double-clicking `index.html` also works. Chart.js is bundled locally, so nothing needs a network except the Inter font from Google Fonts (falls back to your system font offline).

Flow: `index.html` (landing) → `signup.html` / `login.html` → `dashboard.html` and the 13 app pages.

## Use your own logo
Replace **`assets/logo.svg`** with your file (same name). That is the only step. It appears on every page.
- PNG logo? Save it as `assets/logo.png` and change `logo: 'assets/logo.svg'` to `'assets/logo.png'` near the top of `js/app.js`.
- Logo already contains the "Empowa360" wordmark? In `js/app.js`, find `brandHTML` and delete the `<span>…</span>` part.
- Rename the product: change `BRAND.name` in `js/app.js`.

## Change the browser-tab icon (favicon)
Replace **`assets/favicon.svg`** with your icon (square SVG is best). Every page already links to it.

## Social share image
`assets/og.png` (1200×630) is used for link previews. Replace it with your own.

## Light / dark mode
Moon/sun button in the top bar (and on landing/login/signup). The choice is remembered. All colors are CSS variables at the top of `css/app.css`, so changing `--primary` re-colors the whole site in both themes.

## Project map
```
index.html login.html signup.html          public pages
dashboard.html customers.html leads.html sales.html projects.html tasks.html
calendar.html invoices.html reports.html team.html messages.html profile.html settings.html
css/app.css      design system, shell, components   (tokens at the top)
css/pages.css    calendar, messages, settings, cards
css/site.css     landing + auth
js/app.js        sidebar/topbar, search (⌘K / Ctrl+K), modals, tables, charts, toasts
js/data.js       demo datasets + the add/edit forms  ← replace with API calls
js/theme.js      applies saved theme before first paint
```
The sidebar and top bar are rendered by `js/app.js` from one list (`NAV`), so adding a page means editing one place.

## What actually works
- Every table: real search, sort (click headers), filters and pagination. Customers 1,248 rows, Leads 1,847, Invoices 142, Tasks 32.
- Every "Add / Create / New" button opens a validated form. Items are saved in this browser (localStorage) and show up on the matching page, including when added from the dashboard's Quick Actions.
- Tasks: click a status to advance it; the stat cards recalculate. Invoices: view, download CSV, mark as paid. Reports: Download produces a CSV; new reports flip from Processing to Ready.
- Calendar: month / week / day views, prev/next/Today, click a day to add an event, click an event for details/delete.
- Messages: tabs, mark all read, send messages (with a simulated reply), attachments.
- Settings: six tabs, validated forms, integrations toggle, API key reveal/copy/regenerate. Settings → Data Management → "Reset demo data" clears everything you added.
- Collapsible sidebar (remembered), mobile drawer, notifications panel, profile menu, command palette.

## Placeholders to replace before launch
- **Auth is front-end only.** Login/signup validate and redirect; there is no account system. Google/Microsoft buttons show a "not connected" message.
- Footer links for Careers, Docs, Terms, Privacy, social profiles etc. show a "not built yet" toast, since those pages weren't in the Figma. Point them at real URLs.
- Landing-page customer logos and testimonials are the placeholder copy from your design. Use real, approved quotes.
- Stat-card numbers are from your Figma; table rows come from `js/data.js`.
- `sales@empowa360.com` (Enterprise "Contact Sales") is a placeholder address.

## Deliberate changes from the Figma
- Dashboard: "Upcoming Tasks" no longer overlaps the revenue chart.
- Invoices: "ACTIONS" header no longer renders vertically.
- Sales chart no longer overflows its card.
- Nav highlight is correct on every page (Figma highlighted Tasks on Messages, Team on Profile).
- One sidebar width across all pages (Figma mixed 202/220/240px).
- Calendar shows the full month, not one week. Landing feature cards have icons.
- Invoice numbers use the year of their dates (INV-2026-…).
- Light theme matches the design; dark theme is new.
