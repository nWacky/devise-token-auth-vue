import type { AuthHeaders } from "./types";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type GetRespHeadersTy = (h: AuthHeaders) => void;

export type RequestParamsBodyTy = Partial<Record<string, string>> | string;

export type MakeRequestParams = {
  url: string;

  reqHeaders?: AuthHeaders;

  getRespHeaders: GetRespHeadersTy;

  /** Body to be passed as POST/PUT request body */
  body?: RequestParamsBodyTy;

  /** GET/POST request params */
  params?: RequestParamsBodyTy;

  method: Method;
};

export interface HttpInterface {
  // TODO: add response types
  makeRequest<PItem, P extends Array<PItem>, RespTy = any>(
    p: MakeRequestParams,
    ...params: P
  ): Promise<RespTy>;
}
