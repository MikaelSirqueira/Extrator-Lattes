export async function awards(id_lattes, begin_year = '', end_year = '') {
  const url = begin_year && end_year 
      ? `api/awards/${id_lattes}/${begin_year}/${end_year}`
      : `api/awards/${id_lattes}`;
      
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

//@app.route('/advising_ongoing/<id_lattes>', methods=['GET'])
//@app.route('/advising_ongoing/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function advisingOnGoing(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/advising_ongoing/${id_lattes}/${begin_year}/${end_year}`
    : `api/advising_ongoing/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/advising_complete/<id_lattes>', methods=['GET'])
// @app.route('/advising_complete/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function advisingComplete(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/advising_complete/${id_lattes}/${begin_year}/${end_year}`
    : `api/advising_complete/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/book/<id_lattes>', methods=['GET'])
// @app.route('/book/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>', methods=['GET'])
export async function book(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
const url = begin_year && end_year 
    ? `api/book/${id_lattes}/${begin_year}/${end_year}/"${drop_duplicates}"`
    : `api/book/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/book_chapter/<id_lattes>', methods=['GET'])
// @app.route('/book_chapter/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>', methods=['GET'])
export async function bookChapter(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
const url = begin_year && end_year 
    ? `api/book_chapter/${id_lattes}/${begin_year}/${end_year}/"${drop_duplicates}"`
    : `api/book_chapter/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}



// @app.route('/committee_participation/<id_lattes>', methods=['GET'])
// @app.route('/committee_participation/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function committeeParticipation(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/committee_participation/${id_lattes}/${begin_year}/${end_year}`
    : `api/committee_participation/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}

// @app.route('/conferences/<id_lattes>', methods=['GET'])
// @app.route('/conferences/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>/<area_avaliacao>', methods=['GET'])
export async function conferences(id_lattes, begin_year = '', end_year = '', drop_duplicates = '' , area_avaliacao = '') {
const url = begin_year && end_year 
    ? `api/conferences/${id_lattes}/${begin_year}/${end_year}/"${drop_duplicates}"/"${area_avaliacao}"`
    : `api/conferences/${id_lattes}`;

const response = await fetch(url);
const result = await response.json();
return result; 
}

// @app.route('/event_participation/<id_lattes>', methods=['GET'])
// @app.route('/event_participation/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function eventParticipation(id_lattes, begin_year = "", end_year = "") {
const url = begin_year && end_year 
    ? `api/event_participation/${id_lattes}/${begin_year}/${end_year}`
    : `api/event_participation/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();  
return result;
}

// @app.route('/journals/<id_lattes>/<area_avaliacao>', methods=['GET'])
// @app.route('/journals/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>/<area_avaliacao>', methods=['GET'])
export async function journals(id_lattes, begin_year = '', end_year = '', drop_duplicates='',area_avaliacao = '') {
const url = begin_year && end_year && drop_duplicates
    ? `api/journals/${id_lattes}/${begin_year}/${end_year}/"${drop_duplicates}"/"${area_avaliacao}"`
    : `api/journals/${id_lattes}/${area_avaliacao}`;

const response = await fetch(url);      
const result = await response.json();
return result; 
}


// @app.route('/other_bibliography/<id_lattes>', methods=['GET'])
// @app.route('/other_bibliography/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function otherBibliography(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/other_bibliography/${id_lattes}/${begin_year}/${end_year}`
    : `api/other_bibliography/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/other_technical_production/<id_lattes>', methods=['GET'])
// @app.route('/other_technical_production/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
// {
// 	"data": "NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\n",
// 	"message": "successfully fetched"
// }
export async function otherTechnicalProduction(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/other_technical_production/${id_lattes}/${begin_year}/${end_year}`
    : `api/other_technical_production/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/patents/<id_lattes>', methods=['GET'])
// @app.route('/patents/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>', methods=['GET'])
export async function patents(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
const url = begin_year && end_year 
    ? `api/patents/${id_lattes}/${begin_year}/${end_year}/"${drop_duplicates}"`
    : `api/patents/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/process_or_techniques/<id_lattes>', methods=['GET'])
// @app.route('/process_or_techniques/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function processOrTechniques(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/process_or_techniques/${id_lattes}/${begin_year}/${end_year}`
    : `api/process_or_techniques/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/projects/<id_lattes>', methods=['GET'])
// @app.route('/projects/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function projects(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/projects/${id_lattes}/${begin_year}/${end_year}`
    : `api/projects/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/short_duration_course/<id_lattes>', methods=['GET'])
// @app.route('/short_duration_course/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function shortDurationCourse(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/short_duration_course/${id_lattes}/${begin_year}/${end_year}`
    : `api/short_duration_course/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/software/<id_lattes>', methods=['GET'])
// @app.route('/software/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>', methods=['GET'])
export async function software(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
const url = begin_year && end_year 
    ? `api/software/${id_lattes}/${begin_year}/${end_year}/"${drop_duplicates}"`
    : `api/software/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}



// @app.route('/teaching_activities/<id_lattes>', methods=['GET'])
// @app.route('/teaching_activities/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function teachingActivities(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/teaching_activities/${id_lattes}/${begin_year}/${end_year}`
    : `api/teaching_activities/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}



// @app.route('/teaching_materials/<id_lattes>', methods=['GET'])
// @app.route('/teaching_materials/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function teachingMaterials(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/teaching_materials/${id_lattes}/${begin_year}/${end_year}`
    : `api/teaching_materials/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/technological_products/<id_lattes>', methods=['GET'])
// @app.route('/technological_products/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function technologicalProducts(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/technological_products/${id_lattes}/${begin_year}/${end_year}`
    : `api/technological_products/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// @app.route('/work_presentation/<id_lattes>', methods=['GET'])
// @app.route('/work_presentation/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
export async function workPresentation(id_lattes, begin_year = '', end_year = '') {
const url = begin_year && end_year 
    ? `api/work_presentation/${id_lattes}/${begin_year}/${end_year}`
    : `api/work_presentation/${id_lattes}`;
    
const response = await fetch(url);
const result = await response.json();
return result;
}


// import * as XLSX from 'xlsx';

// const fileLabels = {
//   'conference.xlsx': 'Conferências',
//   'work_presentation.xlsx': 'Apresentações de Trabalho',
//   'technological_products.xlsx': 'Produtos Tecnológicos',
//   'teaching_materials.xlsx': 'Materiais de Ensino',
//   'teaching_activities.xlsx': 'Atividades de Ensino',
//   'software.xlsx': 'Software',
//   'short_duration_course.xlsx': 'Cursos de Curta Duração',
//   'projects.xlsx': 'Projetos',
//   'process_or_techniques.xlsx': 'Processos ou Técnicas',
//   'patents.xlsx': 'Patentes',
//   'other_technical_production.xlsx': 'Produção Técnica Outros',
//   'other_bibliography.xlsx': 'Outras Bibliografias',
//   'event_participation.xlsx': 'Participação em Eventos',
//   'committee_participation.xlsx': 'Participação em Comitês',
//   'book_chapter.xlsx': 'Capítulos de Livros',
//   'advising_ongoing.xlsx': 'Orientações em Andamento',
//   'advising_complete.xlsx': 'Orientações Concluídas'
// };

// async function fetchData(file) {
//   const response = await fetch(`database/${file}`, {
//     headers: {
//       'Content-Type': 'arraybuffer',
//     },
//   });
//   const arrayBuffer = await response.arrayBuffer();
//   const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
//   const worksheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[worksheetName];
//   const json = XLSX.utils.sheet_to_json(worksheet);

//   return json;
// }

// export async function advisingOnGoing(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('advising_ongoing.xlsx');

//   const result = begin_year && end_year
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function advisingComplete(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('advising_complete.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function book(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
//   const data = await fetchData('book.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function bookChapter(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
//   const data = await fetchData('book_chapter.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function committeeParticipation(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('committee_participation.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function conferences(id_lattes, begin_year = '', end_year = '', drop_duplicates = '', area_avaliacao = '') {
//   const data = await fetchData('conference.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function eventParticipation(id_lattes, begin_year = "", end_year = "") {
//   const data = await fetchData('event_participation.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function journals(id_lattes, begin_year = '', end_year = '', drop_duplicates='', area_avaliacao = '') {
//   const data = await fetchData('journals.xlsx');

//   const result = begin_year && end_year && drop_duplicates
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function otherBibliography(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('other_bibliography.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function otherTechnicalProduction(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('other_technical_production.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function patents(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
//   const data = await fetchData('patents.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function processOrTechniques(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('process_or_techniques.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function projects(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('projects.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO INICIO'] >= begin_year && 
//         row['ANO FIM'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function shortDurationCourse(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('short_duration_course.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function software(id_lattes, begin_year = '', end_year = '', drop_duplicates = '') {
//   const data = await fetchData('software.xlsx');
//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function teachingActivities(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('teaching_activities.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function teachingMaterials(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('teaching_materials.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function technologicalProducts(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('technological_products.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }

// export async function workPresentation(id_lattes, begin_year = '', end_year = '') {
//   const data = await fetchData('work_presentation.xlsx');

//   const result = begin_year && end_year 
//     ? data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes && 
//         row['ANO'] >= begin_year && 
//         row['ANO'] <= end_year
//       )
//     : data.filter(row => 
//         row['ID_LATTES_PESQUISADOR'] &&
//         row['ID_LATTES_PESQUISADOR'] == id_lattes
//       );

//   return result;
// }
