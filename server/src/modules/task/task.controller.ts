import { Request, Response } from "express";
import ResponseBodyBuilder from "../../common/helper/response-body-builder";
import {
  deleteTaskService,
  getTaskService,
  getTasksService,
  saveTaskService,
  updateTaskService,
} from "./task.service";

class TaskController {
  static async getTask(request: Request, response: Response, next: any) {
    try {
      const result = await getTaskService(request);
      const responseBody = new ResponseBodyBuilder().setData(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async getAllTasks(request: Request, response: Response, next: any) {
    try {
      const result = await getTasksService(request);
      let responseBody = new ResponseBodyBuilder().setData(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async saveTask(request: Request, response: Response, next: any) {
    try {
      const result = await saveTaskService(request);
      let responseBody = new ResponseBodyBuilder()
        .setStatusCode(201)
        .setData(result);
      return response.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(request: Request, response: Response, next: any) {
    try {
      const result = await updateTaskService(request);
      const responseBody = new ResponseBodyBuilder().setData(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(request: Request, response: Response, next: any) {
    try {
      const result = await deleteTaskService(request);
      const responseBody = new ResponseBodyBuilder().setData(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}

export default TaskController;
