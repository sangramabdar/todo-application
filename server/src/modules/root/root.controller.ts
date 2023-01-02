import { Request, Response } from "express";
import path from "path";

class RootController {
  static async get(req: Request, res: Response) {
    res.send("app");
  }
}

export default RootController;
