import { Router } from "express";
import { createOne, findAll, findOneById } from "../controller/products.controller";

const router = Router();

router.get("/products", findAll).get("/products/:id", findOneById).post("/products", createOne);

export default router;
