import { FastifyRequest, FastifyReply } from 'fastify';
import { GetResearchersService } from '../services/GetResearchsService';

class GetResearchsController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {currentUser} = request.query as {currentUser: string}

        const researchService = new GetResearchersService()

        const research = await researchService.execute({ currentUser })

        reply.send(research)
    }
}

export { GetResearchsController }
