---
id: 2
layout: '../../layouts/PostLayout.astro'
title: MSW
description: Mock by intercepting requests on the network level. Seamlessly reuse the same mock definition for testing, development, and debugging.
date: 2022-06-12T00:00:00Z
---

Framework use in this example: NextJS

1. Install

```bash
yarn add -D msw
```

1. Create `/mocks` folder
2. In `/mocks` folder:

   1. Create handlers

   ```jsx
   // mocks/handlers.js
   import { rest } from 'msw';

   export const handlers = [
     rest.get('https://my.backend/book', (req, res, ctx) => {
       return res(
         ctx.json({
           title: 'Lord of the Rings',
           imageUrl: '/book-cover.jpg',
           description:
             'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
         })
       );
     }),
     rest.get('/reviews', (req, res, ctx) => {
       return res(
         ctx.json([
           {
             id: '60333292-7ca1-4361-bf38-b6b43b90cb16',
             author: 'John Maverick',
             text: 'Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!',
           },
         ])
       );
     }),
   ];
   ```

   b. If requests come from browser

   ```jsx
   // mocks/browser.js
   import { setupWorker } from 'msw';
   import { handlers } from './handlers';

   export const worker = setupWorker(...handlers);
   ```

   Run this command to generate `mockeSerciceWorker.js` to use mock in browser:

   ```bash
   npx msw init public/ --save
   ```

   c. If requests come from server

   ```jsx
   // mocks/server.js
   import { setupServer } from 'msw/node';
   import { handlers } from './handlers';

   export const server = setupServer(...handlers);
   ```

   d. Or can you both

   ```jsx
   // mocks/index.js
   if (typeof window === 'undefined') {
     const { server } = require('./server');
     server.listen();
   } else {
     const { worker } = require('./browser');
     worker.start();
   }
   ```

3. Import `mocks` folder in `_app.js`

```jsx
// pages/_app.js
import 'mocks';
```

Or we can import mocks for development only by setting `NEXT_PUBLIC_API_MOCKING` to `enabled`in `.env.development`

```jsx
// pages/_app.js
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}
```

4. Now we can use it

```jsx
// pages/index.js
import { useState } from 'react';

export default function Home({ book }) {
  const [reviews, setReviews] = useState(null);

  const handleGetReviews = () => {
    // Client-side request are mocked by `mocks/browser.js`.
    // Or you can request `mocks/server.js`
    fetch('/reviews')
      .then((res) => res.json())
      .then(setReviews);
  };

  return (
    <div>
      <img src={book.imageUrl} alt={book.title} width="250" />
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <button onClick={handleGetReviews}>Load reviews</button>
      {reviews && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.text}</p>
              <p>{review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  // Server-side requests are mocked by `mocks/server.js`.
  // Server mock needs a absolute URL
  const res = await fetch('https://my.backend/book');
  const book = await res.json();

  return {
    props: {
      book,
    },
  };
}
```
