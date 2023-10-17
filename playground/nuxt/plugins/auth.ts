import {
  HttpInterface,
  MakeRequestParams,
} from "devise-token-auth-vue/HttpInterface";

import { FetchResponse } from "ofetch";

import { CookieStorageInterface } from "devise-token-auth-vue/CookieStorageInterface";

import { vueDeviseAuth } from "devise-token-auth-vue";
import { AuthHeaders } from "devise-token-auth-vue/types";

const baseURL = "https://example.net";

type HttpProxyParams = [];

class HttpProxy implements HttpInterface<HttpProxyParams, FetchResponse<any>> {
  async makeRequest(
    p: MakeRequestParams,
    ...params: HttpProxyParams
  ): Promise<any> {
    console.log("make request: ", p, params);
    const resp = await $fetch.raw(p.url, {
      baseURL,
      method: p.method,
      body: p.body,
      headers: p.reqHeaders,
    });

    console.log("resp: ", resp);

    return resp._data;
  }

  getResponseHeaders(resp: FetchResponse<any>) {
    return Object.fromEntries(resp.headers.entries());
  }

  getResponseStatus(resp: FetchResponse<any>): number | null {
    return resp.status;
  }
}

class CookieStorage implements CookieStorageInterface {
  set(data: AuthHeaders | null): void {
    console.log("set cookie", data);

    const cookie = useCookie<AuthHeaders | null | undefined>("auth", {
      sameSite: "strict",
      secure: true,
    });

    cookie.value = data;
  }
  get(): AuthHeaders | null {
    console.log("get cookie");

    const cookie = useCookie<AuthHeaders | null | undefined>("auth", {
      sameSite: "strict",
      secure: true,
    });

    console.log("   get cookie");

    return cookie.value ?? null;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueDeviseAuth, {
    apiUrl: "/api/v1/auth",
    http: new HttpProxy(),
    cookie: new CookieStorage(),
  });
});
