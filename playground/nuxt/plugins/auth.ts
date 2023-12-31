import {
  HttpInterface,
  MakeRequestParams,
} from "devise-token-auth-vue/HttpInterface";

import { FetchResponse, FetchError } from "ofetch";

import { CookieStorageInterface } from "devise-token-auth-vue/CookieStorageInterface";

import { vueDeviseAuth, useAuthCreate } from "devise-token-auth-vue";
import { DeviseAuth } from "devise-token-auth-vue/DeviseAuth";
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

  checkRequestErrorIsUnauthorized(e: any): boolean {
    if (e instanceof FetchError && e.status === 401) {
      return true;
    }

    return false;
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

// `useAuth` composable has to be declared here to return a concrete type.
//
// Typescript doesn't know if initializer ran, and, if declared in plugin,
//   `useAuth` would have to return any as a result.
//
// In nuxt, this function declaration could be moved to `composables` folder
//   to enable auto import.
export const useAuth = useAuthCreate<HttpProxyParams, FetchResponse<any>>();

export default defineNuxtPlugin((nuxtApp) => {
  const authInstance = new DeviseAuth({
    apiUrl: "/api/v1/auth",
    http: new HttpProxy(),
    cookie: new CookieStorage(),
  });

  nuxtApp.vueApp.use(vueDeviseAuth, {
    authInstance,
  });
});
