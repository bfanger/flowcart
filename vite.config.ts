import { existsSync } from "node:fs";
import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  server: existsSync("/.dockerenv")
    ? { host: true, watch: { usePolling: true, interval: 1000 } }
    : undefined,
};

export default config;
