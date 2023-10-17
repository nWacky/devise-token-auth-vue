import { App, inject } from "vue";

import { DeviseAuth } from "./DeviseAuth";
import type { DeviseAuthOptions } from "./types/options";

export const AuthInstanceObj = new DeviseAuth();

export const vueDeviseAuth = {
  // TODO: better type params
  install<HttpParamsTy extends any[], RespTy>(
    app: App,
    options: DeviseAuthOptions<HttpParamsTy, RespTy>
  ) {
    AuthInstanceObj.init(options);
  },
};

export const useAuth = () => {
  return AuthInstanceObj;
};
