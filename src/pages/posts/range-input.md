---
layout: '../../layouts/PostLayout.astro'
title: Custom range input with CSS
description: Cross-browser compatible range inputs with CSS
pubDate: 2023-07-28T07:00:00Z
imgSrc: '/assets/images/range-input.jpeg'
imgAlt: 'range-input'
---

```css
/* reset */
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

/***** Chrome, Safari, Opera and Edge Chromium styles *****/

/* track */
input[type='range']::-webkit-slider-runnable-track {
  background: #374151;
  height: 8px;
  border-radius: 4px;
}

/* thumb */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: #3b82f6;
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-top: -4px;
}

/******** Firefox styles ********/

/* track */
input[type='range']::-moz-range-track {
  background: #374151;
  height: 0.5rem;
  border-radius: 4px;
}

/* thumb */
input[type='range']::-moz-range-thumb {
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  height: 16px;
  width: 16px;
}
```
