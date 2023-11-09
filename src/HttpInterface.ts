import type { AuthHeaders } from "./types";

export type HttpMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export type GetRespHeadersTy = (h: AuthHeaders) => void;

export type RequestParamsTy = Partial<Record<string, string>>;
export type RequestBodyTy = Partial<Record<string, string>> | any;

export type MakeRequestParams = {
  url: string;

  reqHeaders?: AuthHeaders;

  /** Http method */
  method: HttpMethod;

  /** Body to be passed as POST/PUT request body */
  body?: RequestBodyTy;

  /** GET/POST request params */
  params?: RequestParamsTy;
};

export interface HttpInterface<ParamsTy extends any[], RespTy> {
  makeRequest(p: MakeRequestParams, ...params: ParamsTy): Promise<RespTy>;

  getResponseHeaders(resp: RespTy): Record<string, string>;

  /** Return `true` if error from `makeRequest` is 401 (Unauthorized) */
  checkRequestErrorIsUnauthorized(error: any): boolean;
}
