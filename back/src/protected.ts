import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

// Define as rotas protegidas
// export async function protectedRoutes(app: FastifyInstance) {
//   app.addHook('onRequest', app.authenticate);

//   // Rota GET /profile - Protegida por autenticação JWT
//   app.get('/profile', {
//     preValidation: [app.authenticate], // Middleware de autenticação
//   }, async (request: FastifyRequest, reply: FastifyReply) => {
//     // Pega os dados do usuário a partir do token JWT
//     const user = request.user;
//     console.log(user);

//     // Simula o retorno de um perfil de usuário
//     return reply.send({
//       message: `Bem-vindo, ${user.name}! Este é o seu perfil.`,
//     });
//   });
// }