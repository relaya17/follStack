const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end('{"status":"success","message":"Server is running!"}');
});

server.listen(3060, () => {
  console.log('Server running on port 3060');
});
