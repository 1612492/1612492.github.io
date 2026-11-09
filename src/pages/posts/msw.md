---
layout: '../../layouts/PostLayout.astro'
title: Mock browser and server requests with MSW
description: Use one set of MSW handlers for browser requests and server-side rendering in a Next.js Pages Router app.
date: 2022-06-12T00:00:00Z
thumbnail: '/src/pages/posts/msw/thumbnail.jpg'
---

[Mock Service Worker (MSW)](https://mswjs.io/) intercepts requests at the network boundary. Your application still calls `fetch` as usual; the mock lives outside the component or API code. The same handlers can run in the browser and in Node.js tests or server-side rendering.

This example uses **MSW v2** and the **Next.js Pages Router**. The sample URLs and data are placeholders: replace them with your own API when adapting the code.

## 1. Install MSW and define handlers

```bash
pnpm add -D msw
```

Create `mocks/handlers.js` with responses for a book and its reviews:

```js
// mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://my.backend/book', () =>
    HttpResponse.json({
      title: 'The Lord of the Rings',
      imageUrl: '/book-cover.jpg',
      description: 'A fantasy novel by J. R. R. Tolkien.',
    })
  ),
  http.get('/reviews', () =>
    HttpResponse.json([{ id: 'review-1', author: 'A reader', text: 'An unforgettable journey.' }])
  ),
];
```

Unlike older MSW examples that use `rest.get` and `res(ctx.json(...))`, v2 uses `http.get` and `HttpResponse.json`.

## 2. Set up the browser worker and Node server

```js
// mocks/browser.js
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

Generate the service-worker file inside Next.js's `public` directory:

```bash
pnpm exec msw init public/ --save
```

The browser uses that worker to intercept requests. Server-side requests use `setupServer` instead:

```js
// mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
server.listen({ onUnhandledRequest: 'bypass' });
```

Keep `mocks/server.js` on the server: it should not be imported by a browser component. In this example, importing it once during server-side rendering starts the interceptor for the server process. For automated tests, start and close the server in your test setup instead.

## 3. Start browser mocking before making client requests

Here the button stays disabled until the worker is ready. This avoids a race in which a request escapes before the worker starts.

```jsx
// pages/index.js
import { useEffect, useState } from 'react';

export default function Home({ book }) {
  const [mockingReady, setMockingReady] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
      setMockingReady(true);
      return;
    }

    let mounted = true;
    import('../mocks/browser')
      .then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
      .then(() => {
        if (mounted) setMockingReady(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function loadReviews() {
    const response = await fetch('/reviews');
    setReviews(await response.json());
  }

  return (
    <main>
      <img src={book.imageUrl} alt="Book cover" width="250" />
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <button onClick={loadReviews} disabled={!mockingReady}>
        Load reviews
      </button>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.text} — {review.author}
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await import('../mocks/server');
  }

  // Server-side fetch needs an absolute URL.
  const response = await fetch('https://my.backend/book');
  const book = await response.json();

  return { props: { book } };
}
```

Set `NEXT_PUBLIC_API_MOCKING=enabled` in `.env.development` to enable both interceptors during development. When mocking is off, both URLs must point to working endpoints. In a larger app, initialize the worker centrally so every page that makes browser requests waits for it consistently.

**Tip:** Use `server.resetHandlers()` between tests if a test overrides handlers, and `server.close()` after the test suite. See the [MSW documentation](https://mswjs.io/docs/) for test-runner-specific setup.
