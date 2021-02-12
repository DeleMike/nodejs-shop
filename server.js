//import http library
const http = require('http');

const app = require('./app');

//create port if it(PORT) is not set use 3000 as default
const port = process.env.PORT || 3000;

//create server
const server = http.createServer(app);

//listen for request
server.listen(port);