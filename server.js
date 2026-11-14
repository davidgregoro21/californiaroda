// Servidor simples (sem dependências) que entrega o site estático.
// Usado na hospedagem Node.js do Hostinger. Porta vem da variável PORT.
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Só estes arquivos/pastas podem ser servidos (nada de server.js, package.json, .git...)
const PUBLIC = ["index.html", "img", "robots.txt", "sitemap.xml"];

function send(res, status, body, type) {
  res.writeHead(status, { "Content-Type": type || "text/plain; charset=utf-8" });
  res.end(body);
}

http
  .createServer((req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Método não permitido");

    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    } catch {
      return send(res, 400, "Requisição inválida");
    }
    if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

    const file = path.normalize(path.join(ROOT, urlPath));
    const rel = path.relative(ROOT, file);
    const top = rel.split(path.sep)[0];
    if (rel.startsWith("..") || path.isAbsolute(rel) || !PUBLIC.includes(top)) {
      return send(res, 404, "Página não encontrada");
    }

    fs.stat(file, (err, st) => {
      if (err || !st.isFile()) return send(res, 404, "Página não encontrada");
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, {
        "Content-Type": TYPES[ext] || "application/octet-stream",
        "Content-Length": st.size,
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=604800",
      });
      if (req.method === "HEAD") return res.end();
      fs.createReadStream(file).pipe(res);
    });
  })
  .listen(PORT, () => console.log(`California Rodas rodando na porta ${PORT}`));
