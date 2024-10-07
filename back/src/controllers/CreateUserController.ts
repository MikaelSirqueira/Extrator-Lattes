import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {name, password, admin} = request.body as {name: string, password: string, admin: boolean};

        const userService = new CreateUserService()
        const user = await userService.execute({name, password, admin});

        reply.send(user)
    }

}

export { CreateUserController }