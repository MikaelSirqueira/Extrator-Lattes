// Fetch /cv_raw/:id_lattes
export async function cvRaw(id_lattes) {   
    const response = await fetch(`api/cv_raw/${id_lattes}`)

    const result = await response.json();
    return result; 
}


// {
// 	"data": "TITULO,AUTORES,ANO,PESQUISADOR,DOI,TITULO DO PAPER SIMILAR,AUTORES DO PAPER SIMILAR,ANO DO PAPER SIMILAR,PESQUISADOR DO PAPER SIMILAR,DOI DO PAPER SIMILAR\r\n",
// 	"message": "successfully fetched"
// }
// Fetch /conflictsjournals/:id_lattes/:begin_year/:end_year
export async function conflictsJournals(id_lattes, begin_year, end_year) {
    const url = `api/conflictsjournals/${id_lattes}/${begin_year}/${end_year}`
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


// {
// 	"data": "TITULO,AUTORES,ANO,PESQUISADOR,DOI,TITULO DO PAPER SIMILAR,AUTORES DO PAPER SIMILAR,ANO DO PAPER SIMILAR,PESQUISADOR DO PAPER SIMILAR,DOI DO PAPER SIMILAR\r\nMASC: A MULTI-AGENT SYSTEM FOR CONTROL AND SUPERVISION OF INDUSTRIAL PLANTS,\"['EMERSON CABRERA PARAISO', 'CELSO A. A. KAESTNER']\",1997,Emerson Cabrera Paraiso,,MASC: A MULTI-AGENT SYSTEM FOR CONTROL AND SUPERVISION OF INDUSTRIAL PLANTS,\"['EMERSON CABRERA PARAISO', 'CELSO A. A. KAESTNER']\",1998,Emerson Cabrera Paraiso,\r\nMASC: A MULTI-AGENT SYSTEM FOR CONTROL AND SUPERVISION OF INDUSTRIAL PLANTS,\"['EMERSON CABRERA PARAISO', 'CELSO A. A. KAESTNER']\",1998,Emerson Cabrera Paraiso,,MASC: A MULTI-AGENT SYSTEM FOR CONTROL AND SUPERVISION OF INDUSTRIAL PLANTS,\"['EMERSON CABRERA PARAISO', 'CELSO A. A. KAESTNER']\",1997,Emerson Cabrera Paraiso,\r\n",
// 	"message": "successfully fetched"
// }
// // Fetch /conflictsconferences/:id_lattes/:begin_year/:end_year
export async function conflictsConferences(id_lattes, begin_year, end_year) {
    const url = `api/conflictsconferences/${id_lattes}/${begin_year}/${end_year}`

    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


// Erro KeyError:TÍTULO 
// Fetch /conflictsbooks/:id_lattes/:begin_year/:end_year
export async function conflictsBooks(id_lattes, begin_year, end_year) {
    const url = `api/conflictsbooks/${id_lattes}/${begin_year}/${end_year}`
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


// Fetch /conflictsbookchapters/:id_lattes/:begin_year/:end_year
export async function conflictsBookChapters(id_lattes, begin_year, end_year) {
    const url = `api/conflictsbookchapters/${id_lattes}/${begin_year}/${end_year}`    
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
  }


// @app.route('/cnpq_pq/<id_lattes>', methods=['GET'])
export async function cnpq_pq(id_lattes) {
    const url = `api/cnpq_pq/${id_lattes}`;
        
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

// @app.route('/pqd/<id_lattes>/<area>/<begin_year>/<end_year>', methods=['GET'])
export async function pqd(id_lattes, begin_year, end_year,  area='') {
    const url = `api/pqd/${id_lattes}/"${area}"/${begin_year}/${end_year}`
        
    const response = await fetch(url);
    const result = await response.json();
    return result;
}