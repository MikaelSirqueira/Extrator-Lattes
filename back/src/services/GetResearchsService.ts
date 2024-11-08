import { prismaClient } from "../prisma/index";

interface SaveResearchersProps {
  currentUser: string,
}

class GetResearchersService {
  async execute( {currentUser} : SaveResearchersProps) {
    if (!currentUser) {
      throw new Error("Usuário inválido");
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        name: currentUser
      },
    });

    if (!findUser) {
      throw new Error("Usuário não existe");
    }

    const research = await prismaClient.research.findMany({
      where: {
        userId: findUser.id,
      },
    });

    return research;
  }
}

export { GetResearchersService };
