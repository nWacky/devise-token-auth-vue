import { App, inject } from "vue";

import { DeviseAuth } from "./DeviseAuth";
import type { DeviseAuthOptions } from "./types/options";

export const AuthInstanceObj = new DeviseAuth();

export const vueDeviseAuth = {
  install(app: App, options: DeviseAuthOption) {
    AuthInstanceObj.init(options);
  },
};

export const useAuth = () => {
  return AuthInstanceObj;
};
