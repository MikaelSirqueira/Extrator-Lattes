import { prismaClient } from "../prisma/index";
import bcrypt from 'bcryptjs';

interface EditUserProps{
    id: number;
    name: string;
    password: string;
    admin: boolean;
}

class EditUserService{
    async execute({ id, name, password, admin }: EditUserProps){

        if( !id || !name || !password){
            throw new Error("Solicitação inválida")
        }

        if (typeof id !== 'number') {
            try {
                id = Number(id);
                
                // Caso a conversão resulte em NaN (não é um número), lança um erro
                if (isNaN(id)) {
                    throw new Error();
                }
            } catch (error) {
                throw new Error("O ID deve ser um número válido");
            }

        }

        const findUser = await prismaClient.user.findUnique({
            where:{
                id: id
            }
        })

        if(!findUser){
            throw new Error("Usuário não existe")
        }
         // Gera o hash da senha antes de salvar
         const hashedPassword = await bcrypt.hash(password, 10);
         

         // Cria o usuário no banco de dados com a senha criptografada
         const updatedUser = await prismaClient.user.update({
             where: {
               id: findUser.id
             },
             data: {
               name,
               password: hashedPassword,
               admin
             },
           });

        return { updatedUser }

    }
}

export {EditUserService}