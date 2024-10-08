import { prismaClient } from "../prisma";
import bcrypt from 'bcryptjs'; // Importa bcrypt para hash de senha

interface CreateUserProps {
    name: string;
    password: string;
    admin: boolean;
}

class CreateUserService {
    async execute({ name, password, admin }: CreateUserProps) {
        // Verifica se todos os campos foram preenchidos
        if (!name || !password) {
            throw new Error("Preencha todos os campos para continuar");
        }

        // Gera o hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Cria o usuário no banco de dados com a senha criptografada
        const user = await prismaClient.user.create({
            data: {
                name,
                password: hashedPassword, // Armazena o hash da senha
                admin
            }
        });

        return user;
    }
}

export { CreateUserService };
