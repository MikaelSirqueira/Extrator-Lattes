import { prismaClient } from "../prisma/index";

interface SaveResearchersProps {
  currentUser: string,
  name1: string, 
  name2: string, 
  college1: string | null,
  college2: string | null,
  beginYear: string | null,
  endYear: string | null,
  selectedFiles: string | null,
  selectedFilesPPG: string | null,
  dropDuplicates: boolean,
  isResearcher: boolean,
}

class CreateResearchersService {
  async execute({ currentUser, name1, name2, college1, college2, beginYear, endYear, selectedFiles, selectedFilesPPG, dropDuplicates, isResearcher }: SaveResearchersProps) {
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

    // Salvar a pesquisa na tabela Research
    const research = await prismaClient.research.create({
      data: {
        name1: name1,
        name2: name2,
        college1: college1,
        college2: college2,
        begin_year: beginYear,
        end_year: endYear,
        selected_files: selectedFiles,
        selected_files_ppg: selectedFilesPPG,
        drop_duplicates: dropDuplicates,
        is_researcher: isResearcher,
        userId: findUser.id, // Associar a pesquisa ao usuário
      },
    });

    return research; // Retornar a pesquisa criada
  }
}

export { CreateResearchersService };
