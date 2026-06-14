# @vite-fullstack-spa/plugin

Core Vite plugin for vite-fullstack-spa.

It configures a coordinated client + server build and injects the assets path that vite-fullstack-spa adapters use in production.

## Usage

```ts
import { defineConfig } from "vite";
import fullstackPlugin from "@vite-fullstack-spa/plugin";

export default defineConfig({
  plugins: [fullstackPlugin()],
});
```

## Options

- `server`: server entry path, default `./server/index.ts`
- `client`: client root path, default `./client`
- `serverOutDir`: server output directory, default `dist`
- `clientOutDir`: client output directory, default `dist/public`
