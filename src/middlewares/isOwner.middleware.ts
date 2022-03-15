import { NextFunction, Request, Response } from "express";
import { IUser } from "../router/users/interfaces/user.interface";
import { errorHandler } from "../utils/errors/index";
import { checkJWT } from "./checkJWT.middleware";

export async function isOwner(req: Request, res: Response, next: NextFunction) {
  return await checkJWT(req, res, () => {
    const user: Partial<IUser> = req.user;
    console.log(user._id, req.params.id);
    if (user.is_admin) return next();
    if (user._id !== req.params.id) {
      return errorHandler(res, {
        name: "ForbiddenError",
        message: "Not allowed to do this",
      });
    }
    req.authInfo = { isOwner: true };
    next();
  });
}
