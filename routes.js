const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  const body = [];

  if (url === '/' && method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>Hello</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('Before writing to file');
      fs.writeFile('test.txt', parsedBody, (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Server error');
          return;
        }
        console.log('After writing to file');
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>Message received and saved</body>');
        res.write('</html>');
        return res.end();
      });
    });

    return; // Ensure the request handler ends here to prevent further execution
  }
};

module.exports = {requestHandler:requestHandler,

  sy:'hello'
};
