"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginDto = exports.validateSignUpDto = void 0;
const schema_1 = require("../../common/schema-validation/schema");
const utils_1 = require("../../common/helper/utils");
const exceptions_1 = require("../../common/helper/exceptions");
const signUpDto = (0, schema_1.buildSchema)({
    name: (0, schema_1.string)().min(5).max(20).onlyAlphabets(),
    email: (0, schema_1.string)().email(),
    password: (0, schema_1.string)().min(8).max(20),
    confirmPassword: (0, schema_1.string)().min(8).max(20),
});
const loginDto = (0, schema_1.buildSchema)({
    email: (0, schema_1.string)().email(),
    password: (0, schema_1.string)().min(8).max(20),
});
async function validateLoginDto(req, res, next) {
    try {
        req.body = (0, utils_1.trimAllStrings)(req.body);
        req.body = await (0, schema_1.validateSchema)(loginDto, req.body, "complete");
        next();
    }
    catch (error) {
        error = new exceptions_1.BadRequest(error.message);
        next(error);
    }
}
exports.validateLoginDto = validateLoginDto;
async function validateSignUpDto(req, res, next) {
    try {
        req.body = (0, utils_1.trimAllStrings)(req.body);
        req.body = await (0, schema_1.validateSchema)(signUpDto, req.body, "complete");
        if (req.body["password"] !== req.body["confirmPassword"]) {
            let error = new exceptions_1.BadRequest("password and confirmPassword must be same");
            next(error);
            return;
        }
        delete req.body.confirmPassword;
        next();
    }
    catch (error) {
        error = new exceptions_1.BadRequest(error.message);
        next(error);
    }
}
exports.validateSignUpDto = validateSignUpDto;
