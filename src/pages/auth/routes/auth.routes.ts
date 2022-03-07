import { Router } from "express";
import { register, login } from "../controller/auth.controller";

const router = Router();

router.post("/register", register).post("/login", login);

export default router;
