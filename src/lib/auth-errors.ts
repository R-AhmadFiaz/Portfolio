import { CredentialsSignin } from "next-auth";

/** Thrown when an IP has exceeded the login attempt threshold. */
export class RateLimitedError extends CredentialsSignin {
  code = "rate_limited";
}

/** Thrown when reCAPTCHA verification fails or scores too low. */
export class RecaptchaFailedError extends CredentialsSignin {
  code = "recaptcha_failed";
}
