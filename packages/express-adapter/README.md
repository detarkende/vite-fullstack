# @vite-fullstack-spa/express-adapter

Express middleware adapter for vite-fullstack-spa.

## Usage

```ts
import { viteMiddleware } from "@vite-fullstack-spa/express-adapter";

app.use(viteMiddleware());
```

In vite-fullstack-spa, you can pass `expressStaticOptions` to tune `express.static` in production.
