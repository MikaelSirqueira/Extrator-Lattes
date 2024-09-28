import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {name, password, profile} = request.body as {name: string, password: string, profile: string};

        const userService = new CreateUserService()
        const user = await userService.execute({name, password, profile});

        reply.send(user)
    }

}

export { CreateUserController }