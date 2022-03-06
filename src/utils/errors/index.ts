import { Response } from "express";

export function errorHandler(res: Response, error: any) {
  let errors: Record<string, string> = {};
  switch (error.name) {
    case "ValidationError":
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ error: errors });

    case "MongoServerError":
      Object.keys(error.keyValue).forEach(key => {
        errors[key] = `${error.keyValue[key]} is already registered`;
      });
      return res.status(400).json({ error: errors });

    case "Forbidden payload":
      return res.status(403).json({ error: error.errors });

    default:
      return res.status(400).json({
        error: error.message,
      });
  }
}
