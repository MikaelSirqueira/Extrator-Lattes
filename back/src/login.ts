import { prismaClient } from "./prisma";
import bcrypt from 'bcryptjs';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";


async function findUserByName(name: string) {
    const user = await prismaClient.user.findFirst({
        where:{
            name: name
        }
    })
    return user
}

// Função que registra a rota de login
export async function loginRoutes(fastify: FastifyInstance) {
    // Rota POST /login
    fastify.post('/login', async (request, reply) => {
      const { name, password } = request.body as { name: string; password: string };
  
      try {
        // Passo 1: Verificar se o usuário existe
        const user = await findUserByName(name);
        if (!user) {
          return reply.status(400).send({ message: 'Credenciais inválidas' });
        }
  
        // Passo 2: Comparar a senha fornecida com a armazenada (usando bcrypt para comparar o hash)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return reply.status(400).send({ message: 'Credenciais inválidas' });
        }
  
        // Passo 3: Geração do Token JWT
        const token = fastify.jwt.sign({ name: user.name }, { expiresIn: '1h' }); // Token expira em 1 hora
  
        // Passo 4: Enviar o token de volta ao cliente
        return reply.send({ token });
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Erro interno do servidor' });
      }
    });
}