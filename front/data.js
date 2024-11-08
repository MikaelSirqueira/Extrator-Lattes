import * as XLSX from 'xlsx';
import axios from 'axios';

export function csvToArray(csv, delimiter = ',') {
    const headers = csv.slice(0, csv.indexOf('\n')).split(delimiter);
    const rows = csv.slice(csv.indexOf('\n') + 1).split('\n');
    
    return rows.map(row => {
        const values = row.split(delimiter);
        return headers.reduce((acc, header, index) => {
            acc[header.trim()] = values[index] ? values[index].trim() : null;
            return acc;
        }, {});
    });
}

async function saveDataAsXlsx() {
    try {
        // Realize a requisição e obtenha os dados
        const url = `http://hermes.ep.pucpr.br:5000/retrieve_listagem_ppgs`;
        const response = await fetch(url);
        const rawData = await response.json();

        // Verifique se `rawData` é uma string ou um objeto JSON
        const csvData = typeof rawData === 'string' ? rawData : JSON.stringify(rawData);

        // Converta o CSV para JSON
        const data = csvToArray(csvData);

        // Crie a planilha Excel com os dados
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Configure a coluna "ID Lattes" para ser interpretada como texto
        const idLattesColumnIndex = data[0] ? Object.keys(data[0]).indexOf('ID Lattes') : -1;

        if (idLattesColumnIndex !== -1) {
            // Aplica o formato de texto ('@') para a coluna "ID Lattes"
            Object.keys(worksheet).forEach(cell => {
                if (cell.startsWith(XLSX.utils.encode_col(idLattesColumnIndex))) {
                    worksheet[cell].z = '@'; // Define como texto
                }
            });
        }

        // Crie o workbook e salve o arquivo
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');

        // Salve o arquivo em disco
        const filePath = 'dados.xlsx';
        XLSX.writeFile(workbook, filePath);
    } catch (error) {
        console.error('Erro ao processar a requisição ou salvar o arquivo:', error);
    }
}

saveDataAsXlsx();
