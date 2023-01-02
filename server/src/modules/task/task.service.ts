import { Request } from "express";
import { NotFound, Unauthorized } from "../../common/helper/exceptions";
import {
  deleteTask,
  getAllTasks,
  getTaskById,
  saveTask,
  updateTaskById,
} from "./task.repository";

async function getTasksService(req: Request) {
  let userId = (req as any).user._id;

  let tasks = await getAllTasks(userId);

  if (!tasks) throw new NotFound("tasks");
  return tasks;
}

async function getTaskService(req: Request) {
  let id = req.params["id"];
  let task = await getTaskById(id);

  if (!task) throw new NotFound("emlpoyee");

  return task;
}

async function saveTaskService(req: Request) {
  let task = req.body;
  let user = (req as any).user;

  task.createdById = user._id;

  let result = await saveTask(task);
  let savedTask = await getTaskById(result.insertedId.toString());

  return savedTask;
}

async function updateTaskService(req: Request) {
  let task = req.body;
  let id = req.params["id"];
  let userId = (req as any).user._id;

  let taskExists = await checkTaskExistsOrNot(req);

  if (!taskExists) throw new NotFound("task");

  let result = await updateTaskById(id, task, userId);

  if (!result) throw new Unauthorized();

  return result;
}

async function deleteTaskService(req: Request) {
  let id = req.params["id"];
  let userId = (req as any).user._id;

  let taskExists = await checkTaskExistsOrNot(req);

  if (!taskExists) throw new NotFound("task");

  let result = await deleteTask(id, userId);

  if (!result) throw new Unauthorized();

  return result;
}

async function checkTaskExistsOrNot(req: Request) {
  let id = req.params["id"];
  let task = await getTaskById(id);

  return task ? true : false;
}

export {
  deleteTaskService,
  saveTaskService,
  getTaskService,
  getTasksService,
  updateTaskService,
};
