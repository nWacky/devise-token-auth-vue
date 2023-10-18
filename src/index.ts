import { App, inject } from "vue";

import { DeviseAuth } from "./DeviseAuth";

export const DEFAULT_AUTH_INSTANCE_KEY = "authInstance";

export const vueDeviseAuth = {
  install<HttpParamsTy extends any[], RespTy>(
    app: App,
    options: {
      authInstance: DeviseAuth<HttpParamsTy, RespTy>;
    }
  ) {
    app.provide(DEFAULT_AUTH_INSTANCE_KEY, options.authInstance);
  },
};

export const useAuth = () => {
  const authInstance = inject<DeviseAuth<HttpParamsTy, RespTy>>(
    DEFAULT_AUTH_INSTANCE_KEY
  );

  if (!authInstance) {
    console.error(
      "devise-token-auth-vue: No auth instance provided",
      "Check that 'devise-token-auth-vue' plugin is installed and initialized"
    );

    throw new ReferenceError("No auth instance provided");
  }

  return authInstance;
};
