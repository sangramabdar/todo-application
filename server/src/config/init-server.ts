import Express from "express";
import cors from "cors";
import initRoutes from "./init-routes";

import MongoDatabase from "./db";
import { requestLogger } from "../common/helper/logger";
import path from "path";

const PORT = 8080;

const app = Express();

async function initServer() {
  app.use(cors({ origin: true, credentials: true }));
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  app.use(requestLogger);
  await MongoDatabase.connectToDatabase();
  await initRoutes();
  app.listen(PORT, () => {
    console.log("server is started ");
  });
}

export { initServer, app };
