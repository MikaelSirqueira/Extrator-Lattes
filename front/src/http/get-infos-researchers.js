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
export async function conflictsJournals(id_lattes, begin_year = '', end_year = '') {
    const url = begin_year && end_year 
        ? `api/conflictsjournals/${id_lattes}/${begin_year}/${end_year}`
        : `api/conflictsjournals/${id_lattes}`;
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


// {
// 	"data": "TITULO,AUTORES,ANO,PESQUISADOR,DOI,TITULO DO PAPER SIMILAR,AUTORES DO PAPER SIMILAR,ANO DO PAPER SIMILAR,PESQUISADOR DO PAPER SIMILAR,DOI DO PAPER SIMILAR\r\nMASC: A MULTI-AGENT SYSTEM FOR CONTROL AND SUPERVISION OF INDUSTRIAL PLANTS,\"['EMERSON CABRERA PARAISO', 'CELSO A. A. KAESTNER']\",1997,Emerson Cabrera Paraiso,,MASC: A MULTI-AGENT SYSTEM FOR CONTROL AND SUPERVISION OF INDUSTRIAL PLANTS,\"['EMERSON CABRERA PARAISO', 'CELSO A. A. KAESTNER']\",1998,Emerson Cabrera Paraiso,\r\nMASC: A MULTI-AGENT SYSTEM FOR CONTROL AND SUPERVISION OF INDUSTRIAL PLANTS,\"['EMERSON CABRERA PARAISO', 'CELSO A. A. KAESTNER']\",1998,Emerson Cabrera Paraiso,,MASC: A MULTI-AGENT SYSTEM FOR CONTROL AND SUPERVISION OF INDUSTRIAL PLANTS,\"['EMERSON CABRERA PARAISO', 'CELSO A. A. KAESTNER']\",1997,Emerson Cabrera Paraiso,\r\n",
// 	"message": "successfully fetched"
// }
// // Fetch /conflictsconferences/:id_lattes/:begin_year/:end_year
export async function conflictsConferences(id_lattes, begin_year = '', end_year = '') {
    const url = begin_year && end_year 
        ? `api/conflictsconferences/${id_lattes}/${begin_year}/${end_year}`
        : `api/conflictsconferences/${id_lattes}`;
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


// Erro KeyError:TÍTULO 
// Fetch /conflictsbooks/:id_lattes/:begin_year/:end_year
export async function conflictsBooks(id_lattes, begin_year = '', end_year = '') {
    const url = begin_year && end_year 
        ? `api/conflictsbooks/${id_lattes}/${begin_year}/${end_year}`
        : `api/conflictsbooks/${id_lattes}`;
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
}


// {
// 	"data": "TITULO,AUTORES,ANO,PESQUISADOR,TITULO DO PAPER SIMILAR,AUTORES DO PAPER SIMILAR,ANO DO PAPER SIMILAR,PESQUISADOR DO PAPER SIMILAR\r\n",
// 	"message": "successfully fetched"
// }
// Fetch /conflictsbookchapters/:id_lattes/:begin_year/:end_year
export async function conflictsBookChapters(id_lattes, begin_year = '', end_year = '') {
    const url = begin_year && end_year 
        ? `api/conflictsbookchapters/${id_lattes}/${begin_year}/${end_year}`
        : `api/conflictsbookchapters/${id_lattes}`;
    
    const response = await fetch(url);      
    const result = await response.json();
    return result;
  }


// @app.route('/awards/<id_lattes>', methods=['GET'])
// @app.route('/awards/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
// {
// 	"data": "NOME_PREMIO,ENTIDADE_PROMOTORA_PREMIO,ANO,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nPrêmio Marcelino Champagnat - Mérito Acadêmico,Pontifícia Universidade Católica do Paraná,2013,Jean Paul Barddal,5862618116527136\r\nExcelência em Produção Científica - Q1,Pontifícia Universidade Católica do Paraná,2019,Jean Paul Barddal,5862618116527136\r\nArtigo de maior fator de impacto (PPGIa),Pontifícia Universidade Católica do Paraná,2019,Jean Paul Barddal,5862618116527136\r\nExcelência em Produção Científica - Q1,Pontifícia Universidade Católica do Paraná,2020,Jean Paul Barddal,5862618116527136\r\nPrêmio de Excelência no Ensino,Pontifícia Universidade Católica do Paraná,2020,Jean Paul Barddal,5862618116527136\r\nExcelência em Produção Científica - Q1,Pontifícia Universidade Católica do Paraná,2021,Jean Paul Barddal,5862618116527136\r\nArtigo de maior fator de impacto (PPGIa),Pontifícia Universidade Católica do Paraná,2021,Jean Paul Barddal,5862618116527136\r\nPrêmio de Excelência no Ensino,Pontifícia Universidade Católica do Paraná,2021,Jean Paul Barddal,5862618116527136\r\nProfessor Homenageado - Curso de Ciência da Computação,Pontifícia Universidade Católica do Paraná,2022,Jean Paul Barddal,5862618116527136\r\nProfessor Homenageado (2o semestre) - Curso de Ciência da Computação,Pontifícia Universidade Católica do Paraná,2022,Jean Paul Barddal,5862618116527136\r\nExcelência em Produção Científica - Q1,Pontifícia Universidade Católica do Paraná,2022,Jean Paul Barddal,5862618116527136\r\nPrêmio de Produtividade em Pesquisa,Pontifícia Universidade Católica do Paraná,2022,Jean Paul Barddal,5862618116527136\r\nPrêmio de Excelência no Ensino,Pontifícia Universidade Católica do Paraná,2022,Jean Paul Barddal,5862618116527136\r\nPRÊMIO CAPES DE TESE - EDIÇÃO 2023 (Co-orientador de Denise Maria Vecino Sato),Coordenação de Aperfeiçoamento de Pessoal de Nível Superior (CAPES),2023,Jean Paul Barddal,5862618116527136\r\nExcelência em Produção Científica - Q1,Pontifícia Universidade Católica do Paraná,2023,Jean Paul Barddal,5862618116527136\r\nPrêmio de Excelência no Ensino,Pontifícia Universidade Católica do Paraná,2023,Jean Paul Barddal,5862618116527136\r\nPrêmio de Produtividade em Pesquisa,Pontifícia Universidade Católica do Paraná,2023,Jean Paul Barddal,5862618116527136\r\nProfessor Homenageado - Curso de Ciência da Computação,Pontifícia Universidade Católica do Paraná,2023,Jean Paul Barddal,5862618116527136\r\nOrientador da Melhor Tese de Doutorado do PPGIa (Orientando: Antônio David Viniski),\"Programa de Pós-Graduação em Informática (PPGIa), Pontifícia Universidade Católica do Paraná\",2023,Jean Paul Barddal,5862618116527136\r\n",
// 	"message": "successfully fetched"
// }
export async function awards(id_lattes, begin_year = '', end_year = '') {
    const url = begin_year && end_year 
        ? `api/awards/${id_lattes}/${begin_year}/${end_year}`
        : `api/awards/${id_lattes}`;
        
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

// @app.route('/cnpq_pq/<id_lattes>', methods=['GET'])
// {
// 	"data": "NOME PESQUISADOR,NÍVEL PQ,INÍCIO VIGÊNCIA,TÉRMINO VIGÊNCIA,INSTITUIÇÃO PQ,ÁREA PQ\r\n",
// 	"message": "successfully fetched"
// }
export async function cnpq_pq(id_lattes) {
    const url = `api/cnpq_pq/${id_lattes}`;
        
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

// @app.route('/pqd/<id_lattes>/<area>/<begin_year>/<end_year>', methods=['GET'])
export async function pqd(id_lattes, area, begin_year, end_year) {
    const url = `api/pqd/${id_lattes}/${begin_year}/${end_year}`
        
    const response = await fetch(url);
    const result = await response.json();
    return result;
}


// @app.route('/journals/<id_lattes>/<area_avaliacao>', methods=['GET'])
// @app.route('/journals/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>/<area_avaliacao>', methods=['GET'])
export async function journals(id_lattes, begin_year = '', end_year = '', drop_duplicates='',area_avaliacao = '') {
    const url = begin_year && end_year && drop_duplicates
        ? `api/journals/${id_lattes}/${begin_year}/${end_year}/${drop_duplicates}/${area_avaliacao}`
        : `api/journals/${id_lattes}/${area_avaliacao}`;
    
    const response = await fetch(url);      
    const result = await response.json();
    return result; 
}

