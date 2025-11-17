import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApplicationConfirmation(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Application Received - Alternative Akademyx Programme',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">Welcome to Alternative Akademyx, ${name}!</h2>
          <p>Thank you for applying to our transformative 3-month digital skills programme.</p>
          <p>We've received your application and will review it within 24-48 hours.</p>
          <p>Next steps:</p>
          <ul>
            <li>Review your application details</li>
            <li>Wait for approval notification</li>
            <li>Complete payment upon approval</li>
            <li>Begin your transformation journey</li>
          </ul>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Alternative Akademyx Team</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

export async function sendApplicationApproval(email: string, name: string, applicationId: string) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Application Approved - Alternative Akademyx Programme',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Congratulations, ${name}!</h2>
          <p>Your application to Alternative Akademyx has been approved!</p>
          <p>You're one step closer to transforming your digital future.</p>
          <p>To secure your spot, please complete your payment of â‚¦10,000 within the next 48 hours.</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/payment?applicationId=${applicationId}" 
               style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
               Complete Payment
          </a></p>
          <p>We can't wait to see you transform your future!</p>
          <p>Best regards,<br>Alternative Akademyx Team</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending approval email:', error);
  }
}

export async function sendPaymentConfirmation(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Payment Confirmed - Alternative Akademyx Programme',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Payment Confirmed, ${name}!</h2>
          <p>Thank you for your payment. Your spot in the Alternative Akademyx Programme is now confirmed.</p>
          <p>What happens next:</p>
          <ul>
            <li>You'll receive course materials via WhatsApp</li>
            <li>Access to our exclusive community forum</li>
            <li>Schedule for live Q&A sessions</li>
            <li>Your transformation begins!</li>
          </ul>
          <p>Get ready for an incredible journey of growth and transformation!</p>
          <p>Best regards,<br>Alternative Akademyx Team</p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
  }
}