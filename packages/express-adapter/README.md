# @vfspa/express-adapter

Express middleware adapter for VFSPA (Vite Fullstack SPA).

## Usage

```ts
import { viteMiddleware } from "@vfspa/express-adapter";

app.use(viteMiddleware());
```

In VFSPA, you can pass `expressStaticOptions` to tune `express.static` in production.
