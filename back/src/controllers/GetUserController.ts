import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserService } from '../services/GetUserService';

class GetUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const userService = new getUserService()
        const user = await userService.execute();

        reply.send(user)
    }

}

export { GetUserController }