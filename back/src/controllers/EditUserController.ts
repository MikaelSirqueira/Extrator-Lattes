import { FastifyRequest, FastifyReply } from 'fastify';
import { EditUserService } from '../services/EditUserService';

class EditUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id, name, password, admin} = request.body as { id: number, name: string, password: string, admin: boolean }

        const userService = new EditUserService()

        const user = await userService.execute({ id, name, password, admin })

        reply.send(user)
    }
}

export { EditUserController }