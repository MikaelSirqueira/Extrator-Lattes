import { FastifyRequest, FastifyReply } from 'fastify';
import { GetUserService } from '../services/GetUserService';

class GetUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name } = request.query as { name: string }
        
        const userService = new GetUserService()

        const user = await userService.execute({ name })

        reply.send(user);

    }
}

export { GetUserController }