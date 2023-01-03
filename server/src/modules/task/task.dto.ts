import { Request, Response } from "express";
import { BadRequest } from "../../common/helper/exceptions";
import { trimAllStrings } from "../../common/helper/utils";
import {
  buildSchema,
  string,
  validateSchema,
} from "../../common/schema-validation/schema";

enum TaskStatus {
  complete = "COMPLETE",
  incomplete = "INCOMPLETE",
}

interface TaskDto {
  title: string;
  description: string;
  // status: TaskStatus;
}

const TaskDto = buildSchema<TaskDto>({
  title: string(),
  description: string(),
  // status: string(),
});

async function validateTaskDto(request: Request, response: Response, next) {
  try {
    request.body = trimAllStrings(request.body);
    request.body = await validateSchema(TaskDto, request.body, "complete");

    // if (
    //   !(
    //     request.body.status === TaskStatus.complete ||
    //     request.body.status === TaskStatus.incomplete
    //   )
    // ) {
    //   next(new BadRequest("status must be complete or incomplete"));
    //   return;
    // }
    next();
  } catch (error) {
    error = new BadRequest(error.message);
    next(error);
  }
}

export { validateTaskDto, TaskDto };
