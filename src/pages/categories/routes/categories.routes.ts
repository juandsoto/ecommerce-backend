import { Router } from "express";
import { isAdmin } from "../../../middlewares/isAdmin.middleware";
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
  .post("/", isAdmin, createOne)
  .patch("/:id", isAdmin, updateOneById)
  .delete("/:id", isAdmin, deleteOneById);

export default router;
