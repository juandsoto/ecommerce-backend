import { Request, Response } from "express";
import { Category } from "../schema/Category.schema";
import { badRequest } from "../../../utils/errors/badRequest";
import { ICategory } from "../interfaces/category.interface";
import { NotFoundException } from "../../../utils/errors/NotFoundException";

export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    const categories = await Category.find<ICategory[]>();
    return res.json(categories);
  } catch (error: any) {
    return res.json({
      error: error.name,
      message: error.message,
    });
  }
}

export async function findOneById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  try {
    const categoryDB = await Category.findById<ICategory>(id);
    if (!categoryDB) {
      throw new NotFoundException("category not found");
    }
    return res.json(categoryDB);
  } catch (error: any) {
    return res.json({
      error: error.name,
      message: error.message,
    });
  }
}

export async function createOne(req: Request, res: Response): Promise<Response> {
  try {
    const categoryDB = await Category.create<ICategory>(req.body);
    return res.status(201).json(categoryDB);
  } catch (error: any) {
    return badRequest(res, error);
  }
}

export async function updateOneById(req: Request, res: Response): Promise<Response> {
  const category: ICategory = req.body;
  const { id } = req.params;
  try {
    const categoryDB = await Category.findByIdAndUpdate<ICategory>(id, category, {
      new: true,
      runValidators: true,
    });
    if (!categoryDB) {
      throw new NotFoundException("category not found");
    }
    return res.json(categoryDB);
  } catch (error: any) {
    badRequest(res, error);
  }
}

export async function deleteOneById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  try {
    const categoryDB = await Category.findByIdAndDelete<ICategory>(id);
    if (!categoryDB) {
      throw new NotFoundException("category not found");
    }
    return res.json(categoryDB);
  } catch (error: any) {
    badRequest(res, error);
  }
}
