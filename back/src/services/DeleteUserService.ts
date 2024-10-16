import { prismaClient } from "../prisma/index";

interface DeleteUserProps{
    id: number;
}

class DeleteUserService{
    async execute({ id }: DeleteUserProps){

        if(!id){
            throw new Error("Solicitação inválida")
        }

        if (typeof id !== 'number') {
            throw new Error("O ID deve ser um número");
        }

        const findUser = await prismaClient.user.findUnique({
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