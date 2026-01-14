FROM node:slim
RUN apt-get update -y
WORKDIR /app
COPY package.json  package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]