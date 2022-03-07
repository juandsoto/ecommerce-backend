import { NextFunction, Request, Response } from "express";
import { IUser } from "../pages/users/interfaces/user.interface";
import { errorHandler } from "../utils/errors/index";
import { checkJWT } from "./checkJWT.middleware";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  return await checkJWT(req, res, () => {
    const user: Partial<IUser> = req.user;

    if (!req.user) {
      return errorHandler(res, {
        error: "AuthenticationError",
        message: "Not authenticated",
      });
    }
    if (!user.is_admin) {
      return errorHandler(res, {
        error: "ForbiddenError",
        message: "Not allowed to do this",
      });
    }
    next();
  });
}
