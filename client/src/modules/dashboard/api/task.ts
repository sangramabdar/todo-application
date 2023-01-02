import { BASE_URL, DEFAULT_HEADERS } from "../../../api/constants";
import {
  postRequest,
  getRequest,
  deleteRequest,
  putRequest,
} from "../../../api/requests";

interface Task {
  title: string;
  description: string;
}

const TASK_URL = BASE_URL + "/tasks";

async function saveTask(task: Task) {
  const accessToken = localStorage.getItem("token");

  const result = await postRequest(TASK_URL, task, {
    Authorization: "Bearer " + accessToken,
    ...DEFAULT_HEADERS,
  });

  return result;
}

async function getTasks() {
  const accessToken = localStorage.getItem("token");

  const result = await getRequest(TASK_URL, {
    Authorization: "Bearer " + accessToken,
    ...DEFAULT_HEADERS,
  });

  return result;
}

async function deleteTask(id: string) {
  const accessToken = localStorage.getItem("token");

  const result = await deleteRequest(TASK_URL + "/" + id, {
    Authorization: "Bearer " + accessToken,
    ...DEFAULT_HEADERS,
  });

  return result;
}

async function updateTask(id: string, task: any) {
  const accessToken = localStorage.getItem("token");

  const result = await putRequest(TASK_URL + "/" + id, task, {
    Authorization: "Bearer " + accessToken,
    ...DEFAULT_HEADERS,
  });

  return result;
}

export { saveTask, getTasks, deleteTask, updateTask };
export type { Task };
