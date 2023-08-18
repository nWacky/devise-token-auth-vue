import type { AuthHeaders } from "./types";

export type GetRespHeadersTy = (h: AuthHeaders) => void;

export type MakeRequestParams = {
  url: string;
  reqHeaders: AuthHeaders;
  getRespHeaders: GetRespHeadersTy;
};

export interface HttpInterface {
  makeRequest(p: MakeRequestParams, ...params: any[]): any;
}
