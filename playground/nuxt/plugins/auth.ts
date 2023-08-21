import {
  HttpInterface,
  MakeRequestParams,
} from "devise-token-auth-vue/HttpInterface";

import { CookieStorageInterface } from "devise-token-auth-vue/CookieStorageInterface";

import { vueDeviseAuth } from "devise-token-auth-vue";

// todo: protect
const baseURL = "";

class HttpProxy implements HttpInterface {
  async makeRequest(p: MakeRequestParams, ...params: any[]): Promise<number> {
    console.log("make request: ", p, params);
    const resp = await $fetch(p.url, {
      baseURL,
      method: p.method,
      body: p.body,
      headers: p.reqHeaders,
    });

    console.log("resp: ", resp);

    // todo: get resp headers

    return 10;
  }
}

class CookieStorage implements CookieStorageInterface {
  set(data: any): void {
    console.log("set cookie", data);
  }
  get() {
    console.log("get cookie");

    return 0;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueDeviseAuth, {
    apiUrl: "/api/v1/auth",
    http: new HttpProxy(),
  });
});
