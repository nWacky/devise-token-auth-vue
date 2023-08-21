import type { DeviseAuthOptions } from "./types/options";
import type { HttpInterface } from "./HttpInterface";
import type {
  AuthHeaders,
  LoginReqParams,
  SendPasswordConfirmationParams,
  UpdatePasswordParams,
  UpdateReqParams,
  ResetPasswordParams,
} from "./types";

export class DeviseAuth {
  _options: DeviseAuthOptions;

  constructor(o: DeviseAuthOptions) {
    this._options = o;
  }

  _getReqHeaders(): AuthHeaders {
    // todo: get from cookie
    return {
      uid: "1",
      client: "yes",
      "access-token": "no",
    };
  }

  _getRespHeaders(headers: AuthHeaders) {
    // todo: save to cookie
  }

  /**
   * Email registration.
   *
   * A verification email will be sent to the email address provided.
   * Upon clicking the link in the confirmation email, the API will
   * redirect to the URL specified in `confirm_success_url`.
   */
  // todo: pass optional params everywhere
  public async registerEmail(body: LoginReqParams) {
    await this._options.http.makeRequest({
      url: this._options.apiUrl,
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      method: "POST",
      body,
    });
  }

  /**
   * Account deletion.
   *
   * This route will destroy users identified by their
   * `uid`, `access-token` and `client` headers.
   */
  public async deleteAccount() {
    await this._options.http.makeRequest({
      url: this._options.apiUrl,
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      method: "DELETE",
    });
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
  public async updateAccount(body: UpdateReqParams) {
    await this._options.http.makeRequest({
      url: this._options.apiUrl,
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      method: "PUT",
      body,
    });
  }

  /**
   * Email authentication.
   *
   * Requires email and password as params. This route
   * will return a JSON representation of the User model
   * on successful login along with the `access-token`
   * and `client` in the header of the response.
   */
  public async signIn(body: UpdateReqParams) {
    // todo: make sure headers are set!
    await this._options.http.makeRequest({
      url: `${this._options.apiUrl}/sign_in`,
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      method: "POST",
      body,
    });
  }

  /**
   * Use this route to end the user's current session. This route will invalidate the user's authentication token. You must pass in uid, client, and access-token in the request headers.
   */
  public async signOut() {
    // todo: delete cookie regardless?
    // todo: if no cookies return

    await this._options.http.makeRequest({
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      url: `${this._options.apiUrl}/sign_out`,
      method: "DELETE",
    });
  }

  /**
   * Validate tokens on return visits to the client.
   *
   * Requires `uid`, `client`, and `access-token` as params.
   *
   * Returns a `User` if all tokens are valid
   */
  public async validateToken() {
    await this._options.http.makeRequest({
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      url: `${this._options.apiUrl}/validate_token`,
      method: "GET",
    });
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
    params: SendPasswordConfirmationParams
  ) {
    await this._options.http.makeRequest({
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      url: `${this._options.apiUrl}/password`,
      method: "POST",
      body: params,
    });
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
  public async changePassword(params: UpdatePasswordParams) {
    await this._options.http.makeRequest({
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      url: `${this._options.apiUrl}/password`,
      method: "PUT",
      body: params,
    });
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
  public async resetPassword(params: ResetPasswordParams) {
    await this._options.http.makeRequest({
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      url: `${this._options.apiUrl}/password/edit`,
      method: "GET",
      params,
    });
  }

  /**
   * Re-sends confirmation email.
   *
   * Requires `email` and accepts `redirect_url` params (this last one can be omitted
   * if backend supports that).
   */
  public async resendConfirmationEmail(params: SendPasswordConfirmationParams) {
    await this._options.http.makeRequest({
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
      url: `${this._options.apiUrl}/confirmation`,
      method: "POST",
      body: params,
    });
  }
}
