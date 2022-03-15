import { Request, Response } from "express";
import Order from "../schema/Order.schema";
import { IOrder } from "./../interfaces/order.interface";
import { errorHandler } from "../../../../utils/errors";
import { NotFoundException } from "../../../../utils/errors/NotFoundException";

interface Query {
  skip: string;
  limit: string;
  sort: string;
}

export async function findAll(req: Request, res: Response): Promise<Response> {
  const { skip = "0", limit = "3", sort = "createdAt,asc" }: Partial<Query> = req.query;
  const [field, order] = sort.split(",");
  try {
    const orders = await Order.find<IOrder[]>()
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ [field]: order });
    return res.json(orders);
  } catch (error: any) {
    return errorHandler(res, error);
  }
}
export async function findAllByUser(req: Request, res: Response): Promise<Response> {
  const { skip = "0", limit = "3", sort = "createdAt,asc" }: Partial<Query> = req.query;
  const [field, order] = sort.split(",");

  try {
    const orders = await Order.find<IOrder[]>()
      .where({ user_id: req.params.id })
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ [field]: order });
    return res.json(orders);
  } catch (error: any) {
    return errorHandler(res, error);
  }
}

export async function findOneById(req: Request, res: Response): Promise<Response> {
  const { id: user_id, order_id } = req.params;
  try {
    const orderDB = await Order.findOne<IOrder>({ user_id, order_id })
      .populate("products", "name price weight thumbnail")
      .exec();
    if (!orderDB) {
      throw new NotFoundException("order not found");
    }
    return res.json(orderDB);
  } catch (error: any) {
    return errorHandler(res, error);
  }
}

export async function createOne(req: Request, res: Response): Promise<Response> {
  const order: IOrder = req.body;
  order.user_id = req.params.id;
  try {
    const orderDB = await Order.create<IOrder>(order);
    return res.status(201).json(orderDB);
  } catch (error: any) {
    return errorHandler(res, error);
  }
}

export async function updateOneById(req: Request, res: Response): Promise<Response> {
  const { user_id, ...order }: IOrder = req.body;
  const { order_id } = req.params;
  try {
    const orderDB = await Order.findByIdAndUpdate<IOrder>(order_id, order, {
      new: true,
      runValidators: true,
    });
    if (!orderDB) {
      throw new NotFoundException("order not found");
    }
    return res.json(orderDB);
  } catch (error: any) {
    return errorHandler(res, error);
  }
}
export async function deleteOneById(req: Request, res: Response): Promise<Response> {
  const { order_id } = req.params;
  try {
    const orderDB = await Order.findByIdAndDelete<IOrder>(order_id);
    if (!orderDB) {
      throw new NotFoundException("order not found");
    }
    return res.json(orderDB);
  } catch (error: any) {
    return errorHandler(res, error);
  }
}
