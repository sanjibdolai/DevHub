import jsonServer from 'json-server';
import path from 'path';
import middleware from '../middleware.cjs';
// Use require for CommonJS middleware

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(middleware);
server.use(router);
// Handle API requests
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));


export default (req, res) => {
    server(req, res);
};
