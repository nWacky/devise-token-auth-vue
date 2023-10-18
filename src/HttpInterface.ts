import type { AuthHeaders } from "./types";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type GetRespHeadersTy = (h: AuthHeaders) => void;

export type RequestParamsBodyTy = Partial<Record<string, string>> | string;

export type MakeRequestParams = {
  url: string;

  reqHeaders?: AuthHeaders;

  /** Body to be passed as POST/PUT request body */
  body?: RequestParamsBodyTy;

  /** GET/POST request params */
  params?: RequestParamsBodyTy;

  method: Method;
};

export interface HttpInterface<ParamsTy extends any[], RespTy> {
  makeRequest(p: MakeRequestParams, ...params: ParamsTy): Promise<RespTy>;

  getResponseHeaders(resp: RespTy): Record<string, string>;

  /** Return `true` if error from `makeRequest` is 401 (Unauthorized) */
  checkRequestErrorIsUnauthorized(error: any): boolean;
}
