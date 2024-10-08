# Usando a imagem oficial do Node.js como base
FROM node:20

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando o package.json e instalando as dependências
COPY package*.json ./
RUN npm install

# Copiando o restante do código
COPY . .

# Expondo a porta que o back-end vai utilizar
EXPOSE 3333

# Rodando o servidor
CMD ["npm", "run", "dev"]
