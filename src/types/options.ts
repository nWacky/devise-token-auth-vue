import { CookieStorageInterface } from "../CookieStorageInterface";

import type { HttpInterface } from "../HttpInterface";

export type DeviseAuthOptions<HttpParamsTy extends any[], RespTy> = {
  /**
   * Api url
   *
   * e.g. `https://example.com`, `/auth`
   */
  apiUrl: string;

  http: HttpInterface<HttpParamsTy, RespTy>;

  cookie: CookieStorageInterface;

  /**
   * Called every time 401 was received from the server.
   *
   * Useful for redirecting back to login
   */
  onUnauthorized?: VoidFunction;
};
