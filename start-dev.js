import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para criar o arquivo .env com a variável DATABASE_URL
function createEnvFile(directory) {
    const envPath = path.join(directory, '.env');
    if (!fs.existsSync(envPath)) {
        // Define a URL do banco de dados no formato necessário
        const envContent = `DATABASE_URL="mysql://root:root@localhost:3306/usuario"`;
        
        fs.writeFileSync(envPath, envContent);
        console.log(`.env file created at ${envPath} with DATABASE_URL`);
    }
}

// Função para testar a conexão com o banco de dados
async function testDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log("Database connection successful!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Encerra o processo caso a conexão falhe
    } finally {
        await prisma.$disconnect();
    }
}

// Função para instalar dependências, configurar o Prisma e iniciar o servidor
function startServer(directory, label) {
    console.log(`Starting ${label} installation, Prisma setup, and server...`);

    // Verifica se precisa criar o .env
    if (label === 'Back') {
        createEnvFile(directory);
    }

    // Primeiro, executa `npm install`
    const install = exec(`cd ${directory} && npm install`);
    install.stdout.on('data', (data) => console.log(`${label} Install: ${data}`));
    install.stderr.on('data', (data) => console.error(`${label} Install Error: ${data}`));

    // Quando `npm install` termina, roda os comandos do Prisma e inicia `npm run dev`
    install.on('close', async (code) => {
        if (code === 0) { // Se `npm install` for bem-sucedido
            
            // Testa a conexão com o banco de dados antes de prosseguir
            if (label === 'Back') {
                await testDatabaseConnection();
            }

            // Configura o Prisma
            const prisma = exec(`cd ${directory} && npx prisma generate && npx prisma migrate deploy`);
            prisma.stdout.on('data', (data) => console.log(`${label} Prisma: ${data}`));
            prisma.stderr.on('data', (data) => console.error(`${label} Prisma Error: ${data}`));

            // Quando a configuração do Prisma termina, inicia `npm run dev`
            prisma.on('close', (code) => {
                if (code === 0) {
                    const start = exec(`cd ${directory} && npm run dev`);
                    start.stdout.on('data', (data) => console.log(`${label}: ${data}`));
                    start.stderr.on('data', (data) => console.error(`${label} Error: ${data}`));
                    start.on('close', (code) => console.log(`${label} process exited with code ${code}`));
                    start.on('error', (err) => console.error(`${label} Server Start Error: ${err.message}`));
                } else {
                    console.error(`${label} Prisma setup failed with code ${code}`);
                }
            });
        } else {
            console.error(`${label} Install failed with code ${code}`);
        }
    });
}

// Iniciar o frontend e o backend
startServer('front', 'Front');
startServer('Back', 'Back');
