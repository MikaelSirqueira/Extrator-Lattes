import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import { loginRoutes } from "./login";
import fastifyJwt from "@fastify/jwt";
//import { protectedRoutes } from "./protected";

const app = Fastify()

// Configura a chave secreta para JWT
app.register(fastifyJwt, {
  secret: 'minha_chave_secreta_super_segura', // Use uma chave secreta segura
});

// Middleware de autenticação usando JWT
app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify(); // Verifica o token
  } catch (err) {
    reply.send(err); // Retorna erro se o token for inválido
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
// app.register(protectedRoutes);
// protectedRoutes(app);

// Inicia o servidor
app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running!');
});