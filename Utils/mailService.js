import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(email, resetLink) {
  const response = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Password Reset',
    html: `<p>לחצו <a href="${resetLink}">כאן</a> לאיפוס הסיסמה שלכם.</p>`,
  });
  if (response.error) {
    console.log(response.error);
    throw new Error(`Failed to send email: ${response.error}`);
  }
}

export const sendOrderConfirmationEmail = async (userEmail, userName, orderId, items, total) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₪${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #00bcd4;">שלום ${userName},</h2>
    <p>תודה על ההזמנה שלך! מספר ההזמנה: <strong>${orderId}</strong></p>

    <h3 style="margin-top: 30px;">פרטי ההזמנה:</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #00bcd4; color: white;">
          <th style="text-align: left; padding: 8px;">מוצר</th>
          <th style="text-align: left; padding: 8px;">כמות</th>
          <th style="text-align: left; padding: 8px;">מחיר</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <p style="margin-top: 20px; font-size: 18px;">סה"כ לתשלום: <strong>₪${total.toFixed(2)}</strong></p>

    <p style="margin-top: 30px;">ההזמנה תישלח אליך בקרוב. תודה שקנית אצלנו!</p>

    <hr style="margin-top: 40px;">
    <p style="font-size: 12px; color: gray;">אם יש לך שאלות, ניתן לפנות אלינו במייל חוזר.</p>
  </div>
  `;

  const response = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: "sh0534110774@gmail.com",
    subject: 'אישור הזמנה - תודה שקנית אצלנו!',
    html,
  });

  if (response.error) {
    console.error("Resend API Error:", response.error);
    throw new Error(response.error.message || "Unknown error from resend");
  }
};
