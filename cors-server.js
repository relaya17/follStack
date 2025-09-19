console.log('Starting CORS server...');
const http = require('http');

const server = http.createServer((req, res) => {
  // הוסף CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end('{"status":"success","message":"Server is running with CORS!"}');
});

server.listen(3060, () => {
  console.log('CORS Server running on port 3060');
});
