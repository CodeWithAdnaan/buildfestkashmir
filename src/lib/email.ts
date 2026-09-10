/**
 * Transactional Email Utility for BuildFest Kashmir
 * Supports Resend API integration with structured server logging fallback.
 */

interface SendEmailParams {
  to: string;
  fullName: string;
  eventSlug: string;
  registrationId?: string;
}

export async function sendRegistrationConfirmationEmail({
  to,
  fullName,
  eventSlug,
  registrationId,
}: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const eventTitle = eventSlug.replace(/-/g, " ").toUpperCase();

  const subject = `Confirmation: Registration for ${eventTitle} — BuildFest Kashmir`;
  const htmlContent = `
    <div style="font-family: sans-serif; background-color: #0a0d0c; color: #f3f4f6; padding: 32px; borderRadius: 16px;">
      <h2 style="color: #f59e0b; margin-top: 0;">Registration Confirmed!</h2>
      <p>Hi <strong>${fullName}</strong>,</p>
      <p>Thank you for registering for <strong>${eventTitle}</strong> with BuildFest Kashmir.</p>
      <p style="background-color: #121816; padding: 16px; border-radius: 8px; font-family: monospace;">
        Registration ID: <strong>${registrationId || "CONFIRMED"}</strong><br/>
        Event: <strong>${eventTitle}</strong>
      </p>
      <p>We look forward to seeing you there. Bring your laptop, curiosity, and appetite for building!</p>
      <hr style="border-color: #27272a; margin: 24px 0;"/>
      <p style="font-size: 12px; color: #9ca3af;">BuildFest Kashmir — Student Developer Community</p>
    </div>
  `;

  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "BuildFest Kashmir <notifications@buildfestkashmir.xyz>",
          to: [to],
          subject,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send email via Resend:", errorText);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Resend API request exception:", err);
      return false;
    }
  }

  // Fallback logging when RESEND_API_KEY is not configured
  console.log(`[EMAIL DISPATCH MOCK] To: ${to} | Subject: ${subject}`);
  return true;
}
