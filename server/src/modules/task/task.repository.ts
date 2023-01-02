import Database from "../../config/db";

import { ObjectId } from "mongodb";
import { TaskDto } from "./task.dto";

async function getAllTasks(userId: string) {
  let db = await Database.getDb();

  let tasks = await db
    .collection("tasks")
    .find({
      createdById: userId,
    })
    .toArray();

  if (!tasks) return null;

  return tasks;
}

async function getTaskById(id: string) {
  let db = await Database.getDb();
  const _id = new ObjectId(id);

  const findObject = { _id };

  const task = await db.collection("tasks").findOne(findObject);

  if (!task) return null;
  return task;
}

async function saveTask(task: TaskDto) {
  let db = await Database.getDb();

  let insertResult = await db.collection("tasks").insertOne(task);

  return insertResult;
}

async function updateTaskById(id: string, task: TaskDto, userId: string) {
  let db = await Database.getDb();
  let _id = new ObjectId(id);

  let updateObject = { _id, createdById: userId };
  let updateResult = await db.collection("tasks").updateOne(updateObject, {
    $set: task,
  });

  if (updateResult.matchedCount === 0) return null;
  return "updated";
}
async function deleteTask(id: string, userId: string) {
  let db = await Database.getDb();
  let _id = new ObjectId(id);

  let deleteObject = { _id, createdById: userId };
  let deleteResult = await db.collection("tasks").deleteOne(deleteObject);

  if (deleteResult.deletedCount === 0) return null;

  return "deleted";
}

export { getAllTasks, getTaskById, deleteTask, saveTask, updateTaskById };
