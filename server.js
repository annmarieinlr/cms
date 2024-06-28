const http = require('http');
const app = require('./routes/app');
const debug = require('debug')('node-angular');

//this makes sure the port is a valid number
const narmalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

//this handles errors
const onError = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;

    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default: 
            throw error;
    }
};

//this logs the port the server is listening on
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    console.log('Listening on ' + bind);
};

//this sets the port
const port = process.env.PORT || 3000;
app.set('port', port);

//this creates the server
const server = http.createServer(app);
//Tells if something went wrong
server.on('error', onError);
//Tells if the server is listening
server.on('listening', onListening);
// starts the server
server.listen(port);

