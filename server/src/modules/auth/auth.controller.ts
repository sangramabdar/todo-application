import { Response, Request } from "express";

import ResponseBodyBuilder from "../../common/helper/response-body-builder";
import { generateAccessToken } from "../../common/helper/validation";

import { loginService, signUpService } from "./auth.service";

class AuthController {
  static async login(req: Request, res: Response, next) {
    try {
      const user = await loginService(req);

      const accessToken = await generateAccessToken(user, "24h");

      const responseBody = new ResponseBodyBuilder()
        .setStatusCode(200)
        .setData({ accessToken, _id: user._id });

      return res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async signup(req: Request, res: Response, next) {
    try {
      const result = await signUpService(req);

      const responseBody = new ResponseBodyBuilder()
        .setStatusCode(201)
        .setData(result);

      return res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
