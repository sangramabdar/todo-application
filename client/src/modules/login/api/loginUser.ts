import { BASE_URL } from "../../../api/constants";
import { postRequest } from "../../../api/requests";

interface LoginInfo {
  email: string;
  password: string;
}

const LOGIN_URL = BASE_URL + "/auth/login";

async function loginUser(loginInfo: LoginInfo | null) {
  const result = await postRequest(LOGIN_URL, loginInfo, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  });
  return result;
}

export { loginUser };
export type { LoginInfo };
