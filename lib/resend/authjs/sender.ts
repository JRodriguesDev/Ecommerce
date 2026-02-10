import { render } from "@react-email/components";
import { MagicLinkEmail } from "./template";

export async function sendVerificationRequest(params: any) {
  const { identifier: to, provider, url } = params;
  const { host } = new URL(url);

  try {
    // A mágica acontece aqui: Transforma o Componente React em String HTML
    const emailHtml = await render(MagicLinkEmail({ url, host }));

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${provider.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: provider.from,
        to,
        subject: `Link de Acesso: ${host}`,
        html: emailHtml,
        text: `Fazer login em ${host}: ${url}`, // Fallback simples para texto
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error("Resend error: " + JSON.stringify(error));
    }
  } catch (error) {
    console.error("Erro no envio do e-mail:", error);
    throw new Error("Failed to send verification email");
  }
}