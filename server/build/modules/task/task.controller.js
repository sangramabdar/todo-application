"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_body_builder_1 = __importDefault(require("../../common/helper/response-body-builder"));
const task_service_1 = require("./task.service");
class TaskController {
    static async getTask(request, response, next) {
        try {
            const result = await (0, task_service_1.getTaskService)(request);
            const responseBody = new response_body_builder_1.default().setData(result);
            return response.json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllTasks(request, response, next) {
        try {
            const result = await (0, task_service_1.getTasksService)(request);
            let responseBody = new response_body_builder_1.default().setData(result);
            return response.json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async saveTask(request, response, next) {
        try {
            const result = await (0, task_service_1.saveTaskService)(request);
            let responseBody = new response_body_builder_1.default()
                .setStatusCode(201)
                .setData(result);
            return response.status(201).json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateTask(request, response, next) {
        try {
            const result = await (0, task_service_1.updateTaskService)(request);
            const responseBody = new response_body_builder_1.default().setData(result);
            return response.json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteTask(request, response, next) {
        try {
            const result = await (0, task_service_1.deleteTaskService)(request);
            const responseBody = new response_body_builder_1.default().setData(result);
            return response.json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = TaskController;
