// Extrator-Lattes/back/src/fastify.d.ts
import { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user: {
      userId: string;
      name: string;
      admin: boolean;
    };
  }
}
