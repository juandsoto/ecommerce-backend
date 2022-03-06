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
  .get("/", findAll)
  .get("/:id", findOneById)
  .post("/", hashPasswordMiddleware, createOne)
  .patch("/:id", hashPasswordMiddleware, updateOneById)
  .delete("/:id", deleteOneById);

export default router;
