import { Router } from "express";
import { validateForbidden } from "../middlewares";
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
  .post("/", validateForbidden, createOne)
  .patch("/:id", validateForbidden, updateOneById)
  .delete("/:id", deleteOneById);

export default router;
