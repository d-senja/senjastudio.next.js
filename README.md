# Senja Studio — Next.js

## How it works

**One change, updates everywhere:**
- `components/Layout.js` — nav, footer, modal, dark mode, WhatsApp, cookie bar. Edit once.
- `styles/globals.css` — all CSS. Edit once.
- `pages/` — each file is one page. Only the unique content lives here.

## File structure

```
pages/
  index.js              ← Homepage
  blog/
    index.js            ← Blog listing
    [slug].js           ← Individual blog articles (dynamic)
  examples.js
  glossary.js
  privacy-policy.js
  terms.js
  404.js
  [city].js             ← Location pages
components/
  Layout.js             ← Nav + Footer + Modal + Dark mode + WhatsApp + Cookie bar
styles/
  globals.css           ← All styles
public/
  dan-photo.png
  dan-photo-about.png
  og-image.png
  favicon-32x32.png
  (etc)
```

## To add a new page

Create `pages/new-page.js`:

```jsx
import Layout from '../components/Layout'

export default function NewPage() {
  return (
    <Layout title="Page Title" description="Meta description" canonical="/new-page">
      <h1>Your content here</h1>
    </Layout>
  )
}
```

That's it. Nav, footer, dark mode, modal — all included automatically.

## To change the nav links

Edit `components/Layout.js` → find `const navLinks = [...]` → done. All pages update instantly.

## To change the footer

Edit `components/Layout.js` → find `function Footer()` → done. All pages update instantly.

## Deployment

Push to GitHub. Vercel auto-detects Next.js and deploys.
