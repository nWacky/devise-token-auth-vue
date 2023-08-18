import type { DeviseAuthOptions } from "./types/options";
import type { HttpInterface } from "./HttpInterface";
import type { AuthHeaders, LoginReqParams } from "./types";

export class DeviseAuth {
  _options: DeviseAuthOptions;

  constructor(o: DeviseAuthOptions) {
    this._options = o;
  }

  /**
   * Email registration.
   *
   * A verification email will be sent to the email address provided.
   * Upon clicking the link in the confirmation email, the API will
   * redirect to the URL specified in `confirm_success_url`.
   */
  registerEmail(params: LoginReqParams) {
    this._options.http.makeRequest({
      url: this._options.apiUrl,
      reqHeaders: this._getReqHeaders(),
      getRespHeaders: this._getRespHeaders,
    });
  }

  _getReqHeaders(): AuthHeaders {
    // todo
    return {};
  }

  _getRespHeaders(headers: AuthHeaders) {
    // todo
  }
}
