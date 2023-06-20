---
layout: '../../layouts/PostLayout.astro'
title: Flexbox
description: Flexbox is a layout mechanism designed for laying out groups of items in one dimension.
pubDate: 2022-08-06T00:00:00Z
imgSrc: '/assets/images/flexbox.webp'
imgAlt: 'Flexbox'
---

## display:

![container.svg](/assets/images/flexbox-container.svg)

## flex-direction

![flex-direction.svg](/assets/images/flexbox-flex-direction.svg)

## flex-wrap

![flex-wrap.svg](/assets/images/flexbox-flex-wrap.svg)

## flex-flow

css
.container {
/_ flex-direction + flex-wrap _/
flex-flow: column wrap;
}

## justify-content

align items in the main axis

- **flex-start**: Items align to the left side of the container.
- **flex-end**: Items align to the right side of the container.
- **center**: Items align at the center of the container.
- **space-between**: Items display with equal spacing between them.
- **space-around**: Items display with equal spacing around them.
- **space-evenly**: Items display with equal spacing between them and a haft spacing with the right and the left side.

![justify-content.svg](/assets/images/flexbox-justify-content.svg)

## align-items

![align-items.svg](/assets/images/flexbox-align-items.svg)

## align-content

![align-content.svg](/assets/images/flexbox-align-content.svg)

## gap row-gap column-gap

![gap.svg](/assets/images/flexbox-gap.svg)
