# @vfspa/generic-adapter

VFSPA (Vite Fullstack SPA) core helper for building framework adapters.

## Usage

```ts
import { createViteMiddleware } from "@vfspa/generic-adapter";

export function viteMiddleware() {
  return createViteMiddleware({
    dev: (getViteServer) => async (req, res, next) => {
      const vite = await getViteServer();
      vite.middlewares(req, res, next);
    },
    prod: (assetsDir) => myFramework.static(assetsDir),
  });
}
```

In VFSPA, the `dev` and `prod` callbacks decide the return type, so inference usually works without casts.
