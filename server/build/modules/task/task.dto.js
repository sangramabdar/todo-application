"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDto = exports.validateTaskDto = void 0;
const exceptions_1 = require("../../common/helper/exceptions");
const utils_1 = require("../../common/helper/utils");
const schema_1 = require("../../common/schema-validation/schema");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["complete"] = "COMPLETE";
    TaskStatus["incomplete"] = "INCOMPLETE";
})(TaskStatus || (TaskStatus = {}));
const TaskDto = (0, schema_1.buildSchema)({
    title: (0, schema_1.string)(),
    description: (0, schema_1.string)(),
    // status: string(),
});
exports.TaskDto = TaskDto;
async function validateTaskDto(request, response, next) {
    try {
        request.body = (0, utils_1.trimAllStrings)(request.body);
        request.body = await (0, schema_1.validateSchema)(TaskDto, request.body, "complete");
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
    }
    catch (error) {
        error = new exceptions_1.BadRequest(error.message);
        next(error);
    }
}
exports.validateTaskDto = validateTaskDto;
