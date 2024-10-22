import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Função para criar o arquivo .env com a variável DATABASE_URL
function createEnvFile(directory) {
    const envPath = path.join(directory, '.env');
    if (!fs.existsSync(envPath)) {
        const envContent = `DATABASE_URL="mysql://root:root@localhost:3306/usuario"`;
        fs.writeFileSync(envPath, envContent);
        console.log(`.env file created at ${envPath} with DATABASE_URL`);
    }
}

// Função para instalar dependências e rodar o servidor em uma pasta específica
function startServer(directory, label) {
    console.log(`\n\n============================`);
    console.log(`Iniciando a instalação do ${label}, por favor aguarde...`);
    console.log(`============================\n`);

    // Cria o arquivo .env na pasta 'back' se necessário
    if (label === 'back') {
        createEnvFile(directory);
    }

    // Primeiro, executa 'npm install'
    const install = exec(`cd ${directory} && npm install`);
    install.stdout.on('data', (data) => console.log(`${label} Install: ${data}`));
    install.stderr.on('data', (data) => console.error(`${label} Install Error: ${data}`));

    // Quando 'npm install' termina, inicia 'npm run dev'
    install.on('close', (code) => {
        if (code === 0) { // Se 'npm install' for bem-sucedido
            console.log(`\n\n============================`);
            console.log(`Instalação do ${label} concluída. Iniciando o servidor...`);
            console.log(`============================\n`);

            // Verifica e gera o Prisma Client apenas no 'back'
            if (label === 'back') {
                generatePrismaClient(directory).then(() => {
                    runDev(directory, label);
                }).catch(error => console.error(`${label} Prisma Error: ${error.message}`));
            } else {
                runDev(directory, label);
            }
        } else {
            console.error(`${label} Install failed with code ${code}`);
        }
    });
}

// Função para gerar o Prisma Client
function generatePrismaClient(directory) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path.join(directory, 'node_modules', '@prisma', 'client'))) {
            console.log("Prisma Client already exists, skipping generate.");
            resolve();
        } else {
            const generate = exec(`cd ${directory} && npx prisma generate`);
            generate.stdout.on('data', (data) => console.log(`Prisma Generate: ${data}`));
            generate.stderr.on('data', (data) => console.error(`Prisma Generate Error: ${data}`));
            generate.on('close', (code) => {
                if (code === 0) {
                    console.log("Prisma Client generated successfully.");
                    resolve();
                } else {
                    reject(new Error("Failed to generate Prisma Client."));
                }
            });
        }
    });
}

// Função para iniciar o servidor e exibir o link de acesso
function runDev(directory, label) {
    console.log(`\n\n============================`);
    console.log(`Servidor do ${label} está iniciando, por favor aguarde...`);
    console.log(`============================\n`);

    const start = exec(`cd ${directory} && npm run dev`);
    start.stdout.on('data', (data) => {
        console.log(`${label}: ${data}`);

        // Detectar a porta do front-end e exibir o link
        if (label === 'front' && data.includes('Local:')) {
            const match = data.match(/http:\/\/localhost:(\d+)/);
            if (match && match[1]) {
                const detectedPort = match[1];
                console.log(`\n\n============================`);
                console.log(`ACESSE O LINK: http://localhost:${detectedPort}`);
                console.log(`============================\n`);
            }
        }
    });
    start.stderr.on('data', (data) => console.error(`${label} Error: ${data}`));
    start.on('close', (code) => console.log(`${label} process exited with code ${code}`));
}

// Iniciar o frontend e o backend
startServer('front', 'front');
startServer('back', 'back');
