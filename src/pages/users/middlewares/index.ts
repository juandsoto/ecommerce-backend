import { NextFunction, Request, Response } from "express";
import { badRequest } from "../../../utils/errors/badRequest";

export function validateForbidden(req: Request, res: Response, next: NextFunction) {
  const { email, is_admin } = req.body;
  let errors: Record<string, string> = {};
  switch (req.method) {
    case "POST":
      if (is_admin) errors["is_admin"] = "is_admin can not be assigned to a value";
      break;
    case "PATCH":
      if (is_admin) errors["is_admin"] = "is_admin can not be assigned to a value";
      if (email) errors["email"] = "email can not be changed";
      break;
  }

  if (Object.keys(errors).length !== 0) {
    badRequest(res, {
      name: "Forbidden payload",
      errors,
    });
    return;
  }

  next();
}
