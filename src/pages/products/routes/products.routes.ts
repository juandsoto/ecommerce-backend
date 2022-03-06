import { Router } from "express";
import { createOne, findAll, findOneById } from "../controller/products.controller";

const router = Router();

router.get("/", findAll).get("/:id", findOneById).post("/", createOne);

export default router;
