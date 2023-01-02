"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_dto_1 = require("./auth.dto");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", auth_dto_1.validateSignUpDto, auth_controller_1.default.signup);
authRouter.post("/login", auth_dto_1.validateLoginDto, auth_controller_1.default.login);
exports.default = authRouter;
