import { prismaClient } from "../prisma";

class getUsersService {
    async execute() {
        const user = await prismaClient.user.findMany()
        return user
    }
}

export { getUsersService }