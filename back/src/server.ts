import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import { loginRoutes } from "./login";
import fastifyJwt from "@fastify/jwt";
import { protectedRoutes } from "./protected"; // Importe as rotas protegidas

const app = Fastify();
const startPort = 3333; // Porta inicial para tentativas de conexão

// Configura a chave secreta para JWT
app.register(fastifyJwt, {
  secret: 'minha_chave_secreta_super_segura', // Use uma chave secreta segura
});

// Middleware de autenticação usando JWT
app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify(); // Verifica o token
  } catch (err) {
    reply.code(401).send({ message: 'Token inválido ou não autorizado' }); // Retorna erro 401 para token inválido
  }
});

// Handler para erros
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

// Registra plugins e rotas
app.register(cors);
app.register(routes);
app.register(loginRoutes);
app.register(protectedRoutes); // Registra as rotas protegidas

// Função para encontrar a próxima porta disponível
async function findAvailablePort(port: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const tempApp = Fastify();

    tempApp.listen({ port }, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        if (err.code === 'EADDRINUSE') {
          resolve(findAvailablePort(port + 1)); // Tenta a próxima porta
        } else {
          reject(err);
        }
      } else {
        tempApp.close().then(() => resolve(port)); // Fecha o servidor temporário e retorna a porta
      }
    });
  });
}

// Inicia o servidor na próxima porta disponível
findAvailablePort(startPort)
  .then((port) => {
    app.listen({ port }).then(() => {
      console.log(`HTTP Server Running on port ${port}!`);
    });
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
  });
