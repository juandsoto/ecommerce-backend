import { Router } from "express";
import { findAll, createOne } from "../controller/categories.controller";

const router = Router();

router.get("/categories", findAll).post("/categories", createOne);

export default router;
