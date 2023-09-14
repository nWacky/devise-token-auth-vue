import { CookieStorageInterface } from "../CookieStorageInterface";

import type { HttpInterface } from "../HttpInterface";

// TODO: provide default options
export type DeviseAuthOptions<HttpParamsTy extends any[] = any[]> = {
  /**
   * Api url
   *
   * e.g. `https://example.com`, `/auth`
   */
  apiUrl: string;

  http: HttpInterface<HttpParamsTy>;

  cookie: CookieStorageInterface;
};
