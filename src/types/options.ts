import { CookieStorageInterface } from "../CookieStorageInterface";

import type { HttpInterface } from "../HttpInterface";

// todo: provide default options
export type DeviseAuthOptions = {
  /**
   * Api url
   *
   * e.g. `https://example.com`, `/auth`
   */
  apiUrl: string;

  http: HttpInterface;

  cookie: CookieStorageInterface;
};
