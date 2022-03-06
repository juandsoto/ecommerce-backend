import { Router } from "express";
import {
  createOne,
  deleteOneById,
  findAll,
  findOneById,
  updateOneById,
} from "../controller/products.controller";

const router = Router();

router
  .get("/", findAll)
  .get("/:id", findOneById)
  .post("/", createOne)
  .patch("/:id", updateOneById)
  .delete("/:id", deleteOneById);

export default router;
