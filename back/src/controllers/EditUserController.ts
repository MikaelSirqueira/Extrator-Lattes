import { FastifyRequest, FastifyReply } from 'fastify';
import { EditUserService } from '../services/EditUserService';

class EditUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { name, password, admin} = request.body as { name: string, password: string, admin: boolean }

        const userService = new EditUserService()

        const user = await userService.execute({ name, password, admin })

        reply.send(user)
    }
}

export { EditUserController }