import { Request, Response } from "express";
import Product from "../schema/Product.schema";
import { IProduct } from "../interfaces/product.interface";
import { badRequest } from "../../../utils/errors/badRequest";
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
    const products = await Product.find<IProduct[]>()
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ [field]: order });
    return res.json(products);
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
    const productDB = await Product.findById<IProduct>(id)
      .populate("categories", "name description thumbnail")
      .exec();
    if (!productDB) {
      throw new NotFoundException("product not found");
    }
    return res.json(productDB);
  } catch (error: any) {
    return res.json({
      error: error.name,
      message: error.message,
    });
  }
}

export async function createOne(req: Request, res: Response): Promise<Response> {
  const product: IProduct = req.body;
  if (!product.thumbnail) product.thumbnail = product.images[0];
  try {
    const productDB = await Product.create<IProduct>(req.body);
    return res.status(201).json(productDB);
  } catch (error: any) {
    badRequest(res, error);
  }
}

export async function updateOneById(req: Request, res: Response): Promise<Response> {
  const product: IProduct = req.body;
  const { id } = req.params;
  try {
    const productDB = await Product.findByIdAndUpdate<IProduct>(id, product, {
      new: true,
      runValidators: true,
    });
    if (!productDB) {
      throw new NotFoundException("product not found");
    }
    return res.json(productDB);
  } catch (error: any) {
    badRequest(res, error);
  }
}
export async function deleteOneById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  try {
    const productDB = await Product.findByIdAndDelete<IProduct>(id);
    if (!productDB) {
      throw new NotFoundException("product not found");
    }
    return res.json(productDB);
  } catch (error: any) {
    badRequest(res, error);
  }
}
