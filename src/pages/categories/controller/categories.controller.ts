import { Request, Response } from "express";
import { Category } from "../schema/Category.schema";
import { errorHandler } from "../../../utils/errors";
import { ICategory } from "../interfaces/category.interface";
import { NotFoundException } from "../../../utils/errors/NotFoundException";

interface Query {
  skip: string;
  limit: string;
  sort: string;
}

export async function findAll(req: Request, res: Response): Promise<Response> {
  const { skip = "0", limit = "3", sort = "createdAt,asc" }: Partial<Query> = req.query;
  const [field, order] = sort.split(",");
  try {
    const categories = await Category.find<ICategory[]>()
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ [field]: order });
    return res.json(categories);
  } catch (error: any) {
    return errorHandler(res, error);
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
    return errorHandler(res, error);
  }
}

export async function createOne(req: Request, res: Response): Promise<Response> {
  try {
    const categoryDB = await Category.create<ICategory>(req.body);
    return res.status(201).json(categoryDB);
  } catch (error: any) {
    return errorHandler(res, error);
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
    return errorHandler(res, error);
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
    return errorHandler(res, error);
  }
}
