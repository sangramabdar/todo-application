"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskById = exports.saveTask = exports.deleteTask = exports.getTaskById = exports.getAllTasks = void 0;
const db_1 = __importDefault(require("../../config/db"));
const mongodb_1 = require("mongodb");
async function getAllTasks(userId) {
    let db = await db_1.default.getDb();
    let tasks = await db
        .collection("tasks")
        .find({
        createdById: userId,
    })
        .toArray();
    if (!tasks)
        return null;
    return tasks;
}
exports.getAllTasks = getAllTasks;
async function getTaskById(id) {
    let db = await db_1.default.getDb();
    const _id = new mongodb_1.ObjectId(id);
    const findObject = { _id };
    const task = await db.collection("tasks").findOne(findObject);
    if (!task)
        return null;
    return task;
}
exports.getTaskById = getTaskById;
async function saveTask(task) {
    let db = await db_1.default.getDb();
    let insertResult = await db.collection("tasks").insertOne(task);
    return insertResult;
}
exports.saveTask = saveTask;
async function updateTaskById(id, task, userId) {
    let db = await db_1.default.getDb();
    let _id = new mongodb_1.ObjectId(id);
    let updateObject = { _id, createdById: userId };
    let updateResult = await db.collection("tasks").updateOne(updateObject, {
        $set: task,
    });
    if (updateResult.matchedCount === 0)
        return null;
    return "updated";
}
exports.updateTaskById = updateTaskById;
async function deleteTask(id, userId) {
    let db = await db_1.default.getDb();
    let _id = new mongodb_1.ObjectId(id);
    let deleteObject = { _id, createdById: userId };
    let deleteResult = await db.collection("tasks").deleteOne(deleteObject);
    if (deleteResult.deletedCount === 0)
        return null;
    return "deleted";
}
exports.deleteTask = deleteTask;
