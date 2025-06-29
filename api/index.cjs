// api/index.cjs

// Use require() because this is a .cjs file (CommonJS)
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), 'db.json'));
const defaultMiddlewares = jsonServer.defaults();

// 1. The Rewriter MUST come first.
// This changes /api/path -> /path
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

// 2. Default middlewares (logger, static, cors, etc.)
server.use(defaultMiddlewares);

// 3. Your custom middleware to expose the X-Total-Count header.
// This is crucial for pagination libraries to work.
server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

// 4. The router must come last to handle the rewritten request.
server.use(router);

// Use module.exports for CommonJS
module.exports = server;