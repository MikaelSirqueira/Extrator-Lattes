import prismaClient from "../prisma";

interface CreateUserProps{
    name: string;
    password: string;
    profile: string;
}

class CreateUserService{
    async execute({name, password, profile}: CreateUserProps){

        if(!name || !password || !profile){
            throw new Error("Preencha todos os campos para continuar")
        }

        const user = await prismaClient.user.create({
            data:{
                name,
                password,
                profile
            }
        })

        return user
    }

}

export { CreateUserService }