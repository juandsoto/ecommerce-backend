import { Router } from "express";
import { isAdmin } from "../../../middlewares/isAdmin.middleware";
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
  .post("/", isAdmin, createOne)
  .patch("/:id", isAdmin, updateOneById)
  .delete("/:id", isAdmin, deleteOneById);

export default router;
