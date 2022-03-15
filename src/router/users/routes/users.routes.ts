import { Router } from "express";
import orderRoutes from "../orders/routes/orders.routes";
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

router.use("/", orderRoutes);

router
  .get("/", isAdmin, findAll)
  .get("/:id", isAuthorized, findOneById)
  .post("/", validateForbidden, createOne)
  .patch("/:id", [isAuthorized, validateForbidden], updateOneById)
  .delete("/:id", isAuthorized, deleteOneById);

export default router;
