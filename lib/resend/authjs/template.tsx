import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  render,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  url: string;
  host: string;
}

export const MagicLinkEmail = ({ url, host }: MagicLinkEmailProps) => {
  const escapedHost = host.replace(/\./g, "&#8203;.");

  return (
    <Html>
      <Head />
      <Preview>Login em {host}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Entrar em <strong>{escapedHost}</strong></Heading>
          
          <Section style={section}>
            <Text style={text}>
              Você solicitou um link para acessar sua conta no e-commerce. 
              Clique no botão abaixo para fazer login instantaneamente.
            </Text>
            
            <Link href={url} style={button}>
              Acessar minha conta
            </Link>
            
            <Text style={validityText}>
              Este link é válido por 24 horas. Se o botão não funcionar, copie e cole a URL abaixo no seu navegador:
              <br />
              <Link href={url} style={linkSmall}>{url}</Link>
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            Se você não solicitou este login, pode descartar este e-mail com segurança.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// --- Estilos Dark Mode Profissional ---

const main = {
  backgroundColor: "#09090b",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "40px auto",
  padding: "20px",
  width: "560px",
  backgroundColor: "#18181b",
  borderRadius: "12px",
  border: "1px solid #27272a",
};

const h1 = {
  color: "#fafafa",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const section = {
  padding: "0 20px",
  textAlign: "center" as const,
};

const text = {
  color: "#a1a1aa",
  fontSize: "16px",
  lineHeight: "24px",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  width: "auto",
  padding: "14px 30px",
  marginTop: "25px",
  marginBottom: "25px",
};

const validityText = {
  color: "#71717a",
  fontSize: "12px",
  lineHeight: "18px",
};

const linkSmall = {
  color: "#3b82f6",
  textDecoration: "underline",
  fontSize: "11px",
};

const hr = {
  borderColor: "#27272a",
  margin: "40px 0",
};

const footer = {
  color: "#52525b",
  fontSize: "12px",
  textAlign: "center" as const,
};