import { Router } from "express";
import authRouter from "./auth/routes/auth.routes";
import userRouter from "./users/routes/users.routes";
import productRouter from "./products/routes/products.routes";
import categoryRouter from "./categories/routes/categories.routes";
import orderRouter from "./users/orders/routes/orders.routes";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);

export default router;
