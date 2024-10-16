import { prismaClient } from "../prisma/index";
import bcrypt from 'bcryptjs';

interface EditUserProps{
    name: string;
    password: string;
    admin: boolean;
}

class EditUserService{
    async execute({ name, password, admin }: EditUserProps){

      console.log(name, password, admin);

        if(!name || !password){
            throw new Error("Solicitação inválida")
        }

        const findUser = await prismaClient.user.findFirst({
            where: {
              name: name
            },
        });

        console.log('fd',findUser);

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