import { Request, Response } from "express";
import { errorHandler } from "../../../utils/errors";
import { compareSync } from "bcrypt";
import { createOne } from "../../users/controller/users.controller";
import { User } from "../../users/schema/User.schema";
import { NotFoundException } from "../../../utils/errors/NotFoundException";
import { InvalidCredentialsException } from "../../../utils/errors/InvalidCredentialsException";
import { generateJWT } from "../../../utils/jwt/generateJWT";

interface Login {
  email: string;
  password: string;
}

export async function register(req: Request, res: Response): Promise<Response> {
  return await createOne(req, res);
}

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password: pass } = req.body as Login;
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      throw new NotFoundException("user not found");
    }
    const isPasswordCorrect = compareSync(pass, userDB.password);
    if (!isPasswordCorrect) throw new InvalidCredentialsException("wrong credentials");

    const token = await generateJWT(userDB._id);

    const { password, ..._doc } = userDB._doc;
    return res.json({
      ..._doc,
      token,
    });
  } catch (error: any) {
    return errorHandler(res, error);
  }
}
