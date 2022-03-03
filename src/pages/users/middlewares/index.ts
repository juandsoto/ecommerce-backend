import { genSaltSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";

export function hashPasswordMiddleware(req: Request, res: Response, next: NextFunction) {
  const password = req.body.password;
  if (password) {
    try {
      const salt = genSaltSync();
      req.body.password = hashSync(password, salt);
    } catch (error: any) {
      return res.status(500).json({
        error: error.name,
        message: error.message,
      });
    }
  }
  next();
}
