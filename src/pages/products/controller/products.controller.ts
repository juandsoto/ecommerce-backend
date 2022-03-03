import { Request, Response } from "express";
import Product from "../schema/Product.schema";
import { IProduct } from "../interfaces/product.interface";
import { badRequest } from "../../../utils/errors/badRequest";
import { NotFoundException } from "../../../utils/errors/NotFoundException";
export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    const products = await Product.find();
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
    const product = await Product.findById<IProduct>(id)
      .populate("category", "name description thumbnail")
      .exec();
    if (!product) {
      throw new NotFoundException("product not found");
    }
    return res.json(product);
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
    const productDB = await Product.create(req.body);
    return res.status(201).json(productDB);
  } catch (error: any) {
    badRequest(res, error);
  }
}
