const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3336;

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Check if file exists
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file not found, serve index.html
      filePath = path.join(__dirname, "public", "index.html");
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("File not found");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else {
      const ext = path.extname(filePath);
      const contentType =
        ext === ".html"
          ? "text/html"
          : ext === ".css"
            ? "text/css"
            : ext === ".js"
              ? "application/javascript"
              : "text/plain";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🌐 Web Client running on http://localhost:${PORT}`);
  console.log(`📱 Open: http://localhost:${PORT}`);
});
