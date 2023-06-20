---
layout: '../../layouts/PostLayout.astro'
title: BEM
description: BEM - is a methodology that helps you to create reusable components and code sharing in front‑end development.
pubDate: 2023-02-06T00:00:00Z
imgSrc: '/assets/images/bem.jpeg'
imgAlt: 'BEM'
---

> **[block]\_\_[element]--[modifier]**

Block: The outermost parent element of the component is defined as the block.

Element: Inside of the component may be one or more children called elements.

Modifier: Either a block or element may have a variation signified by a modifier.

### Only use class selector to keep specificity low and consistent

```css
/* Do this */
.photo {
} /* Specificity of 10 */
.photo__img {
} /* Specificity of 10 */
.photo__caption {
} /* Specificity of 10 */

/* Don't do this*/
.photo {
} /* Specificity of 10 */
.photo img {
} /* Specificity of 11 */
.photo figcaption {
} /* Specificity of 11 */
```

### Class name only include the block name and one element name

```css
/* Do this */
.photo {
}
.photo__img {
}
.photo__caption {
}
.photo__quote {
}

/* Don't do this */
.photo {
}
.photo__img {
}
.photo__caption {
}
.photo__caption__quote {
}
```

### When children have the same modifier, consider to move modifier to block

```css
/* Do this */
.photo--highlighted .photo__img {
}
.photo--highlighted .photo__caption {
}

/* Don't do this */
.photo__img--highlighted {
}
.photo__caption--highlighted {
}
```

### Multi-work names

```css
/* Do this */
.some-thesis {
}
.some-thesis--fast-read {
}
.some-thesis__some-element {
}

/* Don't do this */
.somethesis {
}
.somethesis--fastread {
}
.somethesis__someelement {
}
```

### Resources:

[https://sparkbox.com/foundry/bem_by_example](https://sparkbox.com/foundry/bem_by_example)
