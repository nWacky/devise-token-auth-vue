import { AuthHeaders } from "./types";

export interface CookieStorageInterface {
  set(data: AuthHeaders | null): void;
  get(): AuthHeaders | null;
}
