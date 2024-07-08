import server from './server.mjs';

const PORT = 5000;

server.get('/', (request, response) => {
  response.send('ola ' + new Date());
});

server.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
