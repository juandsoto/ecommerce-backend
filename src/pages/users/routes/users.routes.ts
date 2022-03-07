import { Router } from "express";
import { validateForbidden } from "../middlewares";
import { isAdmin } from "../../../middlewares/isAdmin.middleware";
import { isAuthorized } from "../../../middlewares/isAuthorized.middleware";
import {
  createOne,
  findAll,
  findOneById,
  updateOneById,
  deleteOneById,
} from "../controller/users.controller";

const router = Router();

router
  .get("/", isAdmin, findAll)
  .get("/:id", isAuthorized, findOneById)
  .post("/", validateForbidden, createOne)
  .patch("/:id", [isAuthorized, validateForbidden], updateOneById)
  .delete("/:id", isAuthorized, deleteOneById);

export default router;
