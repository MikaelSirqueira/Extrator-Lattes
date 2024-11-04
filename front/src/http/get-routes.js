import * as XLSX from 'xlsx';

const fileLabels = {
  'conference.xlsx': 'Conferências',
  'work_presentation.xlsx': 'Apresentações de Trabalho',
  'technological_products.xlsx': 'Produtos Tecnológicos',
  'teaching_materials.xlsx': 'Materiais de Ensino',
  'teaching_activities.xlsx': 'Atividades de Ensino',
  'software.xlsx': 'Software',
  'short_duration_course.xlsx': 'Cursos de Curta Duração',
  'projects.xlsx': 'Projetos',
  'process_or_techniques.xlsx': 'Processos ou Técnicas',
  'patents.xlsx': 'Patentes',
  'other_technical_production.xlsx': 'Produção Técnica Outros',
  'other_bibliography.xlsx': 'Outras Bibliografias',
  'event_participation.xlsx': 'Participação em Eventos',
  'committee_participation.xlsx': 'Participação em Comitês',
  'book_chapter.xlsx': 'Capítulos de Livros',
  'advising_ongoing.xlsx': 'Orientações em Andamento',
  'advising_complete.xlsx': 'Orientações Concluídas'
};

async function fetchData(file) {
  const response = await fetch(`database/${file}`, {
    headers: {
      'Content-Type': 'arraybuffer',
    },
  });
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
  const json = XLSX.utils.sheet_to_json(worksheet);

  return json;
}

export async function advisingOnGoing(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('advising_ongoing.xlsx');
  console.log('Dados de advising_ongoing.xlsx:', data); // Log dos dados

  const result = begin_year && end_year
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function advisingComplete(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('advising_complete.xlsx');
  console.log('Dados de advising_complete.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function book(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
  const data = await fetchData('book.xlsx');
  console.log('Dados de book.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function bookChapter(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
  const data = await fetchData('book_chapter.xlsx');
  console.log('Dados de book_chapter.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function committeeParticipation(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('committee_participation.xlsx');
  console.log('Dados de committee_participation.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function conferences(id_lattes, begin_year = '', end_year = '', drop_duplicates = '', area_avaliacao = '') {
  const data = await fetchData('conference.xlsx');
  console.log('Dados de conference.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function eventParticipation(id_lattes, begin_year = "", end_year = "") {
  const data = await fetchData('event_participation.xlsx');
  console.log('Dados de event_participation.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function journals(id_lattes, begin_year = '', end_year = '', drop_duplicates='', area_avaliacao = '') {
  const data = await fetchData('journals.xlsx');
  console.log('Dados de journals.xlsx:', data); // Log dos dados

  const result = begin_year && end_year && drop_duplicates
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function otherBibliography(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('other_bibliography.xlsx');
  console.log('Dados de other_bibliography.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function otherTechnicalProduction(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('other_technical_production.xlsx');
  console.log('Dados de other_technical_production.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function patents(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
  const data = await fetchData('patents.xlsx');
  console.log('Dados de patents.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function processOrTechniques(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('process_or_techniques.xlsx');
  console.log('Dados de process_or_techniques.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function projects(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('projects.xlsx');
  console.log('Dados de projects.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO INICIO'] >= begin_year && 
        row['ANO FIM'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function shortDurationCourse(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('short_duration_course.xlsx');
  console.log('Dados de short_duration_course.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function software(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
  const data = await fetchData('software.xlsx');
  console.log('Dados de software.xlsx:', data); // Log dos dados

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function teachingActivities(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('teaching_activities.xlsx');

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function teachingMaterials(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('teaching_materials.xlsx');

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function technologicalProducts(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('technological_products.xlsx');

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}

export async function workPresentation(id_lattes, begin_year = '', end_year = '') {
  const data = await fetchData('work_presentation.xlsx');

  const result = begin_year && end_year 
    ? data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes && 
        row['ANO'] >= begin_year && 
        row['ANO'] <= end_year
      )
    : data.filter(row => 
        row['ID_LATTES_PESQUISADOR'] &&
        row['ID_LATTES_PESQUISADOR'] == id_lattes
      );

  return result;
}
