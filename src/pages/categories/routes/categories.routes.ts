import { Router } from "express";
import {
  findAll,
  createOne,
  updateOneById,
  deleteOneById,
  findOneById,
} from "../controller/categories.controller";

const router = Router();

router
  .get("/", findAll)
  .get("/:id", findOneById)
  .post("/", createOne)
  .patch("/:id", updateOneById)
  .delete("/:id", deleteOneById);

export default router;
