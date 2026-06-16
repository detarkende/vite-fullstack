# @vite-fullstack/express-adapter

Express middleware adapter for vite-fullstack.

## Usage

```ts
import { viteMiddleware } from "@vite-fullstack/express-adapter";

app.use(viteMiddleware());
```

In vite-fullstack, you can pass `expressStaticOptions` to tune `express.static` in production.
