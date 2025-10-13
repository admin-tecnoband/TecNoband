Environment variables for contact-form function

- RESEND_API_KEY (required) - your Resend API key (keep secret)
- FROM_EMAIL (optional) - from email address for outgoing emails (default: noreply@tecnoband.com)
- TO_EMAIL (optional) - destination email (default: support@tecnoband.com)
- RECAPTCHA_SECRET_KEY (optional but recommended) - Google reCAPTCHA v3 secret key

Notes:

- If RECAPTCHA_SECRET_KEY is set, the function will require a recaptchaToken in the incoming payload and verify it with Google's API. If verification fails, the request is rejected.
- For local testing you can set these env vars in your shell before running `supabase functions serve`.
