import { App, inject } from "vue";

import { DeviseAuth } from "./DeviseAuth";
import type { DeviseAuthOptions } from "./types/options";

const INJECT_KEY = "deviseTokenAuthVue";

export const vueDeviseAuth = {
  install(app: App, options: DeviseAuthOptions) {
    const auth = new DeviseAuth(options);

    app.provide(INJECT_KEY, auth);
  },
};

export const useAuth = () => {
  return inject<DeviseAuth>(INJECT_KEY);
};
