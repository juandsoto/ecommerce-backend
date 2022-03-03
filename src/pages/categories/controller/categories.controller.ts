import { Request, Response } from "express";
import { Category } from "../schema/Category.schema";
import { badRequest } from "../../../utils/errors/badRequest";
import { ICategory } from "../interfaces/category.interface";
export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error: any) {
    return res.json({
      error: error.name,
      message: error.message,
    });
  }
}

export async function createOne(req: Request, res: Response): Promise<Response> {
  try {
    const category = await Category.create<ICategory>(req.body);
    return res.status(201).json(category);
  } catch (error: any) {
    return badRequest(res, error);
  }
}
