import { Resend } from 'resend'; // Ou Nodemailer
import { render } from "@react-email/components";
import { TwoFactorEmail } from "./template";

// Usando Resend como exemplo (muito comum com Next.js), 
// mas a lógica é a mesma para Nodemailer.
const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  try {
    // 1. Renderiza o componente React para string HTML
    const emailHtml = await render(TwoFactorEmail({ token }));

    // 2. Dispara o e-mail
    await resend.emails.send({
      from: "Security <onboarding@resend.dev>", // Use seu domínio verificado aqui
      to: email,
      subject: "🔒 Seu código de segurança 2FA",
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return { success: false };
  }
};