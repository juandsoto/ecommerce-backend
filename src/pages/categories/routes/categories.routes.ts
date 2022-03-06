import { Router } from "express";
import { findAll, createOne } from "../controller/categories.controller";

const router = Router();

router.get("/", findAll).post("/", createOne);

export default router;
