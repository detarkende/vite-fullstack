# @vite-fullstack-spa/generic-adapter

vite-fullstack-spa core helper for building framework adapters.

## Usage

```ts
import { createViteMiddleware } from "@vite-fullstack-spa/generic-adapter";

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

In vite-fullstack-spa, the `dev` and `prod` callbacks decide the return type, so inference usually works without casts.
