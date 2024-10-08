# Usando a imagem oficial do Node.js como base
FROM node:20 AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando o package.json e package-lock.json e instalando as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copiando o restante do código e criando o build de produção
COPY . .
RUN npm run build

# Expondo a porta que a aplicação vai usar
EXPOSE 3000

CMD ["npm", "start"]
