import { advisingComplete, advisingOnGoing, awards, book, bookChapter, committeeParticipation, conferences, eventParticipation, journals, otherBibliography, otherTechnicalProduction, patents, processOrTechniques, projects, shortDurationCourse, software, teachingActivities, teachingMaterials, technologicalProducts, workPresentation } from './get-routes';
import { cvRaw, conflictsJournals, conflictsConferences, conflictsBooks, conflictsBookChapters, cnpq_pq, pqd } from './get-infos-ppg';


export const fileLabelsExport = {
  'conferences': 'Conferências',
  'projects': 'Projetos',
  'software': 'Quantidade de Software',
  'journals': 'Periódicos',
  'advisingComplete': 'Orientações Completas',
  'advisingOnGoing': 'Orientações em Andamento',
  'workPresentation': 'Apresentações de Trabalho',
  'teachingActivities': 'Atividades de Ensino',
  'book': 'Quantidade de Livros',
  'bookChapter': 'Quantidade de Capítulos de Livro',
  'shortDurationCourse': 'Curso de Curta Duração',
  'otherBibliography': 'Outras Bibliografias',
  'patents': 'Quantidade de Patentes',
  'otherTechnicalProduction': 'Outras Produções Técnicas',
  'teachingMaterials': 'Quantidade de Materiais Didáticos',
  'committeeParticipation': 'Participação em Comitês',
  'eventParticipation': 'Participação em Eventos',
  'processOrTechniques': 'Processos ou Técnicas',
  'technologicalProducts': 'Produtos Tecnológicos',
  'awards': 'Prêmios e Títulos',
};

export const ppgFileLabelsExport = {
  // 'cvRaw': 'Currículo Lattes',
  'conflictsJournals': 'Conflitos em Periódicos',
  'conflictsConferences': 'Conflitos em Conferências',
  'conflictsBooks': 'Conflitos em Livros',
  'conflictsBookChapters': 'Conflitos em Capítulos de Livros',
  'cnpq_pq': 'CNPq PQ',
  'pqd': 'Produção Qualificada por Área',
};

export const ppgFunctionMapExport = {
  // 'cvRaw': cvRaw,
  'conflictsJournals': conflictsJournals,
  'conflictsConferences': conflictsConferences,
  'conflictsBooks': conflictsBooks,
  'conflictsBookChapters': conflictsBookChapters,
  'cnpq_pq': cnpq_pq,
  'pqd': pqd,
};

export const functionMapExport = {
  'conferences': conferences,
  'projects': projects,
  'software': software,
  'journals': journals,
  'advisingComplete': advisingComplete,
  'advisingOnGoing': advisingOnGoing,
  'workPresentation': workPresentation,
  'teachingActivities': teachingActivities,
  'book': book,
  'bookChapter': bookChapter,
  'shortDurationCourse': shortDurationCourse,
  'otherBibliography': otherBibliography,
  'patents': patents,
  'otherTechnicalProduction': otherTechnicalProduction,
  'teachingMaterials': teachingMaterials,
  'committeeParticipation': committeeParticipation,
  'eventParticipation': eventParticipation,
  'processOrTechniques': processOrTechniques,
  'technologicalProducts': technologicalProducts,
  'awards': awards,
};