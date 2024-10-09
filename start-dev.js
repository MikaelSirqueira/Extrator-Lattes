import { exec } from 'child_process';

// Função para instalar dependências e iniciar o servidor em uma pasta específica
function startServer(directory, label) {
    console.log(`Starting ${label} installation and server...`);
    
    // Primeiro, executa `npm install`
    const install = exec(`cd ${directory} && npm install`);
    install.stdout.on('data', (data) => console.log(`${label} Install: ${data}`));
    install.stderr.on('data', (data) => console.error(`${label} Install Error: ${data}`));
    
    // Quando `npm install` termina, inicia `npm run dev`
    install.on('close', (code) => {
        if (code === 0) { // Se `npm install` for bem-sucedido
            const start = exec(`cd ${directory} && npm run dev`);
            start.stdout.on('data', (data) => console.log(`${label}: ${data}`));
            start.stderr.on('data', (data) => console.error(`${label} Error: ${data}`));
            start.on('close', (code) => console.log(`${label} process exited with code ${code}`));
            start.on('error', (err) => console.error(`${label} Server Start Error: ${err.message}`));
        } else {
            console.error(`${label} Install failed with code ${code}`);
        }
    });
}

// Iniciar o frontend e o backend
startServer('front', 'Front');
startServer('back', 'Back');
