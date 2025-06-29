import jsonServer from "json-server";
import path from "path";
import middleware from "../middleware.cjs";

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(middleware);
server.use(router);
// Handle API requests
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

export default server;
