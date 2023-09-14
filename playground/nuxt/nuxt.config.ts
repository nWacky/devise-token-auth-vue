import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  alias: {
    "devise-token-auth-vue": fileURLToPath(
      new URL("node_modules/devise-token-auth-vue/src/", import.meta.url)
    ),
  },
});
