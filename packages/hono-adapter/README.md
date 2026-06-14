# @vite-fullstack-spa/hono-adapter

Hono middleware adapter for vite-fullstack-spa.

## Usage

```ts
import { viteMiddleware } from "@vite-fullstack-spa/hono-adapter";

app.use(viteMiddleware());
```

In vite-fullstack-spa, dev mode proxies through Vite and production serves built client assets automatically.
