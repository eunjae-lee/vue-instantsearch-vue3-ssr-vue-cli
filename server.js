const fs = require("fs");
const path = require("path");
const express = require("express");
const manifest = require("./dist/server/ssr-manifest.json");

const server = express();

const appPath = path.join(__dirname, "./dist/server", manifest["app.js"]);
const render = require(appPath).render;
const indexTemplate = fs.readFileSync(
  path.join(__dirname, "./dist/client", "index.html"),
  "utf-8"
);

server.use(
  "/img",
  express.static(path.join(__dirname, "./dist/client", "img"))
);
server.use("/js", express.static(path.join(__dirname, "./dist/client", "js")));
server.use(
  "/css",
  express.static(path.join(__dirname, "./dist/client", "css"))
);
server.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "./dist/client", "favicon.ico"))
);

server.get("*", async (req, res) => {
  const { html } = await render();

  const finalHtml = indexTemplate
    .toString()
    .replace('<div id="app">', `<div id="app">${html}`);
  res.setHeader("Content-Type", "text/html");
  res.end(finalHtml);
});

console.log(`
  You can navigate to http://localhost:8080
`);

server.listen(8080);
