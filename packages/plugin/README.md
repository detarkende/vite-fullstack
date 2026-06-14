# @vfspa/plugin

Core Vite plugin for VFSPA (Vite Fullstack SPA).

It configures a coordinated client + server build and injects the assets path that VFSPA adapters use in production.

## Usage

```ts
import { defineConfig } from "vite";
import fullstackPlugin from "@vfspa/plugin";

export default defineConfig({
  plugins: [fullstackPlugin()],
});
```

## Options

- `server`: server entry path, default `./server/index.ts`
- `client`: client root path, default `./client`
- `serverOutDir`: server output directory, default `dist`
- `clientOutDir`: client output directory, default `dist/public`
