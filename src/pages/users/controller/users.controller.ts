import { Request, Response } from "express";
import { User } from "../schema/User.schema";
import { badRequest } from "../../../utils/errors/badRequest";
import { IUser } from "../interfaces/user.interface";
import { genSaltSync, hashSync } from "bcrypt";

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
    const userDB = await User.findById<IUser>(id);
    return res.status(200).json(userDB);
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
  const user = req.body;
  const { id } = req.params;
  if (user.password) {
    const salt = genSaltSync();
    user.password = hashSync(user.password, salt);
  }
  try {
    const userDB = await User.findByIdAndUpdate<IUser>(id, user, { new: true, runValidators: true });
    return res.status(200).json(userDB);
  } catch (error: any) {
    return badRequest(res, error);
  }
}

export async function deleteOneById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  try {
    const userDB = await User.findByIdAndDelete<IUser>(id);
    return res.json(userDB);
  } catch (error: any) {
    res.json({
      error: error.name,
      message: error.message,
    });
  }
}
