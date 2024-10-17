import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

// Define as rotas protegidas
export async function protectedRoutes(app: FastifyInstance) {
    // Adiciona o hook de autenticação em todas as rotas registradas nesta função
    app.addHook('onRequest', app.authenticate);

    // Rota GET /profile - Protegida por autenticação JWT
    app.get('/profile', {
        preValidation: [app.authenticate], // Middleware de autenticação
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        // Força a tipagem de `request.user`
        const user = request.user as { userId: string; name: string; admin: boolean };

        console.log(user);

        // Simula o retorno de um perfil de usuário
        return reply.send({
            message: `Bem-vindo, ${user.name}! Este é o seu perfil.`,
        });
    });
}
