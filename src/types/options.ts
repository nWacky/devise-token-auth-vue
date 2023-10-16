import { CookieStorageInterface } from "../CookieStorageInterface";

import type { HttpInterface } from "../HttpInterface";

// TODO: provide default options
export type DeviseAuthOptions<HttpParamsTy extends any[], RespTy> = {
  /**
   * Api url
   *
   * e.g. `https://example.com`, `/auth`
   */
  apiUrl: string;

  http: HttpInterface<HttpParamsTy, RespTy>;

  cookie: CookieStorageInterface;
};
