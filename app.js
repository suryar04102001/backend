const http = require('http');

const {requestHandler,sy} = require('./routes'); // Import the request handler

const server = http.createServer(requestHandler);

server.listen(3000, () => {
  console.log('Server is listening on port 3000');

});
