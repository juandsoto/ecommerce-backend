import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../pages/users/schema/User.schema";

export async function checkJWT(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: "AuthenticationError",
      message: "Send the token",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "AuthenticationError",
      message: "Send the token",
    });
  }
  try {
    const { id } = verify(token, process.env.JWT_SECRET_KEY) as { id: string };
    const userDB = await User.findById(id);
    if (!userDB) {
      return res.status(401).json({
        error: "AuthenticationError",
        message: "invalid token - user not found",
      });
    }
    const { password, ...user } = userDB._doc;
    user._id = user._id.toString();
    req.user = user;
    return next();
  } catch (error: any) {
    console.log({ error });
    return next(error);
  }
}
