import { Response } from "express";

export function badRequest(res: Response, error: any) {
  if (error.name === "ValidationError") {
    let errors: Record<string, string> = {};

    Object.keys(error.errors).forEach(key => {
      errors[key] = error.errors[key].message;
    });

    return res.status(400).json({ error: errors });
  }

  if (error.name === "MongoServerError") {
    let errors: Record<string, string> = {};

    Object.keys(error.keyValue).forEach(key => {
      errors[key] = `${error.keyValue[key]} is already registered`;
    });

    return res.status(400).json({ error: errors });
  }
  if (error.name === "Forbidden payload") {
    return res.status(403).json({ error: error.errors });
  }
  return res.status(400).json({
    error: error.message,
  });
}
