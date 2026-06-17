# @vite-fullstack/plugin

Core Vite plugin for vite-fullstack.

It configures a coordinated client + server build and injects the assets path that vite-fullstack adapters use in production.

## Usage

```ts
import { defineConfig } from "vite";
import fullstackPlugin from "@vite-fullstack/plugin";

export default defineConfig({
  plugins: [fullstackPlugin()],
});
```

## Options

- `server`: server entry path, default `./server/index.ts`
- `client`: client root path, default `./client`
- `serverOutDir`: server output directory, default `dist`
- `clientOutDir`: client output directory, default `dist/public`
