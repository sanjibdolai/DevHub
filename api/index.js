import jsonServer from "json-server";
import path from "path";
import middleware from "../middleware.cjs";

const server = jsonServer.create();

const middlewares = jsonServer.defaults();
// --- START: IN-MEMORY DATA SETUP ---
// 1. Define the path to your db.json file
const dbFilePath = path.join(process.cwd(), "db.json");

// 2. Read the file's content as a string
const dbFileContent = fs.readFileSync(dbFilePath, "utf-8");

// 3. Parse the string content into a JavaScript object
const data = JSON.parse(dbFileContent);

// 4. Pass the in-memory JavaScript object to the router.
//    THIS IS THE KEY CHANGE. We are not passing the file path anymore.
const router = jsonServer.router(data);
// --- END: IN-MEMORY DATA SETUP ---

server.use(middlewares);
server.use(middleware);
server.use(router);
server.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

// Handle API requests
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

export default server;
