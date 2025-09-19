console.log('Starting server...');
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});
server.listen(3060, () => {
  console.log('Server running on port 3060');
});
