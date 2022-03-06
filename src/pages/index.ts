import { Router } from "express";
import userRouter from "./users/routes/users.routes";
import productRouter from "./products/routes/products.routes";
import categoryRouter from "./categories/routes/categories.routes";
const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

export default router;
