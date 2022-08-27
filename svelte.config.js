/* eslint-disable import/no-extraneous-dependencies */
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: preprocess(),
  kit: {
    prerender: { default: true },
    adapter: adapter(),
  },
};
