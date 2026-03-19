# 🛍️ E-commerce Full Stack - Next.js 16 & Stripe Custom Checkout

Este projeto é um **laboratório de estudos full-stack** desenvolvido para explorar as fronteiras das tecnologias mais recentes do ecossistema JavaScript. O objetivo principal não foi apenas criar uma loja, mas sim aprofundar conhecimentos em renderização dinâmica, gestão de cache complexa e integração profunda com serviços de pagamento, enfrentando os desafios reais de bibliotecas que ainda estão em versões de ponta (Next.js 16 e React 19).

## 📚 Objetivos de Aprendizado
Este repositório documenta minha evolução técnica e a superação de desafios específicos:
- **Domínio de Next.js 16:** Entender o ciclo de vida de renderização e as restrições de *side-effects* em Server Components.
- **Arquitetura de Segurança:** Implementação prática de **Data Access Layer (DAL)** e **Proxy** para entender como proteger dados sensíveis em aplicações modernas.
- **Fluxos Assíncronos:** Estudo de **Webhooks** da Stripe para entender a consistência de dados entre serviços externos e banco de dados local.
- **Novos Hooks do React 19:** Experimentação com as novas formas de manipulação de estado e transições da biblioteca.

## 📸 Prévia da Aplicação
<p align="center">
  <img src="./public/images/projeto.png" alt="Preview da Aplicação" width="50%">
</p>
<p align="center">
  <img src="./public/images/projeto2.png" alt="Preview do Checkout" width="50%">
</p>

## 🌟 Funcionalidades do Sistema

### 🛒 Loja, Carrinho e Favoritos
1. **Gestão de Estado Global:** Carrinho de compras reativo e persistente gerenciado com Zustand.
2. **Catálogo Dinâmico:** Páginas de produtos detalhadas, sistema de favoritos e listagem de itens no carrinho.
3. **Painel de Compras:** Área do cliente com histórico completo de produtos comprados e faturas emitidas.

### 💳 Pagamentos e Assinaturas (Stripe Integrado)
1. **Checkout Customizado (Stripe Wrapper):** Diferente de checkouts tradicionais que redirecionam o usuário, o pagamento é processado dentro da própria aplicação utilizando Stripe Elements, garantindo maior conversão e retenção visual.
2. **Gestão de Assinaturas:** Lógica completa de planos de assinatura, incluindo verificação de status e uso de limites.
3. **Wallet Segura:** Exibição segura de métodos de pagamento (apresentando apenas os 4 últimos dígitos do cartão) e histórico de faturas direto da Stripe.
4. **Sincronização via Webhooks (Hooks):** Implementação de uma rota de Webhook dedicada para escutar eventos da Stripe (customer.subscription.updated). Isso garante que o status do plano do usuário no banco de dados esteja sempre em sincronia com o pagamento real.

### 🛡️ Autenticação e Segurança (Auth.js)
1. **Sistema de Login Completo:** Autenticação moderna utilizando NextAuth v5 (Auth.js) com credenciais e integração segura.
2. **Autenticação em Duas Etapas (2FA):** Camada extra de segurança para os usuários da plataforma.
3. **Recuperação de Senha Segura:** Fluxo de "Esqueci minha senha" utilizando tokens JWT e envio de e-mails transacionais com a Resend.
4. **Proxy de Dados:** Camada de abstração que protege o acesso a rotas.

### ⚡ Arquitetura e Performance
1. **Data Access Layer (DAL):** Separação rigorosa das chamadas de banco de dados, garantindo que componentes de UI não acessem diretamente o Prisma.
2. **Estratégias de Cache (Next.js):** Gerenciamento inteligente de cache e revalidação de rotas seguindo as severas diretrizes do App Router do Next.js 16.
3. **Banco de Dados Dockerizado:** Ambiente de desenvolvimento padronizado com PostgreSQL via Docker e seed inicial automatizado.

## 🛠️ Stack Tecnológico

### Core & UI
- **[Next.js 16.1](https://nextjs.org/)**: Framework React com App Router, Server Actions e renderização dinâmica/estática.
- **[React 19](https://react.dev/)**: Biblioteca base atualizada com as mais recentes otimizações.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Estilização utilitária de alta performance.
- **[Shadcn/UI](https://ui.shadcn.com/)**: Componentes de interface modernos e customizáveis.
- **[Zustand](https://zustand-demo.pmnd.rs/)**: Gerenciamento de estado global leve e rápido para o carrinho e UI.

### Back-End & Persistência
- **[Prisma ORM](https://www.prisma.io/orm)**: Modelagem e tipagem estática do banco de dados relacional PostgreSQL.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados principal rodando em containers Docker.

### Pagamentos & Serviços
- **[Stripe SDK & React Stripe JS](https://docs.stripe.com/stripe-js)**: Processamento de pagamentos, assinaturas e webhooks com componentes UI hospedados localmente.
- **[Auth.js (NextAuth v5)](https://authjs.dev/)**: Autenticação flexível e segura compatível com Edge e Server Components.
- **[Resend](https://resend.com/) & [React Email](https://react.email/)**: Criação e envio de e-mails transacionais (2FA, Reset de Senha) codificados em React.
- **[Zod](https://zod.dev/)**: Validação rigorosa de formulários e schemas de dados.

## 🚀 Guia de Instalação e Setup

### 1. **Pré-requisitos**
- Node.js (v20+ recomendado)
- Docker & Docker Compose
- Contas ativas na Stripe e Resend para as chaves de API.

### 2. **Configuração Inicial**
Clone o repositório e instale as dependências:
```
git clone https://github.com/JRodriguesDev/Ecommerce.git
cd ecommerce
npm install
```
### 3. Configuração das Variáveis de Ambiente (```.env.local```)
Crie um arquivo chamado ```.env.local``` na raiz do projeto e preencha com as suas credenciais. Você pode se basear no modelo abaixo:
```
# --- Banco de Dados (PostgreSQL via Docker) ---
POSTGRES_USER=root
POSTGRES_PASSWORD=sua_senha_aqui
POSTGRES_DB=ecommerce
# URL de conexão utilizada pelo Prisma ORM
DATABASE_URL="postgresql://root:sua_senha_aqui@postgres:5432/ecommerce?schema=public"

# --- Autenticação & Segurança (Auth.js v5 / JWT) ---
# Gere uma chave segura rodando: npx auth secret
AUTH_SECRET="sua_chave_secreta_aqui"
JWT_SECRET="sua_hash_para_tokens_de_segurança"

# Provedores de Login Social (OAuth)
AUTH_GOOGLE_ID="seu_google_client_id"
AUTH_GOOGLE_SECRET="seu_google_client_secret"
AUTH_DISCORD_ID="seu_discord_client_id"
AUTH_DISCORD_SECRET="seu_discord_client_secret"

# --- E-mail & Verificação (Resend) ---
# Necessário para o Two-Factor (2FA) e Reset de Senha
AUTH_RESEND_KEY="re_sua_chave_da_resend"

# --- Integração de Pagamentos (Stripe) ---
# Chave Pública (Exposta ao Client-side via prefixo NEXT_PUBLIC)
NEXT_PUBLIC_STRIPE_PUBLIC="pk_test_sua_chave_publica"
# Chave Privada (Apenas Server-side)
STRIPE_API_KEY="sk_test_sua_chave_privada"
# Segredo do Webhook (Obtido via Stripe CLI ou Dashboard)
WEBHOOK_SECRET="whsec_seu_segredo_de_webhook"
```
### 4. Inicialização da Infraestrutura e Banco de Dados 
Siga os passos abaixo para subir os containers e preparar o banco com os dados iniciais.
### A. Subir os Containers (Docker):
```
docker compose -f docker/compose.yaml up --build
```
### B. Sincronizar o Schema (Prisma Migrate):
```
docker exec -it next npx prisma migrate dev
```
### C. Popular o Banco (Prisma Seed):
``` 
docker exec -it next npx prisma db seed
```
### 5. Executando a Aplicação
Acesse ```http://localhost:3000``` para navegar na loja.

## 👨‍💻 Autor
Se você tiver dúvidas sobre este projeto ou quiser conversar sobre oportunidades, sinta-se à vontade para entrar em contato:

- **Nome**: José Rodrigues Flora
- **LinkedIn**: **[José Rodrigues](https://www.linkedin.com/in/joserodrigues-dev/)**
- **Instagram**: **[jose.rodriguess1](https://www.instagram.com/jose.rodriguess1/)**
- **E-mail**: 0joserodrigues0@gmail.com



