import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.DOMAIN;
const logo = "/logo.jpg";
const company = "Ajaxsoft";

export default async function sendVerificationEmail(email, token, userName) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
          <img src="${logo}" alt="Logo de ${company}" style="max-width: 150px; margin-bottom: 10px;">
          <h1 style="color: #fff; margin: 0;">¡Bienvenido a ${company}!</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hola ${userName},</h2>
          <p>¡Gracias por registrarte en <strong>${company}</strong>! Estamos emocionados de tenerte a bordo y queremos asegurarnos de que comiences con el pie derecho.</p>
          <p>Haz clic en el botón de abajo para verificar tu correo electrónico y activar tu cuenta:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${domain}/auth/verify-email?token=${token}&email=${email}" style="background-color: #3b82f6; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
              Verificar Correo
            </a>
          </div>
          <p>Una vez que actives tu cuenta, tendrás acceso a nuestras herramientas y recursos que te ayudarán a alcanzar tus metas.</p>
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
          <p style="margin: 20px 0 0;">¡Gracias por elegirnos!</p>
          <p style="margin: 5px 0;"><strong>El equipo de ${company}</strong></p>
        </div>
        <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555;">
          <p>Este es un correo automatizado. Por favor, no respondas a este mensaje.</p>
          <p>© ${new Date().getFullYear()} ${company}. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  `;

  try {
    const response = await resend.emails.send({
      from: `${company} <onboarding@resend.dev>`,
      to: email,
      subject: "¡Bienvenido a Ajaxsoft! Verifica tu cuenta",
      html: htmlContent,
    });

    if (response.data?.id) {
      console.log("Esta aqui  bineeeeeeeeeeeeeeeeeeeeennnnnnnnnnnnnnnnnnnn");

      console.log(response);

      return { success: true };
    }

    console.log("Esta aqui  emaill malllllllllllllllllllllllllllllllll");
    console.log(response);
    return { success: false };
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
    return false;
  }
}
