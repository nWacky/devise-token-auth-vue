import { App } from "vue";

import { DeviseAuth } from "./DeviseAuth";
import type { DeviseAuthOptions } from "./types/options";

const vueDeviseAuth = {
  install(app: App, options: DeviseAuthOptions) {
    const auth = new DeviseAuth(options);

    // todo:
    // app.provide();
  },
};
