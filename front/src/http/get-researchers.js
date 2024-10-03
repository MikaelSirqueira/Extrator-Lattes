import * as XLSX from 'xlsx';

export async function getIdByName(name1, name2) {
  const response = await fetch('/ppgs/ppgs.xlsx');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const findIdByName = (name) => {
    const row = data.find(row => row[0].toUpperCase() === name);
    return row ? row[1] : null;
  };

  const id1 = findIdByName(name1);
  const id2 = findIdByName(name2);

  return { id1, id2 };
}

// Função para converter CSV em array de objetos
export function csvToArray(csv, delimiter = ',') {
  const headers = csv.slice(0, csv.indexOf('\n')).split(delimiter);
  const rows = csv.slice(csv.indexOf('\n') + 1).split('\n');
  
  const array = rows.map(row => {
    const values = row.split(delimiter);
    const obj = headers.reduce((acc, header, index) => {
      acc[header.trim()] = values[index] ? values[index].trim() : null;
      return acc;
    }, {});
    return obj;
  });

  return array;
}

//@app.route('/advising_ongoing/<id_lattes>', methods=['GET'])
//@app.route('/advising_ongoing/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
// {
// 	"data": "TITULO,TIPO,IDIOMA,ANO,NOME DO ESTUDANTE,TIPO DE ORIENTACAO,FLAG BOLSA,AGENCIA BOLSA,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nGENERATING USEFUL EXPLANATIONS IN NATURAL LANGUAGE USING TRANSFORMERS,DOUTORADO,INGLÊS,2022,LORENZO PUPPI VECCHI,ORIENTADOR_PRINCIPAL,NAO,,Emerson Cabrera Paraiso,3493899263715892\r\nANÁLISE DE SENTIMENTOS EM TRANSCRIÇÕES DE ÁUDIO,MESTRADO,PORTUGUÊS,2022,VINÍCIUS TERTULINO PAREDE,ORIENTADOR_PRINCIPAL,NAO,,Emerson Cabrera Paraiso,3493899263715892\r\n",
// 	"message": "successfully fetched"
// }
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
// {
// 	"data": "TITULO,TIPO,ANO,PAIS,IDIOMA,TIPO DE ORIENTACAO,NOME DO ESTUDANTE,ID LATTES ESTUDANTE,FLAG BOLSA,AGENCIA FINANCIADORA,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nALGORITMO PARA CLASSIFICAÇÃO MULTIRRÓTULO BASEADO EM BICLUSTERIZAÇÃO,DOUTORADO,2022,BRASIL,PORTUGUÊS,CO_ORIENTADOR,LUIZ RAFAEL SCHMITKE,,NAO,,Emerson Cabrera Paraiso,3493899263715892\r\nTRANSFERÊNCIA ENTRE ESTILOS DE TEXTO USANDO CYCLEGAN COM ESPAÇO LATENTE DE ESTILO SUPERVISIONADO,MESTRADO,2022,BRASIL,PORTUGUÊS,ORIENTADOR_PRINCIPAL,LORENZO PUPPI VECCHI,6473229102174981,SIM,COORDENAÇÃO DE APERFEIÇOAMENTO DE PESSOAL DE NÍVEL SUPERIOR,Emerson Cabrera Paraiso,3493899263715892\r\n",
// 	"message": "successfully fetched"
// }
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
export async function book(id_lattes, begin_year = '', end_year = '', drop_duplicates = 'true') {
  const url = begin_year && end_year 
      ? `api/book/${id_lattes}/${begin_year}/${end_year}/${drop_duplicates}`
      : `api/book/${id_lattes}`;
      
  const response = await fetch(url);
  const result = await response.json();
  return result;
}


// @app.route('/book_chapter/<id_lattes>', methods=['GET'])
// @app.route('/book_chapter/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>', methods=['GET'])
// {
// 	"data": "TITULO,TIPO,ANO,PAIS DE PUBLICACAO,IDIOMA,MEIO DE DIVULGACAO,HOMEPAGE,TITULO DO LIVRO,NUMERO DE VOLUMES,PAGINA INICIAL,PAGINA FINAL,ISBN,ORGANIZADORES,NUMERO DA EDICAO REVISAO,NUMERO DA SERIE,NOME DA EDITORA,CIDADE DA EDITORA,AUTORES,AUTORES LATTES IDS,PALAVRAS CHAVE,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nTEMPORAL TAGGING OF NOISY CLINICAL TEXTS IN BRAZILIAN PORTUGUESE,CAPÍTULO DE LIVRO PUBLICADO,2018,BRASIL,PORTUGUÊS,NAO_INFORMADO,HTTP://LINK.SPRINGER.COM/10.1007/978-3-319-99722-3_24,LECTURE NOTES IN COMPUTER SCIENCE,,231,241,9783319997216,,1,,,,\"['DE AZEVEDO, RAFAEL FARIA', 'RODRIGUES, JOÃO PEDRO SANTOS', 'DA SILVA REIS, MAYARA REGINA', 'MORO, CLAUDIA MARIA CABRAL', 'EMERSON CABRERA PARAISO']\",\"['9490357040571710', '0925881680887781', '', '5825603355712770', '']\",[],Emerson Cabrera Paraiso,3493899263715892\r\nIDENTIFYING INFLUENCES OF GAME UPGRADES ON PROFITABLE PLAYERS BEHAVIOR IN MMORPGS,CAPÍTULO DE LIVRO PUBLICADO,2019,BRASIL,PORTUGUÊS,NAO_INFORMADO,HTTP://LINK.SPRINGER.COM/10.1007/978-3-030-34644-7_24,LECTURE NOTES IN COMPUTER SCIENCE,,299,310,9783030346430,,1,,,,\"['MARTINS\\xa0KUMMER, LUIZ BERNARDO', 'IIDA, HIROYUKI', 'JULIO CESAR NIEVOLA', 'EMERSON CABRERA PARAISO']\",\"['1204266299731266', '', '9242867616608986', '']\",[],Emerson Cabrera Paraiso,3493899263715892",
// 	"message": "successfully fetched"
// }
export async function bookChapter(id_lattes, begin_year = '', end_year = '', drop_duplicates = 'true') {
  const url = begin_year && end_year 
      ? `api/book_chapter/${id_lattes}/${begin_year}/${end_year}/${drop_duplicates}`
      : `api/book_chapter/${id_lattes}`;
      
  const response = await fetch(url);
  const result = await response.json();
  return result;
}



// @app.route('/committee_participation/<id_lattes>', methods=['GET'])
// @app.route('/committee_participation/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
// {
// 	"data": "TITULO,TIPO,NIVEL,ANO,PAIS,IDIOMA,NOME DO ESTUDANTE,NOME DA INSTITUICAO,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nCONCEPT DRIFT DETECTION IN PROCESS MODELS,DEFESA,DOUTORADO,2022,BRASIL,INGLÊS,DENISE MARIA VECINO SATO,PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,Jean Paul Barddal,5862618116527136\r\nCONTRIBUIÇÃO DE MODELOS DE RECOMENDAÇÃO PARA PREVISÃO DE DESEMPENHO DE ALUNOS DE EDUCAÇÃO BÁSICA,QUALIFICAÇÃO,MESTRADO,2022,BRASIL,PORTUGUÊS,LUCIANO MAUDA JUNIOR,PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,Jean Paul Barddal,5862618116527136\r\nPATTERN SPOTTING AND IMAGE RETRIEVAL IN HISTORICAL DOCUMENTS USING DEEP HASHING,QUALIFICAÇÃO,MESTRADO,2022,BRASIL,INGLÊS,CAIO DA SILVA DIAS,PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,Jean Paul Barddal,5862618116527136",
// 	"message": "successfully fetched"
// }
export async function committeeParticipation(id_lattes, begin_year = '', end_year = '') {
  const url = begin_year && end_year 
      ? `api/committee_participation/${id_lattes}/${begin_year}/${end_year}`
      : `api/committee_participation/${id_lattes}`;
      
  const response = await fetch(url);
  const result = await response.json();
  return result;
}


// {
// 	"data": "TITULO,TIPO,ANO,PAIS,IDIOMA,NATUREZA,MEIO DE DIVULGACAO,HOMEPAGE,DOI,CLASSIFICACAO EVENTO,NOME DO EVENTO,TITULO PROCEEDINGS,VOLUME,FASCICULO,SERIE,PAGINA INICIAL,PAGINA FINAL,ISBN,NOME DA EDITORA,AUTORES,AUTORES LATTES IDS,PALAVRAS CHAVE,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR,QUALIS\r\nSISTEMA ESPECIALISTA EM MANUTENÇÃO PREDITIVA DE EQUIPAMENTOS E PLANTAS INDUSTRIAIS,COMPLETO,1993,BRASIL,PORTUGUÊS,COMPLETO,IMPRESSO,,,NACIONAL,I SIMPÓSIO BRASILEIRO DE AUTOMAÇÃO INTELIGENTE,I SIMPÓSIO BRASILEIRO DE AUTOMAÇÃO INTELIGENTE,,,,,,,,\"['EMERSON CABRERA PARAISO', 'LUCIO MAURO SILVEIRA']\",\"['3493899263715892', '']\",\"['SISTEMA ESPECIALISTA', 'MANUTENÇÃO PREDITIVA', 'PROGRAMAÇÃO ORIENTADA A OBJETOS']\",Emerson Cabrera Paraiso,3493899263715892,-\r\nCONTROLE DE GUINDASTE PROGRAMÁVEL INTELIGENTE,COMPLETO,1993,BRASIL,PORTUGUÊS,COMPLETO,IMPRESSO,,,NACIONAL,I SIMPÓSIO BRASILEIRO DE AUTOMAÇÃO INTELIGENTE,I SIMPÓSIO BRASILEIRO DE AUTOMAÇÃO INTELIGENTE,,,,,,,,['EMERSON CABRERA PARAISO'],['3493899263715892'],\"['SISTEMA ESPECIALISTA', 'CONTROLE PROGRAMÁVEL', 'ROBÓTICA']\",Emerson Cabrera Paraiso,3493899263715892,-\r\nSISTEMA ESPECIALISTA EM MANUTENÇÃO PREDITIVA DE EQUIPAMENTOS E PLANTAS INDUSTRIAIS,COMPLETO,1993,BRASIL,PORTUGUÊS,COMPLETO,IMPRESSO,,,REGIONAL,I ENCONTRO INTERUNIVERSITÁRIO DE INFORMÁTICA DO PARANÁ,I ENCONTRO INTERUNIVERSITÁRIO DE INFORMÁTICA DO PARANÁ,,,,,,,,\"['EMERSON CABRERA PARAISO', 'LUCIO MAURO SILVEIRA']\",\"['3493899263715892', '']\",\"['SISTEMA ESPECIALISTA', 'MANUTENÇÃO PREDITIVA']\",Emerson Cabrera Paraiso,3493899263715892,-\r\nCONTROLE DE GUINDASTE PROGRAMÁVEL INTELIGENTE,COMPLETO,1993,BRASIL,PORTUGUÊS,COMPLETO,IMPRESSO,,,REGIONAL,I ENCONTRO INTERUNIVERSITÁRIO DE INFORMÁTICA DO PARANÁ,I ENCONTRO INTERUNIVERSITÁRIO DE INFORMÁTICA DO PARANÁ,,,,,,,,['EMERSON CABRERA PARAISO'],['3493899263715892'],\"['CONTROLE DE PROCESSOS INDUSTRIAIS', 'ROBÓTICA', 'SISTEMA ESPECIALISTA']\",Emerson Cabrera Paraiso,3493899263715892,-\r\n",
// 	"message": "successfully fetched"
// }

// @app.route('/conferences/<id_lattes>', methods=['GET'])
// @app.route('/conferences/<id_lattes>/<begin_year>/<end_year>/<drop_duplicates>/<area_avaliacao>', methods=['GET'])
export async function conferences(id_lattes, begin_year = '', end_year = '', area_avaliacao = '') {
  const url = begin_year && end_year && is
      ? `api/projects/${id_lattes}/${begin_year}/${end_year}`
      : `api/projects/${id_lattes}`;

  const response = await fetch(`api/conferences/${id_lattes}`)      
  const result = await response.json();
  return result; 
}

// @app.route('/event_participation/<id_lattes>', methods=['GET'])
// @app.route('/event_participation/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
// {
// 	"data": "TITULO,TIPO,ANO,PAIS,IDIOMA,NOME DO EVENTO,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nIMPROVING DATA STREAM CLASSIFICATION USING INCREMENTAL YEO-JOHNSON POWER TRANSFORMATION,CONGRESSO,2022,REPÚBLICA TCHECA,,\"IEEE INTERNATIONAL CONFERENCE ON SYSTEMS, MAN, AND CYBERNETICS\",Jean Paul Barddal,5862618116527136\r\nA MACHINE LEARNING APPROACH FOR SCHOOL DROPOUT PREDICTION IN BRAZIL,SIMPÓSIO,2022,BÉLGICA,,\"EUROPEAN SYMPOSIUM ON ARTIFICIAL NEURAL NETWORKS, COMPUTATIONAL INTELLIGENCE AND MACHINE LEARNING\",Jean Paul Barddal,5862618116527136\r\n",
// 	"message": "successfully fetched"
// }
export async function eventParticipation(id_lattes, begin_year = '', end_year = '') {
  const url = begin_year && end_year 
      ? `api/event_participation/${id_lattes}/${begin_year}/${end_year}`
      : `api/event_participation/${id_lattes}`;
      
  const response = await fetch(url);
  const result = await response.json();
  return result;
}


// @app.route('/other_bibliography/<id_lattes>', methods=['GET'])
// @app.route('/other_bibliography/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
// {
// 	"data": "TITULO,TIPO,ANO,PAIS,IDIOMA,MEIO DE DIVULGACAO,HOMEPAGE,DOI,CIDADE DA EDITORA,ISSN-ISBN,NRO DE PAGINAS,AUTORES,AUTORES LATTES IDS,PALAVRAS CHAVE,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nVOICE ACTIVATED INFORMATION ENTRY,RELATORIO TECNICO,2003,FRANÇA,INGLÊS,IMPRESSO,WWW.PPGIA.PUCPR.BR/~PARAISO,,,,,\"['EMERSON CABRERA PARAISO', 'JEAN-PAUL BARTHÈS']\",\"['3493899263715892', '8748166744518917']\",\"['INTERFACE VOCAL', 'PROCESSAMENTO DE LINGUAGEM NATURAL', 'INTELIGÊNCIA ARTIFICAL DISTRIBUÍDA']\",Emerson Cabrera Paraiso,3493899263715892\r\nNATURAL LANGUAGE PROCESSING,CAPITULO EM RELATORIO DO PROJETO EUROPEU TERREGOV,2004,FRANÇA,INGLÊS,IMPRESSO,,,,,,['EMERSON CABRERA PARAISO'],['3493899263715892'],['PROCESSAMENTO DE LINGUAGEM NATURAL'],Emerson Cabrera Paraiso,3493899263715892\r\nSYNTHESIS ON AGENTS,RELATORIO TECNICO,2002,FRANÇA,INGLÊS,IMPRESSO,WWW.PPGIA.PUCPR.BR/~PARAISO,,,,,\"['EMERSON CABRERA PARAISO', 'JEAN-PAUL BARTHÈS']\",\"['3493899263715892', '8748166744518917']\",\"['APLICAÇÕES DE INTELIGÊNCIA ARTIFICAL', 'INTELIGÊNCIA ARTIFICAL DISTRIBUÍDA', 'SISTEMAS MULTI-AGENTES', 'AGENTES ASSISTENTES PESSOAIS']\",Emerson Cabrera Paraiso,3493899263715892\r\n",
// 	"message": "successfully fetched"
// }
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
// {
// 	"data": "TITULO,ANO,PAIS,HOMEPAGE,MEIO DE DIVULGACAO,POTENCIAL DE INOVACAO,FINALIDADE,INSTITUICAO FINANCIADORA,CATEGORIA,AUTORES,AUTORES LATTES IDS,INFORMACOES ADICIONAIS,PALAVRAS CHAVE,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nFERRAMENTA PARA IDENTIFICAÇÃO DE ASSEDIO MORAL EM MENSAGENS ELETRÔNICAS,2010,BRASIL,,IMPRESSO,NAO,FERRAMENTA PARA IDENTIFICAÇÃO DE ASSEDIO MORAL,,PROCESSO,['MARCO ANTONIO VILATORE'],[''],,[],Emerson Cabrera Paraiso,3493899263715892\r\nFERRAMENTA DE CRUZAMENTO DE DADOS DE LAUDOS PERICIAIS DE DISPOSITIVOS MÓVEIS,2016,BRASIL,,NAO_INFORMADO,SIM,,,PROCESSO,['ALONSO DECARLI'],['1551017554425865'],,[],Emerson Cabrera Paraiso,3493899263715892\r\nMÉTODO DE DETECÇÃO DE ALICIAMENTO DE CRIANÇAS E ADOLESCENTES EM MENSAGENS INSTANTÂNEAS,2013,BRASIL,,NAO_INFORMADO,SIM,,,PROCESSO,['PRISCILA L. L. SANTIN'],['6259009541108783'],,[],Emerson Cabrera Paraiso,3493899263715892\r\n",
// 	"message": "successfully fetched"
// }
export async function patents(id_lattes, begin_year = '', end_year = '', drop_duplicates = 'true') {
  const url = begin_year && end_year 
      ? `api/patents/${id_lattes}/${begin_year}/${end_year}/${drop_duplicates}`
      : `api/patents/${id_lattes}`;
      
  const response = await fetch(url);
  const result = await response.json();
  return result;
}


// @app.route('/process_or_techniques/<id_lattes>', methods=['GET'])
// @app.route('/process_or_techniques/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
// KeyError: 'ANO'
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
// {
// 	"data": "INSTITUICAO,ANO INICIO,ANO FIM,NOME INSTITUICAO,NOME ORGAO,NOME UNIDADE,NOME DO PROJETO,SITUACAO,NATUREZA,DESCRICAO,FLAG POTENCIAL INOVACAO,NRO GRADUACAO,NRO ESPECIALIZACAO,NRO MESTRADO ACADEMICO,NRO MESTRADO PROFISSIONAL,NRO DOUTORADO,NRO TECNICO MEDIO,EQUIPE DO PROJETO,LATTES EQUIPE DO PROJETO,FINANCIADORES DO PROJETO,NATUREZAS FINANCIADORES DO PROJETO,PRODUCOES DO PROJETO,TIPOS DAS PRODUCOES DO PROJETO,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR,ID LATTES,PESQUISADOR\r\nPONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,2006,,PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,REITORIA,,Interfaces Inteligentes para Agentes de Software,CONCLUIDO,PESQUISA,\"Fruto da união das áreas de Interface Homem-Máquina e dos Sistemas Inteligentes, este novo domínio conhece grande desenvolvimento nos últimos anos. No âmbito da pesquisa aplicada aos agentes, as interfaces inteligentes podem ser utilizadas de várias maneiras diferentes. &#10;Uma interface mais natural, transparente e intuitiva é necessária e nos propomos a buscar sua especificação e desenvolvimento tendo por base as tecnologias oriundas da inteligência artificial, como processamento de linguagem natural, representação do conhecimento, ontologias, sistemas Mult-Agentes, além de incorporar a esta interface o tratamento da voz humana, na forma de reconhecimento e síntese. &#10;    Neste projeto, aos agentes assistentes serão incorporados à uma interface conversacional, permitindo interagir (dialogar) com o usuário em linguagem natural escrita e/ou falada. Esta união cria o que chamaremos de Agentes Conversacional.\",NAO,,,1,,,,\"['Emerson Cabrera Paraiso', 'Lucas Galete']\",\"['3493899263715892', '2297705263564761']\",\"['Universitè de Technologie de Compiègne', 'Fundação Araucária de Apoio ao Desenvolvimento Científico e Tecnológico']\",\"['COOPERACAO', 'BOLSA']\",\"['Une interface conversationnelle pour les agents assistants appliqués à des activités professionnelles', 'A Speech Architecture for Personal Assistants in a Knowledge Management Context', 'An Intelligent Speech Interface for Personal Assistants in R&D Projects', 'SpeechPA: An   Ontology-Based Speech Interface for Personal Assistants', 'An Intelligent Speech Interface for Personal Assistants Applied to Knowledge Management', 'An Intelligent Speech Interface for Personal Systems in R&D Projects', 'ICAI: Interface Conversational para uma Ajuda Inteligente', 'An Ontology-Based Utterance Interpretation in the Context of Intelligent Assistance', 'Ontology-Based Utterance Interpretation for Intelligent Conversational Interfaces']\",\"['Trabalho publicado em anais de eventos(Completo)', 'Trabalho publicado em anais de eventos', 'Trabalho publicado em anais de eventos(Completo)', 'Trabalho publicado em anais de eventos(Completo)', 'Artigo publicado em periódicos(Completo)', 'Artigo publicado em periódicos(Completo)', 'Software(Computacional)', 'Trabalho publicado em anais de eventos', 'Trabalho publicado em anais de eventos(Completo)']\",Emerson Cabrera Paraiso,3493899263715892,3493899263715892,Emerson Cabrera Paraiso\r\nPONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,2016,,PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,REITORIA,PROGRAMA DE PÓS-GRADUAÇÃO EM TECNOLOGIA EM SAÚDE,FIGTEM: FineGrained Text Mining for Clinical Trials,EM_ANDAMENTO,PESQUISA,Projeto de colaboração internacional com o objetivo de aplicar técnicas de Processamento de Linguagem Natural e Recuperação da Informação em documentos clínicos.,NAO,,,,,2,,\"['Emerson Cabrera Paraiso', 'Claudia Moro', 'Marcias Regina Cubas', 'Deborah Ribeiro Carvalho', 'Percy Nohama', 'Vincent Claveau', 'Ewa Kijak', 'Natalia Grabar']\",\"['3493899263715892', '5825603355712770', '0226526134229057', '2294403751807996', '', '', '', '']\",[],[],[],[],Emerson Cabrera Paraiso,3493899263715892,3493899263715892,Emerson Cabrera Paraiso\r\n",
// 	"message": "successfully fetched"
// }
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
// {
// 	"data": "TITULO,NIVEL,ANO,PAIS,IDIOMA,MEIO DE DIVULGACAO,HOMEPAGE,INSTITUICAO PROMOTORA,LOCAL,CIDADE,DURACAO,UNIDADE,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nPROGRAMAÇÃO JAVA,OUTRA,2007,BRASIL,PORTUGUÊS,NAO_INFORMADO,,INSTITUTO DE TECNOLOGIA DO PARANÁ,TECPAR,CURITIBA,18,HORAS,Emerson Cabrera Paraiso,3493899263715892\r\nINTELIGÊNICA ARTIFICAL DISTRIBUÍDA,OUTRA,1999,BRASIL,PORTUGUÊS,IMPRESSO,,PUC/PR,PUC/PR,CURITIBA,0,,Emerson Cabrera Paraiso,3493899263715892\r\n",
// 	"message": "successfully fetched"
// }
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
// {
// 	"data": "TITULO SOFTWARE,TIPO,ANO,PAIS,HOMEPAGE,FINALIDADE,PLATAFORMA,AMBIENTE,INSTITUICAO FINANCIADORA,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nPRAX FOR WINDOWS,COMPUTACIONAL,1996,BRASIL,,TRANSMISSÃO DE ARQUIVOS VIA MODEM,,WINDOWS,,Emerson Cabrera Paraiso,3493899263715892\r\nICAI: INTERFACE CONVERSATIONAL PARA UMA AJUDA INTELIGENTE,COMPUTACIONAL,2005,BRASIL,WWW.PPGIA.PUCPR.BR/~PARAISO,INTERFACE CONVERSACIONAL PARA UM AGENTE ASSISTENTE,,,PUCPR/CAPES,Emerson Cabrera Paraiso,3493899263715892\r\nTV2D - TECLADO VIRTUAL PARA A TV DIGITAL BRASILEIRA,COMPUTACIONAL,2008,BRASIL,WWW.PPGIA.PUCPR.BR/~PARAISO,BIBLIOTECA DE CLASSES JAVA PARA INCORPORAÇÃO DE UM TECLADO VIRTUAL EM APLICAÇÕES JAVA PARA A TV DIGITAL BRASILEIRA,,,,Emerson Cabrera Paraiso,3493899263715892\r\n,
// 	"message": "successfully fetched"
// }
export async function software(id_lattes, begin_year = '', end_year = '') {
  const url = begin_year && end_year 
      ? `api/short_duration_course/${id_lattes}/${begin_year}/${end_year}`
      : `api/short_duration_course/${id_lattes}`;
      
  const response = await fetch(url);
  const result = await response.json();
  return result;
}



// @app.route('/teaching_activities/<id_lattes>', methods=['GET'])
// @app.route('/teaching_activities/<id_lattes>/<begin_year>/<end_year>', methods=['GET'])
// {
// 	"data": "DISCIPLINAS,INSTITUICAO,FLAG_PERIODO,TIPO_ENSINO,MES_INICIO,ANO_INICIO,MES_FIM,ANO_FIM,CODIGO_CURSO,NOME_CURSO,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nProgramação - Java,PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,ATUAL,GRADUACAO,4,1995,-1,-1,90000011,SISTEMAS DE INFORMAÇÃO,Emerson Cabrera Paraiso,3493899263715892\r\nRaciocínio Algoritmico,PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ,ATUAL,GRADUACAO,4,1995,-1,-1,90000011,SISTEMAS DE INFORMAÇÃO,Emerson Cabrera Paraiso,3493899263715892\r\n",
// 	"message": "successfully fetched"
// }
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
// {
// 	"data": "TITULO,TIPO,ANO,PAIS,IDIOMA,MEIO DE DIVULGACAO,HOMEPAGE,FINALIDADE,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nOFICINA MAKER MACHINE LEARNING PARA BIG DATA,PREPARAÇÃO DE MATERIAL DIDÁTICO PARA ENSINO A DISTÂNCIA (EAD),2019,BRASIL,PORTUGUÊS,MEIO_DIGITAL,,,Jean Paul Barddal,5862618116527136\r\nPREPARAÇÃO E ANÁLISE EXPLORATÓRIA DE DADOS,DESENVOLVIMENTO DE MATERIAL DIDÁTICO OU INSTRUCIONAL,2020,BRASIL,PORTUGUÊS,MEIO_DIGITAL,,,Jean Paul Barddal,5862618116527136\r\n",
// 	"message": "successfully fetched"
// }
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
// {
// 	"data": "TITULO,NATUREZA,TIPO,ANO,PAIS,IDIOMA,MEIO DE DIVULGACAO,HOMEPAGE,DOI,POTENCIAL INOVACAO,FINALIDADE,CIDADE,INSTITUICAO FINANCIADORA,AUTORES,AUTORES IDS,INFORMACOES ADICIONAIS,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nSUPERMARKET DATASET WITH IMPLICIT FEEDBACK,OUTRA,OUTRO,2021,BRASIL,PORTUGUÊS,MEIO_DIGITAL,,,NAO,BASE DE DADOS,,,\"['ANTÔNIO DAVID VINISKI', 'ALCEU DE, S. BRITTO', 'JEAN PAUL BARDDAL']\",\"['5764548461038676', '4251936710939364', '']\",,Jean Paul Barddal,5862618116527136\r\n",
// 	"message": "successfully fetched"
// }
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
// {
// 	"data": "TITULO,TIPO,ANO,IDIOMA,NOME DO EVENTO,INSTITUICAO PROMOTORA,LOCAL DA APRESENTACAO,CIDADE DA APRESENTACAO,NOME_PESQUISADOR,ID_LATTES_PESQUISADOR\r\nREGRESSION TEST CASES PRIORITIZATION USING FAILURE PURSUIT SAMPLING,CONFERENCIA,2010,INGLÊS,IEEE INTERNATIONAL CONFERENCE ON INTELLIGENT SYSTEMS DESIGN AND APPLICATIONS,IEEE,UNIVERSITY OF CAIRO,CAIRO,Emerson Cabrera Paraiso,3493899263715892\r\nIDENTIFICAÇÃO DE EMOÇÕES EM NOTÍCIAS CURTAS,CONGRESSO,2010,PORTUGUÊS,CLEI - CONFERÊNCIA LATINO-AMERIACA DE INFORMÁTICA,CLEI,UNIVERSIDAD DE ASSUNCION,ASSUNÇÃO,Emerson Cabrera Paraiso,3493899263715892\r\n",
// 	"message": "successfully fetched"
// }
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
