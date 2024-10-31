// @app.route('/awards/<id_lattes>', methods=['GET'])
// @app.route('/awards/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
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


// Fetch /retrieve_listagem_ppgs
// export function retrieveListagemPpgs() {
//   const [datas, setData] = useState();   
//   useEffect(() => { 
//     fetch('/api/retrieve_listagem_ppgs') 
//     .then(response => response.json()) 
//     .then(data => setData(data)) 
//     .catch(error => console.error('Error:', error)); 
//   }, []);
//   const data = datas ? datas.data : null;  
//   return data;
// }
