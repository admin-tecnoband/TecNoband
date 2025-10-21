// @ts-nocheck
// Supabase Edge Functions run on Deno. Type checking for Deno std libs is skipped in the monorepo TS build.
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed",
        }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Get the request body
    const formData = await req.json();
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({
          error:
            "Missing required fields: name, email, and message are required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({
          error: "Invalid email format",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // If a reCAPTCHA token is provided, verify it with Google
    const recaptchaToken = formData.recaptchaToken;
    const recaptchaSecret = Deno.env.get("RECAPTCHA_SECRET_KEY");
    if (recaptchaSecret) {
      if (!recaptchaToken) {
        return new Response(
          JSON.stringify({
            error: "reCAPTCHA token missing",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
      try {
        const params = new URLSearchParams();
        params.append("secret", recaptchaSecret);
        params.append("response", recaptchaToken);
        const googleRes = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
          }
        );
        const googleJson = await googleRes.json();
        // For v3, check score and success
        if (
          !googleJson.success ||
          (typeof googleJson.score === "number" && googleJson.score < 0.4)
        ) {
          console.warn("reCAPTCHA verification failed", googleJson);
          return new Response(
            JSON.stringify({
              error: "reCAPTCHA verification failed",
            }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            }
          );
        }
      } catch (err) {
        console.error("Error verifying reCAPTCHA", err);
        return new Response(
          JSON.stringify({
            error: "Error verifying reCAPTCHA",
          }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
    // Get Resend API key from environment
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({
          error: "Email service configuration error",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Get configuration from environment variables
    const fromEmail = Deno.env.get("FROM_EMAIL") || "contactform@tecnoband.com";
    const toEmail = Deno.env.get("TO_EMAIL") || "support@tecnoband.com";
    // Create the email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border-radius: 0 0 8px 8px;
              border: 1px solid #e9ecef;
              border-top: none;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 6px;
              border-left: 4px solid #667eea;
            }
            .field-label {
              font-weight: 600;
              color: #495057;
              margin-bottom: 5px;
              text-transform: uppercase;
              font-size: 12px;
              letter-spacing: 0.5px;
            }
            .field-value {
              color: #212529;
              font-size: 14px;
              word-wrap: break-word;
            }
            .message-field .field-value {
              white-space: pre-wrap;
              background: #f1f3f4;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e9ecef;
              color: #6c757d;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">TecNoBand Website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${formData.name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${formData.email}</div>
            </div>
            
            ${
              formData.company
                ? `
            <div class="field">
              <div class="field-label">Company</div>
              <div class="field-value">${formData.company}</div>
            </div>
            `
                : ""
            }
            
            <div class="field message-field">
              <div class="field-label">Message</div>
              <div class="field-value">${formData.message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from the TecNoBand contact form.<br>
            Received on ${new Date().toLocaleString("en-US", {
              timeZone: "UTC",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })}</p>
          </div>
        </body>
      </html>
    `;
    // Prepare the email request for Resend
    const emailRequest = {
      from: fromEmail,
      to: [toEmail],
      subject: `New Contact Form Submission from ${formData.name}`,
      html: emailHtml,
      reply_to: formData.email,
    };
    // Send email via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailRequest),
    });
    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend API error:", resendError);
      return new Response(
        JSON.stringify({
          error: "Failed to send email",
          details: "Email service temporarily unavailable",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    const resendResult = await resendResponse.json();
    console.log("Email sent successfully:", resendResult);
    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Message sent successfully! We'll get back to you within 24 hours.",
        id: resendResult.id,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: "An unexpected error occurred. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
