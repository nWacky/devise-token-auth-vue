import type { AuthHeaders } from "./types";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type GetRespHeadersTy = (h: AuthHeaders) => void;

export type MakeRequestParams = {
  url: string;

  reqHeaders?: AuthHeaders;

  getRespHeaders: GetRespHeadersTy;

  /** Body to be passed as POST/PUT request body */
  body?: Record<string, string | undefined>;

  /** GET/POST request params */
  params?: Record<string, string | undefined>;

  method: Method;
};

export interface HttpInterface {
  // TODO: add response types
  makeRequest<PItem, P extends Array<PItem>, RespTy = any>(
    p: MakeRequestParams,
    ...params: P
  ): Promise<RespTy>;
}
