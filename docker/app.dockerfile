FROM node:slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY package.json  package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]