import { Request, Response } from "express";
import { BadRequest } from "../../common/helper/exceptions";
import { trimAllStrings } from "../../common/helper/utils";
import {
  buildSchema,
  number,
  string,
  validateSchema,
} from "../../common/schema-validation/schema";

interface TaskDto {
  title: string;
  description: string;
}

const TaskDto = buildSchema<TaskDto>({
  title: string(),
  description: string(),
});

async function validateTaskDto(request: Request, response: Response, next) {
  try {
    request.body = trimAllStrings(request.body);
    request.body = await validateSchema(TaskDto, request.body, "complete");
    next();
  } catch (error) {
    error = new BadRequest(error.message);
    next(error);
  }
}

export { validateTaskDto, TaskDto };
