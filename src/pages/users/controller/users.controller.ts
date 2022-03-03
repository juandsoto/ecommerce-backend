import { Request, Response } from "express";
import { User } from "../schema/User.schema";
import { badRequest } from "../../../utils/errors/badRequest";
import { IUser } from "../interfaces/user.interface";

export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    const users = await User.find<IUser[]>();
    return res.json(users);
  } catch (error) {
    return badRequest(res, error);
  }
}

export async function findOneById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  try {
    const user = await User.findById<IUser>(id);
    return res.status(200).json(user);
  } catch (error: any) {
    res.json({
      error: error.name,
      message: error.message,
    });
  }
}

export async function createOne(req: Request, res: Response): Promise<Response> {
  const { isAdmin, ...user } = req.body;
  try {
    const userDB = await User.create<IUser>(user);
    return res.status(201).json(userDB);
  } catch (error: any) {
    return badRequest(res, error);
  }
}

export async function updateOneById(req: Request, res: Response): Promise<Response> {
  const { email, is_admin, ...user } = req.body;
  const { id } = req.params;
  try {
    const updated = await User.findByIdAndUpdate<IUser>(id, user, { new: true });
    return res.status(200).json(updated);
  } catch (error: any) {
    res.json({
      error: error.name,
      message: error.message,
    });
  }
}

export async function deleteOneById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete<IUser>(id);
    return res.json(deleted);
  } catch (error: any) {
    res.json({
      error: error.name,
      message: error.message,
    });
  }
}
