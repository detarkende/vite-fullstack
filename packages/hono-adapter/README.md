# @vite-fullstack/hono

Hono middleware adapter for vite-fullstack.

## Usage

```ts
import { viteMiddleware } from "@vite-fullstack/hono";

app.use(viteMiddleware());
```

In vite-fullstack, dev mode proxies through Vite and production serves built client assets automatically.
