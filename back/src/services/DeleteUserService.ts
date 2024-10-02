import { prismaClient } from "../prisma/index";

interface DeleteUserProps{
    id: string;
}

class DeleteUserService{
    async execute({ id }: DeleteUserProps){

        if(!id){
            throw new Error("Solicitação inválida")
        }

        const findUser = await prismaClient.user.findFirst({
            where:{
                id: id
            }
        })

        if(!findUser){
            throw new Error("Usuário não existe")
        }

        await prismaClient.user.delete({
            where:{
                id: findUser.id 
            }
        })

        return { message: "Usuário deletado com sucesso." }
    }
}

export {DeleteUserService}