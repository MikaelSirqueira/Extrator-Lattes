import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Verifica e cria o diretório npm global se não existir
function ensureNpmDirectory() {
    return new Promise((resolve, reject) => {
        const npmPath = path.join(process.env.APPDATA, 'npm');
        if (!fs.existsSync(npmPath)) {
            fs.mkdirSync(npmPath, { recursive: true });
            console.log('Created global npm directory:', npmPath);
        }
        
        exec('npm config set prefix "%APPDATA%\\npm"', (error) => {
            if (error) {
                console.error('Failed to set npm prefix:', error);
                reject(error);
            } else {
                console.log('npm prefix set to:', npmPath);
                resolve();
            }
        });
    });
}

// Função para criar o arquivo .env com a variável DATABASE_URL
function createEnvFile(directory) {
    const envPath = path.join(directory, '.env');
    if (!fs.existsSync(envPath)) {
        const envContent = `DATABASE_URL="mysql://root:root@localhost:3306/usuario"`;
        fs.writeFileSync(envPath, envContent);
        console.log(`.env file created at ${envPath} with DATABASE_URL`);
    }
}

// Função para rodar o `prisma generate` após garantir que o npm esteja configurado
async function generatePrismaClient() {
    await ensureNpmDirectory(); // Certifica-se de que o diretório npm está correto

    return new Promise((resolve, reject) => {
        const generate = exec('cd Back && npx prisma generate');
        generate.stdout.on('data', (data) => console.log(`Prisma Generate: ${data}`));
        generate.stderr.on('data', (data) => console.error(`Prisma Generate Error: ${data}`));
        generate.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error('Failed to generate Prisma Client. Please check your Prisma configuration.'));
            }
        });
    });
}

// Função para testar a conexão com o banco de dados após gerar o Prisma Client
async function testDatabaseConnection() {
    const { PrismaClient } = await import('@prisma/client'); // Importa o PrismaClient apenas depois de gerar
    const prisma = new PrismaClient();
    try {
        await prisma.$connect();
        console.log("Database connection successful!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Função para instalar dependências, configurar o Prisma e iniciar o servidor
async function startServer(directory, label) {
    console.log(`Starting ${label} installation, Prisma setup, and server...`);

    if (label === 'Back') {
        createEnvFile(directory);  // Cria o .env apenas no Back
    }

    const install = exec(`cd ${directory} && npm install`);
    install.stdout.on('data', (data) => console.log(`${label} Install: ${data}`));
    install.stderr.on('data', (data) => console.error(`${label} Install Error: ${data}`));

    install.on('close', async (code) => {
        if (code === 0) {
            if (label === 'Back') {
                try {
                    await generatePrismaClient(); // Gera o Prisma Client primeiro
                    await testDatabaseConnection(); // Testa a conexão depois
                } catch (error) {
                    console.error(error.message);
                    process.exit(1); // Encerra o processo em caso de erro
                }
            }

            const start = exec(`cd ${directory} && npm run dev`);
            start.stdout.on('data', (data) => console.log(`${label}: ${data}`));
            start.stderr.on('data', (data) => console.error(`${label} Error: ${data}`));
            start.on('close', (code) => console.log(`${label} process exited with code ${code}`));
        } else {
            console.error(`${label} Install failed with code ${code}`);
        }
    });
}

// Iniciar o frontend e o backend
startServer('front', 'front');
startServer('Back', 'back');
