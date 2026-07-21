// Custom entry point for SiteGround's Node.js App hosting (Phusion Passenger).
// Passenger expects a plain startup script it can require/run directly —
// `next start` works fine standalone, but this wrapper is the safer target
// for their "Application Startup File" field and honors the PORT they assign.
const { createServer } = require("node:http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Tall Automotive site listening on port ${port}`);
  });
});
