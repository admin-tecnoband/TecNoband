Contact Form Edge Function

This Supabase Edge Function receives contact form submissions from the website and forwards them via the Resend API.

Environment variables required (set in Supabase dashboard / locally when testing with `supabase functions serve`):

- RESEND*API_KEY: Your Resend API key (starts with `re*...`).
- FROM_EMAIL: Optional. Email used in the `from` header (default: `noreply@tecnoband.com`).
- TO_EMAIL: Optional. Destination email address for contact submissions (default: `support@tecnoband.com`).

How it works:

- Receives a POST request with JSON body: { name, email, company?, message }
- Validates required fields and basic email format
- Renders a simple HTML email and sends it using Resend's /emails endpoint
- Returns JSON { success: true, message, id } on success, or { error } on failure

Local testing:

1. Install Supabase CLI and run:
   supabase functions serve --no-verify-jwt

2. Set environment variables in your shell (PowerShell example):
   $env:RESEND_API_KEY="your_re_key"; $env:FROM_EMAIL="noreply@tecnoband.com"; $env:TO_EMAIL="support@tecnoband.com"

3. POST to the local function:
   curl -X POST http://localhost:54321/functions/v1/contact-form -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","message":"Hello"}'

Security note:

- Keep the RESEND_API_KEY secret. Do not expose it to client-side code.
- Use Supabase project's environment variable settings when deploying.
