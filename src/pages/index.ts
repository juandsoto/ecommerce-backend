import { Router } from "express";
import userRouter from "./users/routes/users.routes";
import productRouter from "./products/routes/products.routes";
import categoryRouter from "./categories/routes/categories.routes";
const router = Router();

router.use(userRouter);
router.use(productRouter);
router.use(categoryRouter);

export default router;
