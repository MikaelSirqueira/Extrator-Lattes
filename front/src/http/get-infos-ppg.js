// Fetch /cv_raw/:id_lattes
export async function cvRaw(id_lattes) {   
    const response = await fetch(`api/cv_raw/${id_lattes}`)

    const result = await response.json();
    return result; 
}

export async function retrieveListagemPpgs(id_lattes) {   
    const response = await fetch(`api/retrieve_listagem_ppgs`)

    const result = await response.json();
    return result; 
}


export async function conflictsJournals(id_lattes, begin_year, end_year) {
    const url = `api/conflictsjournals/${id_lattes}/${begin_year}/${end_year}`
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


export async function conflictsConferences(id_lattes, begin_year, end_year) {
    const url = `api/conflictsconferences/${id_lattes}/${begin_year}/${end_year}`

    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


export async function conflictsBooks(id_lattes, begin_year, end_year) {
    const url = `api/conflictsbooks/${id_lattes}/${begin_year}/${end_year}`
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


export async function conflictsBookChapters(id_lattes, begin_year, end_year) {
    const url = `api/conflictsbookchapters/${id_lattes}/${begin_year}/${end_year}`    
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
  }


export async function cnpq_pq(id_lattes) {
    const url = `api/cnpq_pq/${id_lattes}`;
        
    const response = await fetch(url);
    const result = await response.json();
    return result;
}


export async function pqd(id_lattes, begin_year, end_year,  area='') {
    const url = `api/pqd/${id_lattes}/"${area}"/${begin_year}/${end_year}`
        
    const response = await fetch(url);
    const result = await response.json();
    return result;
}