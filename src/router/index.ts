import { Router } from "express";
import authRouter from "./auth/routes/auth.routes";
import userRouter from "./users/routes/users.routes";
import productRouter from "./products/routes/products.routes";
import categoryRouter from "./categories/routes/categories.routes";
const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

export default router;
