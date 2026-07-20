const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;
const EXPECTED_ACTION = "login";

interface GoogleSiteVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export interface RecaptchaResult {
  success: boolean;
  score?: number;
}

/**
 * Verifies a reCAPTCHA v3 token server-side against Google's siteverify API.
 * Fails closed: any misconfiguration or network error is treated as a failed
 * verification rather than silently letting the login through.
 */
export async function verifyRecaptcha(token: string, remoteIp: string): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("[recaptcha] RECAPTCHA_SECRET_KEY is not set — failing closed.");
    return { success: false };
  }

  const params = new URLSearchParams({ secret, response: token });
  if (remoteIp !== "unknown") {
    params.set("remoteip", remoteIp);
  }

  let data: GoogleSiteVerifyResponse;
  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    data = await response.json();
  } catch (error) {
    console.error("[recaptcha] verification request failed:", error);
    return { success: false };
  }

  if (!data.success || data.action !== EXPECTED_ACTION) {
    return { success: false, score: data.score };
  }

  if (typeof data.score === "number" && data.score < MIN_SCORE) {
    return { success: false, score: data.score };
  }

  return { success: true, score: data.score };
}
