export type AuthHeaders = {
  uid: string;
  client: string;
  "access-token": string;
};

// devise requests

export type LoginReqParams = {
  email: string;
  password: string;
  password_confirmation: string;
  confirm_success_url?: string;
} & Record<string, any>;
