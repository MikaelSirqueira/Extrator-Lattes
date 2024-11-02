import * as XLSX from 'xlsx';

async function fetchData() {
    const url = `api/retrieve_listagem_ppgs`
    const response = await fetch(url)

    const result = await response.json();
    const data = csvToArray(result.data);
    return data;
}

export async function getAllColleges() {
  const data = await fetchData();
  
  const uniqueInstitutions = 
    Array.
      from(new Set(data.map(row => row['Instituição']))).
      filter(institution => institution !== null);
    
  return uniqueInstitutions;

}

export async function getAllResearchers(college) {
  const data = await fetchData();

  const researchers = Array.from(new Set(
    data
      .filter(row => college ? row['Instituição'] === college : true)
      .map(row => row['Nome'])
  )).filter(name => name !== null);

  return researchers;
}

export async function getAllPpgs(college) {
  const data = await fetchData();

  const ppgs = Array.from(new Set(
    data
      .filter(row => college ? row['Instituição'] === college : true)
      .map(row => row['Nome do PPG'])
  )).filter(name => name !== null);

  console.log('ppg', ppgs)

  return ppgs;
}

export async function getIdByName(name1, name2) {
  const data = await fetchData()

  const findIdByName = (name) => {
    const row = data.find(row => row['Nome'].toUpperCase() === name);
    return row ? row['ID Lattes'] : null;
  };

  const id1 = findIdByName(name1);
  const id2 = findIdByName(name2);

  return { id1, id2 };
}

export async function getInfosById(id_lattes) {
  const data = await fetchData()

  const findIdById = (id_lattes) => {
    const row = data.find(row => row['ID Lattes'] == id_lattes);
    return {
      id: row['ID Lattes'],
      ppg: row['Nome do PPG'],
      college: row['Instituição'],
      area_avaliacao: row['Área de Avaliação'],
      nota: row['Nota'],
      Categoria: row['Categoria'],
    };
  };
  const { id, ppg, college, area_avaliacao, nota, Categoria } = findIdById(id_lattes)

  return { id, ppg, college, area_avaliacao, nota, Categoria };
}


export async function getIdsByProgram(programName1, collegeName1, programName2, collegeName2) {
  const data = await fetchData();

  if (!Array.isArray(data)) {
    console.error('Data não é um array:', data);
    return;
  }

  const findByName = async (programName, collegeName) => data
    .filter(row => 
      (row['Nome do PPG'] && row['Nome do PPG'].toUpperCase() === programName.toUpperCase()) && 
      (row['Instituição'] && row['Instituição'].toUpperCase() === collegeName.toUpperCase()) 
    )
    .map(row => row['ID Lattes']);

  const idsProgram1 = await findByName(programName1, collegeName1);
  const idsProgram2 = await findByName(programName2, collegeName2);

  return {
    0: idsProgram1,
    1: idsProgram2 
  };
}


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