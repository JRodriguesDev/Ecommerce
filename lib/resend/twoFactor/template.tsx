import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface TwoFactorEmailProps {
  token: string;
}

export const TwoFactorEmail = ({ token }: TwoFactorEmailProps) => (
  <Html>
    <Head />
    <Preview>Seu código de verificação de dois fatores</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Segurança 2FA</Heading>
        <Text style={text}>
          Alguém tentou entrar na sua conta. Se foi você, use o código de verificação abaixo para completar o acesso:
        </Text>
        <Section style={codeContainer}>
          <Text style={codeText}>{token}</Text>
        </Section>
        <Text style={footer}>
          Este código expira em 5 minutos. Se você não solicitou este acesso, por favor ignore este e-mail ou altere sua senha.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default TwoFactorEmail;

// Estilos (Inline para compatibilidade de e-mail)
const main = {
  backgroundColor: "#09090b",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  width: "465px",
  backgroundColor: "#18181b",
  borderRadius: "12px",
  border: "1px solid #27272a",
  marginTop: "40px",
};

const h1 = {
  color: "#f4f4f5",
  fontSize: "24px",
  fontWeight: "900",
  textAlign: "center" as const,
  textTransform: "uppercase" as const,
  italic: "true",
};

const text = {
  color: "#a1a1aa",
  fontSize: "14px",
  lineHeight: "24px",
  textAlign: "center" as const,
};

const codeContainer = {
  background: "#09090b",
  borderRadius: "8px",
  border: "1px solid #10b981",
  margin: "30px 0",
  padding: "20px 0",
};

const codeText = {
  color: "#10b981",
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "10px",
  textAlign: "center" as const,
  margin: "0",
};

const footer = {
  color: "#71717a",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "20px",
};