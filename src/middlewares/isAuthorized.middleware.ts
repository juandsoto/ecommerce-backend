import { NextFunction, Request, Response } from "express";
import { IUser } from "../pages/users/interfaces/user.interface";
import { errorHandler } from "../utils/errors/index";
import { checkJWT } from "./checkJWT.middleware";

export async function isAuthorized(req: Request, res: Response, next: NextFunction) {
  return await checkJWT(req, res, () => {
    const user: Partial<IUser> = req.user;
    if (user.is_admin) return next();
    if (user._id !== req.params.id) {
      return errorHandler(res, {
        error: "AuthorizationError",
        message: "Not authorized",
      });
    }
    next();
  });
}
