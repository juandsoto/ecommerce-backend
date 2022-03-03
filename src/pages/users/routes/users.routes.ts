import { Router } from "express";
import { hashPasswordMiddleware } from "../middlewares/index";
import {
  createOne,
  findAll,
  findOneById,
  updateOneById,
  deleteOneById,
} from "../controller/users.controller";

const router = Router();

router
  .get("/users", findAll)
  .get("/users/:id", findOneById)
  .post("/users", hashPasswordMiddleware, createOne)
  .patch("/users/:id", hashPasswordMiddleware, updateOneById)
  .delete("/users/:id", deleteOneById);

export default router;
