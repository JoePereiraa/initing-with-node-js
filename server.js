const http = require('http');
const port = 4001

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });

    if(request.url === "/produto"){
        response.end(
            JSON.stringify({
                message: 'Rota de produto'
            })
        );
    }
    if(request.url === "/usuario"){
        response.end(
            JSON.stringify({
                message: 'Rota de usuario'
            })
        );
    }

    response.end(
        JSON.stringify({
            message: 'Qualquer outra rota'
        })
    );
}).listen(port, () => console.log(`Servidor esta rodando na porta ${port}`));