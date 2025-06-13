const http = require('http');
const app = require('./app');

const normalizePort = val => {
    const port = parseInt(val, 10);
    if(isNaN(port)) return val; // retourne le port tel quel s'il n'est pas un nombre
    if(port >= 0) return port; // retourne le port s'il est un nombre positif
    return false;
}

const server = http.createServer(app);

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

server.on('error', error => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' nécessite des privilèges élevés.');
      process.exit(1);
        case 'EADDRINUSE':
      console.error(bind + ' est déjà utilisé.');
      process.exit(1);
    default:
        throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Serveur en écoute sur ' + bind);
});

server.listen(port);