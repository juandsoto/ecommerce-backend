import { Router } from "express";
import { isAdmin } from "../../../../middlewares/isAdmin.middleware";
import { isAuthorized } from "../../../../middlewares/isAuthorized.middleware";
import { isOwner } from "../../../../middlewares/isOwner.middleware";
import {
  createOne,
  findAll,
  findAllByUser,
  findOneById,
  updateOneById,
  deleteOneById,
} from "../controller/orders.controller";

const router = Router({ mergeParams: true });

/**
 * api/v1/users
 */
router
  .get("/orders", isAdmin, findAll)
  .get("/:id/orders", isOwner, findAllByUser)
  .get("/:id/orders/:order_id", isOwner, findOneById)
  .post("/:id/orders", isOwner, createOne)
  .patch("/:id/orders/:order_id", isOwner, updateOneById)
  .delete("/:id/orders/:order_id", isOwner, deleteOneById);

export default router;
