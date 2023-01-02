"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.saveUser = void 0;
const db_1 = __importDefault(require("../../config/db"));
async function saveUser(user) {
    const db = await db_1.default.getDb();
    let insertResult = await db.collection("users").insertOne(user);
    return insertResult;
}
exports.saveUser = saveUser;
async function getUserByEmail(email) {
    const db = await db_1.default.getDb();
    const user = await db.collection("users").findOne({
        email,
    }, {
        projection: {
            email: 1,
            password: 1,
        },
    });
    if (!user)
        return null;
    return user;
}
exports.getUserByEmail = getUserByEmail;
