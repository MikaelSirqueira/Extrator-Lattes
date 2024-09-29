import { prismaClient } from "../prisma";

class getUserService {
    async execute() {
        const user = await prismaClient.user.findMany()
        return user
    }
}

export { getUserService }