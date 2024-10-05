import { prismaClient } from "../prisma";
import bcrypt from 'bcryptjs'; // Importa bcrypt para hash de senha

interface CreateUserProps {
    name: string;
    password: string;
    profile: string;
}

class CreateUserService {
    async execute({ name, password, profile }: CreateUserProps) {
        // Verifica se todos os campos foram preenchidos
        if (!name || !password || !profile) {
            throw new Error("Preencha todos os campos para continuar");
        }

        // Gera o hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o salt rounds (pode ser ajustado)

        // Cria o usuário no banco de dados com a senha criptografada
        const user = await prismaClient.user.create({
            data: {
                name,
                password: hashedPassword, // Armazena o hash da senha
                profile
            }
        });

        return user;
    }
}

export { CreateUserService };
