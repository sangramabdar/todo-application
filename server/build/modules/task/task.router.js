"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_dto_1 = require("./task.dto");
const validation_1 = require("../../common/helper/validation");
const task_controller_1 = __importDefault(require("./task.controller"));
const taskRouter = (0, express_1.Router)();
taskRouter.use("/", validation_1.validateToken);
taskRouter.use("/:id", validation_1.validateId);
taskRouter.get("/:id", task_controller_1.default.getTask);
taskRouter.get("", task_controller_1.default.getAllTasks);
taskRouter.post("/", task_dto_1.validateTaskDto, task_controller_1.default.saveTask);
taskRouter.put("/:id", task_dto_1.validateTaskDto, task_controller_1.default.updateTask);
taskRouter.delete("/:id", task_controller_1.default.deleteTask);
exports.default = taskRouter;
