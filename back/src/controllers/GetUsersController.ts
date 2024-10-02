import { FastifyRequest, FastifyReply } from 'fastify';
import { getUsersService } from '../services/GetUsersService';

class GetUsersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const userService = new getUsersService()
        const user = await userService.execute();

        reply.send(user)
    }

}

export { GetUsersController }