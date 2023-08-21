export type AuthHeaders = {
  uid?: string;
  client?: string;
  "access-token"?: string;
};

// devise requests

export type LoginReqParams = {
  email: string;
  password: string;
  password_confirmation: string;
  confirm_success_url?: string;
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
