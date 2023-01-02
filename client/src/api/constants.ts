enum Status {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface Result {
  data?: any;
  status?: Status;
  error?: string;
  statusCode?: number;
}

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

// const BASE_URL = "https://todo-application-server.vercel.app/api";

const BASE_URL = "http://localhost:8080/api";

export { Status, BASE_URL, DEFAULT_HEADERS };
export type { Result };
