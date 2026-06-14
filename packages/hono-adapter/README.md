# @vfspa/hono-adapter

Hono middleware adapter for VFSPA (Vite Fullstack SPA).

## Usage

```ts
import { viteMiddleware } from "@vfspa/hono-adapter";

app.use(viteMiddleware());
```

In VFSPA, dev mode proxies through Vite and production serves built client assets automatically.
