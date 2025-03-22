import HTTP_SERVER from "http-status-codes";
import { Request, Response } from "express";

export class SignOut {
  public async update(req: Request, res: Response): Promise<void> {
    req.session = null;
    res.status(HTTP_SERVER.OK).json({ message: "Logout Successful", user: {}, token: "" });
  }
}
