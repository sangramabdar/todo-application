"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_body_builder_1 = __importDefault(require("../../common/helper/response-body-builder"));
const validation_1 = require("../../common/helper/validation");
const auth_service_1 = require("./auth.service");
class AuthController {
    static async login(req, res, next) {
        try {
            const user = await (0, auth_service_1.loginService)(req);
            const accessToken = await (0, validation_1.generateAccessToken)(user, "24h");
            const responseBody = new response_body_builder_1.default()
                .setStatusCode(200)
                .setData({ accessToken, _id: user._id });
            return res.status(200).json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async signup(req, res, next) {
        try {
            const result = await (0, auth_service_1.signUpService)(req);
            const responseBody = new response_body_builder_1.default()
                .setStatusCode(201)
                .setData(result);
            return res.status(201).json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
