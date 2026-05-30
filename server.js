const http = require('http');
const fs   = require('fs');
const path = require('path');
const ROOT = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
};
const PORT = 5502;
http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const fp  = path.join(ROOT, url === '/' ? 'index.html' : url);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('404: ' + url); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Evinra Mobile Scan → http://localhost:${PORT}`));
