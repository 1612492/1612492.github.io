---
layout: '../../layouts/PostLayout.astro'
title: BEM CSS naming, by example
description: A practical guide to naming blocks, elements, and modifiers without tying CSS to your HTML structure.
date: 2023-02-06T00:00:00Z
thumbnail: '/src/pages/posts/bem/thumbnail.jpg'
---

BEM (Block, Element, Modifier) is a naming convention for CSS classes. It makes a component's structure and variations visible in its class names, so you can change its markup without rewriting every selector.

The pattern is `block__element--modifier`:

- **Block:** a standalone component, such as `photo`.
- **Element:** a part of that block, such as `photo__caption`.
- **Modifier:** a variation of a block or element, such as `photo--featured`.

You only add the pieces you need: `photo`, `photo__caption`, and `photo--featured` are all valid names.

## Name the component, not its HTML tags

```html
<figure class="photo photo--featured">
  <img class="photo__image" src="photo.jpg" alt="A mountain at sunrise" />
  <figcaption class="photo__caption">Sunrise in the mountains</figcaption>
</figure>
```

```css
.photo {
  display: grid;
  gap: 0.5rem;
}

.photo__image {
  width: 100%;
}

.photo__caption {
  font-size: 0.875rem;
}

.photo--featured {
  border: 2px solid gold;
}
```

These single-class selectors have the same low specificity. A selector like `.photo figcaption` is more dependent on the markup: changing `figcaption` to another element would also require a CSS change.

## Keep element names flat

An element name describes its relationship to the **block**, not every level of the DOM tree. Even if a quote sits inside the caption, use `.photo__quote`, not `.photo__caption__quote`.

```html
<figcaption class="photo__caption">
  <blockquote class="photo__quote">A view worth waking up for.</blockquote>
</figcaption>
```

This lets you move the quote within the photo without renaming its class.

## Put shared variations on the block

If a variation affects several parts of a photo, put the modifier on the block:

```css
.photo--featured .photo__image {
  border-radius: 0.5rem;
}

.photo--featured .photo__caption {
  font-weight: 600;
}
```

These descendant selectors have higher specificity than a single class, so use them when the parent state genuinely controls its children. If only the caption changes, a `.photo__caption--muted` modifier is more direct.

For multiword names, use hyphens within each part: `reading-list__item--recent`. The `__` and `--` separators still tell you which part is an element and which is a modifier.

BEM is a convention, not a requirement for every class. Its main benefit is giving teammates a predictable way to name component styles.

**Further reading:** [BEM by Example](https://sparkbox.com/foundry/bem_by_example).
