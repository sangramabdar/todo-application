import { app } from "./init-server";
import {
  handleClientError,
  handleError,
  invalidPathHandler,
} from "../common/helper/error-middleware";
import RootRouter from "../modules/root/root.router";
import authRouter from "../modules/auth/auth.router";
import taskRouter from "../modules/task/task.router";
import { errorLogger } from "../common/helper/logger";

async function initRoutes() {
  //routers to handle different routes
  app.use("/", RootRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/tasks", taskRouter);
  app.use("*", (req, res) => {
    res.redirect("/");
  });

  //global error handling middleware
  app.use(errorLogger);
  app.use(handleClientError);
  app.use(handleError);
}

export default initRoutes;
