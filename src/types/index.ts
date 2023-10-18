import type { MakeRequestParams } from "../HttpInterface";

export const AuthHeaderKeys = ["uid", "client", "access-token"] as const;

export type AuthHeaders = Partial<
  Record<(typeof AuthHeaderKeys)[number], string>
>;

export type FetchRequestParams = Omit<
  MakeRequestParams,
  "reqHeaders" | "getRespHeaders"
>;

// devise requests

export type LoginReqParams = {
  email: string;
  password: string;
};

export type UpdatePasswordParams = {
  password?: string;
  password_confirmation?: string;
  current_password?: string;
};

export type UpdateReqParams = UpdatePasswordParams & Record<string, string>;

export type SignInParams = {
  email: string;
  password: string;
} & Record<string, string>;

export type SendPasswordConfirmationParams = {
  email: string;
  redirect_url?: string;
};

export type ResetPasswordParams = {
  reset_password_token: string;
  redirect_url?: string;
};
