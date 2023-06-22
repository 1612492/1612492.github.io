---
layout: '../../layouts/PostLayout.astro'
title: Optimize my website
description: Rely on lighthouse report to optimize my website
pubDate: 2023-06-22T07:00:00Z
imgSrc: '/assets/images/lighthouse.jpeg'
imgAlt: 'MSW'
---

## Improve accessibility

- Add **aria-label** for **a** tags

```html
<a href="https://twitter.com/phatvo0509" aria-label="twitter" target="_blank" rel="noreferrer">
  <!---->
</a>
```

- Add **alt** attribute for all **img** tags

```html
<img src="/assets/images/twitter.png" alt="twitter" />
```

- Improve text color contrast with [Contrast checker](https://dequeuniversity.com/rules/axe/4.6/color-contrast)

Example (with tailwind CSS):

From:

```javascript
const colors = {
  red: 'bg-red-400 text-red-900',
  orange: 'bg-orange-400 text-orange-900',
  amber: 'bg-amber-400 text-amber-900',
  lime: 'bg-lime-400 text-lime-900',
  green: 'bg-green-400 text-green-900',
  emerald: 'bg-emerald-400 text-emerald-900',
  teal: 'bg-teal-400 text-teal-900',
  cyan: 'bg-cyan-400 text-cyan-900',
  sky: 'bg-sky-400 text-sky-900',
  blue: 'bg-blue-400 text-blue-900',
  indigo: 'bg-indigo-400 text-indigo-900',
  violet: 'bg-violet-400 text-violet-900',
  purple: 'bg-purple-400 text-purple-900',
  fuchsia: 'bg-fuchsia-400 text-fuchsia-900',
  pink: 'bg-pink-400 text-pink-900',
  rose: 'bg-rose-400 text-rose-900',
};
```

To:

```javascript
const colors = {
  red: 'bg-red-800 text-white',
  orange: 'bg-orange-800 text-white',
  amber: 'bg-amber-800 text-white',
  lime: 'bg-lime-800 text-white',
  green: 'bg-green-800 text-white',
  emerald: 'bg-emerald-800 text-white',
  teal: 'bg-teal-800 text-white',
  cyan: 'bg-cyan-800 text-white',
  sky: 'bg-sky-800 text-white',
  blue: 'bg-blue-800 text-white',
  indigo: 'bg-indigo-800 text-white',
  violet: 'bg-violet-800 text-white',
  purple: 'bg-purple-800 text-white',
  fuchsia: 'bg-fuchsia-800 text-white',
  pink: 'bg-pink-800 text-white',
  rose: 'bg-rose-800 text-white',
};
```

## Improve SEO

- Add description

```html
<meta name="description" content="Eric's blog" />
```

- Add Open Graph meta tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@phatvo0509" />
<meta name="twitter:title" content="Eric's Blog" />
<meta name="twitter:image" content="https://eric-d.netlify.app/assets/images/card.jpeg" />
<meta property="og:title" content="Eric's Blog" />
<meta property="og:url" content="https://eric-d.netlify.app" />
<meta property="og:description" content="My personal blog" />
<meta property="og:image" content="https://eric-d.netlify.app/assets/images/card.jpeg" />
```

Preview: https://www.opengraph.xyz

## PWA

- Add mainifest.json

```html
<link rel="manifest" href="/manifest.json" />
```

```json
{
  "name": "Eric's Blog",
  "short_name": "Blog",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#0f172a",
  "icons": [
    // ... Other icon sizes
    {
      "src": "assets/icons/512.png",
      "sizes": "512x512",
      "purpose": "maskable" // Adaptive icon
    }
  ],
  "start_url": "/"
}
```

- Make a Adaptive icon with [maskable.app](https://maskable.app/)

- Register a service worker

```html
<script>
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>
```

## Prevent blocking resources (font)

From

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

To

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  as="font"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
    type="text/css"
  />
</noscript>
```

https://web.dev/defer-non-critical-css/#optimize

## Other tools

- Generate Favicon: https://realfavicongenerator.net

- Compress images: https://tinypng.com
