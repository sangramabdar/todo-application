"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskService = exports.getTasksService = exports.getTaskService = exports.saveTaskService = exports.deleteTaskService = void 0;
const exceptions_1 = require("../../common/helper/exceptions");
const task_repository_1 = require("./task.repository");
async function getTasksService(req) {
    let userId = req.user._id;
    let tasks = await (0, task_repository_1.getAllTasks)(userId);
    if (!tasks)
        throw new exceptions_1.NotFound("tasks");
    return tasks;
}
exports.getTasksService = getTasksService;
async function getTaskService(req) {
    let id = req.params["id"];
    let task = await (0, task_repository_1.getTaskById)(id);
    if (!task)
        throw new exceptions_1.NotFound("emlpoyee");
    return task;
}
exports.getTaskService = getTaskService;
async function saveTaskService(req) {
    let task = req.body;
    let user = req.user;
    task.createdById = user._id;
    let result = await (0, task_repository_1.saveTask)(task);
    let savedTask = await (0, task_repository_1.getTaskById)(result.insertedId.toString());
    return savedTask;
}
exports.saveTaskService = saveTaskService;
async function updateTaskService(req) {
    let task = req.body;
    let id = req.params["id"];
    let userId = req.user._id;
    let taskExists = await checkTaskExistsOrNot(req);
    if (!taskExists)
        throw new exceptions_1.NotFound("task");
    let result = await (0, task_repository_1.updateTaskById)(id, task, userId);
    if (!result)
        throw new exceptions_1.Unauthorized();
    return result;
}
exports.updateTaskService = updateTaskService;
async function deleteTaskService(req) {
    let id = req.params["id"];
    let userId = req.user._id;
    let taskExists = await checkTaskExistsOrNot(req);
    if (!taskExists)
        throw new exceptions_1.NotFound("task");
    let result = await (0, task_repository_1.deleteTask)(id, userId);
    if (!result)
        throw new exceptions_1.Unauthorized();
    return result;
}
exports.deleteTaskService = deleteTaskService;
async function checkTaskExistsOrNot(req) {
    let id = req.params["id"];
    let task = await (0, task_repository_1.getTaskById)(id);
    return task ? true : false;
}
