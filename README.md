# Luke Cross | Personal Website

The source for [lukey.dev](https://lukey.dev), the personal site of Luke Cross, Engineering Manager. It is a single-page portfolio built with plain HTML, CSS and a small amount of vanilla JavaScript. There is no build step, framework or dependency to install, and it is hosted on GitHub Pages.

## Features

### Content
- **Hero introduction** with name, role, tagline and a short list of focus areas (leading teams, growing engineers, shipping software).
- **Contact and CV links**: a LinkedIn button and a downloadable PDF CV. Both have a playful hover label.
- **"Currently" strip** summarising what I'm up to at the moment.
- **Games shelf** showcasing side projects, currently [Blorbit](https://blorbit.io), plus a placeholder card for what's next.

### Interactivity
- **Time-aware greeting** that changes with the time of day (morning, afternoon, evening, late night) and doubles as a speech bubble.
- **Illustrated avatar** (inline SVG) with eyes that follow the cursor and blink at random intervals. Clicking it cycles through a set of messages.
- **Cereal bowl** that can be clicked to "crunch". It animates a random hoop, keeps a running count and reacts at certain milestones.
- **Staggered reveal animation** on page load.
- **Faint background doodles** for a bit of texture.

### Theming
- **Light and dark themes** with a lamp-shaped toggle in the corner.
- **Smart default**: with no saved choice, the site uses dark mode at night (19:00 to 06:00) or when the system prefers it. The theme is applied before first paint to avoid a flash.
- **Persistence** of the visitor's choice in `localStorage`.
- **Browser `theme-color`** updates to match the active theme.

### Accessibility
- Skip-to-content link and semantic landmarks and headings.
- Interactive elements are real buttons and links with descriptive `aria-label`s, and the theme toggle exposes `aria-pressed`.
- The greeting is a live region (`role="status"`), so changes are announced.
- Decorative graphics are hidden from assistive technology.
- `prefers-reduced-motion` is respected: the cursor-following eyes, blinking and crunch animations are disabled.

### SEO and sharing
- Descriptive `<title>`, meta description and canonical URL.
- Open Graph and Twitter Card tags with a 1200x630 share image.
- SVG and ICO favicons.

### Responsive design
- Fluid layout with breakpoints at 900px and 520px.
- Fonts are [Fraunces](https://fonts.google.com/specimen/Fraunces) and [DM Sans](https://fonts.google.com/specimen/DM+Sans), loaded from Google Fonts.

## Project structure

```
.
├── index.html        # Page markup, metadata and inline SVG artwork
├── style.css         # Styles, theme variables, layout and animations
├── script.js         # Theme toggle, greeting, avatar and bowl interactions
├── favicon.svg/.ico  # Site icons
├── CNAME             # Custom domain for GitHub Pages (lukey.dev)
├── files/            # Downloadable CV (PDF)
└── images/
    ├── og-image.png  # Social share card
    └── games/        # Artwork for the games shelf
```

## Running locally

No tooling is required. Open `index.html` in a browser, or serve the folder with any static server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customising

- **Colours and themes**: edit the CSS custom properties at the top of `style.css`. The light palette is in `:root` and the dark one is under `[data-theme="dark"]`.
- **Greeting and avatar messages**: edit `greetingForNow()` and the `lines` array in `script.js`.
- **Games**: add a list item to `.game-list` in `index.html` and drop its icon into `images/games/`.
- **CV**: replace `files/luke-cross-cv.pdf`.

## Deployment

The site is served by GitHub Pages straight from the `master` branch. Pushing to `master` publishes the change, and the `CNAME` file maps it to [lukey.dev](https://lukey.dev).
