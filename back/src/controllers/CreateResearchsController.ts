import { FastifyRequest, FastifyReply } from 'fastify';
import { EditUserService } from '../services/EditUserService';
import { CreateResearchersService } from '../services/CreateResearchsService';

class CreateResearchsController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { currentUser, name1, name2, college1, college2, beginYear, endYear, selectedFiles, selectedFilesPPG, dropDuplicates, isResearcher } = request.body as {
            currentUser: string, 
            name1: string, 
            name2: string, 
            college1: string | null, 
            college2: string | null,
            beginYear: string | null,
            endYear: string | null,
            selectedFiles: string | null,
            selectedFilesPPG: string | null,
            dropDuplicates: boolean,
            isResearcher: boolean,
        }

        const userService = new CreateResearchersService()

        const user = await userService.execute({ currentUser, name1, name2, college1, college2, beginYear, endYear, selectedFiles, selectedFilesPPG, dropDuplicates, isResearcher })

        reply.send(user)
    }
}

export { CreateResearchsController }
