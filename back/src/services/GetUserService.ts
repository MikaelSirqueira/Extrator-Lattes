import { prismaClient } from "../prisma/index";

interface GetUserProps{
    name: string;
}

class GetUserService{
    async execute({ name }: GetUserProps){

        if(!name){
            throw new Error("Solicitação inválida")
        }

        const findUser = await prismaClient.user.findFirst({
            where:{
                name: name
            }
        })

        return findUser

    }
}

export {GetUserService}