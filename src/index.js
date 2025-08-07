const app = require('./app');
const server = require('./server');
const PORT = process.env.PORT || 3000;

server.start(app, PORT);