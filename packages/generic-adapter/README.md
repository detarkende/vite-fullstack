# @vite-fullstack/generic

vite-fullstack core helper for building framework adapters.

## Usage

```ts
import { createViteMiddleware } from "@vite-fullstack/generic";

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

In vite-fullstack, the `dev` and `prod` callbacks decide the return type, so inference usually works without casts.
