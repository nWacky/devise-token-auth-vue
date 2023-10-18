import type { DeviseAuthOptions } from "./types/options";

import type {
  AuthHeaders,
  LoginReqParams,
  SendPasswordConfirmationParams,
  UpdatePasswordParams,
  UpdateReqParams,
  ResetPasswordParams,
  FetchRequestParams,
} from "./types";

import { AuthHeaderKeys } from "./types";

export class DeviseAuth<HttpParamsTy extends any[], HttpRespTy> {
  _options?: DeviseAuthOptions<HttpParamsTy, HttpRespTy>;

  constructor(o: DeviseAuthOptions<HttpParamsTy, HttpRespTy>) {
    this._options = o;
  }

  _getReqHeaders(): AuthHeaders | undefined {
    if (!this._options) {
      return undefined;
    }

    let h = this._options.cookie.get();

    if (h) {
      return h;
    }

    return undefined;
  }

  _processRespHeaders(resp: HttpRespTy) {
    if (!this._options) {
      return undefined;
    }

    const headers = this._options.http.getResponseHeaders(resp);

    const authHeaders: AuthHeaders = {};

    const headerKeys = AuthHeaderKeys as Readonly<string[]>;

    for (let [key, value] of Object.entries(headers)) {
      if (headerKeys.includes(key)) {
        authHeaders[key as (typeof AuthHeaderKeys)[number]] = value;
      }
    }

    if (Object.keys(authHeaders).length == 0) {
      this._options.cookie.set(null);
      return;
    }

    this._options.cookie.set(authHeaders);
  }

  /**
   * Email registration.
   *
   * A verification email will be sent to the email address provided.
   * Upon clicking the link in the confirmation email, the API will
   * redirect to the URL specified in `confirm_success_url`.
   */
  // TODO: pass params as not any
  public async registerEmail(body: LoginReqParams, ...params: HttpParamsTy) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        url: this._options.apiUrl,
        reqHeaders: this._getReqHeaders(),
        method: "POST",
        body,
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Account deletion.
   *
   * This route will destroy users identified by their
   * `uid`, `access-token` and `client` headers.
   */
  public async deleteAccount(...params: HttpParamsTy) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        url: this._options.apiUrl,
        reqHeaders: this._getReqHeaders(),
        method: "DELETE",
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Account updates.
   *
   * This route will update an existing user's account settings.
   * The default accepted params are `password` and `password_confirmation`,
   * but this can be customized on the backend.
   *
   * The backend may also check the `current_password` param is checked before either
   * any update or only if the request updates user password.
   */
  public async updateAccount(body: UpdateReqParams, ...params: HttpParamsTy) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        url: this._options.apiUrl,
        reqHeaders: this._getReqHeaders(),
        method: "PUT",
        body,
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Email authentication.
   *
   * Requires email and password as params. This route
   * will return a JSON representation of the User model
   * on successful login along with the `access-token`
   * and `client` in the header of the response.
   */
  public async signIn(body: LoginReqParams, ...params: HttpParamsTy) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        url: `${this._options.apiUrl}/sign_in`,
        reqHeaders: this._getReqHeaders(),
        method: "POST",
        body,
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Use this route to end the user's current session. This route will invalidate the user's authentication token. You must pass in uid, client, and access-token in the request headers.
   */
  public async signOut(...params: HttpParamsTy) {
    if (!this._options) {
      return undefined;
    }

    try {
      const resp = await this._options.http.makeRequest(
        {
          reqHeaders: this._getReqHeaders(),
          url: `${this._options.apiUrl}/sign_out`,
          method: "DELETE",
        },
        ...params
      );

      this._processRespHeaders(resp);
    } finally {
      // if the cookie is no longer valid the user won't be able
      // to use the app
      this._options.cookie.set(null);
    }
  }

  /**
   * Validate tokens on return visits to the client.
   *
   * Requires `uid`, `client`, and `access-token` as params.
   *
   * Returns a `User` if all tokens are valid
   */
  public async validateToken(...params: HttpParamsTy) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        reqHeaders: this._getReqHeaders(),
        url: `${this._options.apiUrl}/validate_token`,
        method: "GET",
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Use this route to send a password reset confirmation email
   * to users that registered by email.
   *
   * Accepts `email` and `redirect_url` as params.
   *
   * The user matching the `email` param will be sent
   * instructions on how to reset their password.
   *
   * `redirect_url` is the url to which the user will be redirected
   * after visiting the link contained in the email.
   */
  public async sendPasswordConfirmation(
    body: SendPasswordConfirmationParams,
    ...params: HttpParamsTy
  ) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        reqHeaders: this._getReqHeaders(),
        url: `${this._options.apiUrl}/password`,
        method: "POST",
        body,
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Use this route to change users' passwords.
   *
   * Requires `password` and `password_confirmation` as params.
   *
   * This route is only valid for users that registered by email (OAuth2 users will receive an error).
   *
   * It also checks `current_password` (if enabled on the backend, disabled by default).
   */
  public async changePassword(
    body: UpdatePasswordParams,
    ...params: HttpParamsTy
  ) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        reqHeaders: this._getReqHeaders(),
        url: `${this._options.apiUrl}/password`,
        method: "PUT",
        body,
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Verify user by password reset token.
   *
   * This route is the destination URL for password reset confirmation.
   * This route must contain `reset_password_token` and `redirect_url` params.
   *
   * These values will be set automatically by the confirmation email
   * that is generated by the password reset request (`sendPasswordConfirmation`).
   */
  public async resetPassword(
    passwordParams: ResetPasswordParams,
    ...params: HttpParamsTy
  ) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        reqHeaders: this._getReqHeaders(),
        url: `${this._options.apiUrl}/password/edit`,
        method: "GET",
        params: passwordParams,
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Re-sends confirmation email.
   *
   * Requires `email` and accepts `redirect_url` params (this last one can be omitted
   * if backend supports that).
   */
  public async resendConfirmationEmail(
    body: SendPasswordConfirmationParams,
    ...params: HttpParamsTy
  ) {
    if (!this._options) {
      return undefined;
    }

    const resp = await this._options.http.makeRequest(
      {
        reqHeaders: this._getReqHeaders(),
        url: `${this._options.apiUrl}/confirmation`,
        method: "POST",
        body,
      },
      ...params
    );

    this._processRespHeaders(resp);

    return resp;
  }

  /**
   * Fetch the response as an authenticated user, sending
   * `AuthHeaders`.
   *
   * If the user wasn't authenticated, won't send any `AuthHeaders`.
   *
   * Similar to `axios({ method: '...' })` and `$fetch(url, { method: '...' })`,
   * but automatically adds auth headers
   */
  public async fetch(
    reqParams: FetchRequestParams,
    ...params: HttpParamsTy
  ): Promise<HttpRespTy | undefined> {
    if (!this._options) {
      return undefined;
    }

    try {
      const resp = await this._options.http.makeRequest(
        {
          reqHeaders: this._getReqHeaders(),
          ...reqParams,
        },
        ...params
      );

      this._processRespHeaders(resp);

      return resp;
    } catch (e) {
      const is401 = this._options.http.checkRequestErrorIsUnauthorized(e);

      if (is401) {
        this._options.cookie.set(null);

        if (this._options.onUnauthorized) {
          this._options.onUnauthorized();
        }

        return undefined;
      }

      throw e;
    }
  }

  /**
   * Returns `true` if an auth token is stored in `CookieStorage`
   *
   * To check whether the auth token is still valid on the server
   * use `validateToken`
   */
  public hasAuthToken(): boolean {
    if (!this._options) {
      return false;
    }

    const tokens = this._options.cookie.get();

    if (!tokens) {
      return false;
    }

    return Object.keys(tokens).length > 0;
  }
}
