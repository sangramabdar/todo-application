import { Router } from "express";
import { validateTaskDto } from "./task.dto";

import { validateId, validateToken } from "../../common/helper/validation";

import TaskController from "./task.controller";

const taskRouter = Router();

taskRouter.use("/", validateToken);
taskRouter.use("/:id", validateId);

taskRouter.get("/:id", TaskController.getTask);
taskRouter.get("", TaskController.getAllTasks);
taskRouter.post("/", validateTaskDto, TaskController.saveTask);
taskRouter.put("/:id", validateTaskDto, TaskController.updateTask);
taskRouter.delete("/:id", TaskController.deleteTask);

export default taskRouter;
