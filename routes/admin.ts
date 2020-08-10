import { Router } from "express";

import {
	getAddProductPage,
	postAddProduct,
	getAdminProductsPage,
	getEditProductPage,
	editProductPage,
	deleteProduct,
} from "../controllers/products.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const adminRouter = Router({});

adminRouter.get("/product", authMiddleware, getAddProductPage);

adminRouter.post("/product", authMiddleware, postAddProduct);

adminRouter.get("/product/:id", authMiddleware, getEditProductPage);

adminRouter.post("/product/:id", authMiddleware, editProductPage);

adminRouter.post("/product/delete/:id", authMiddleware, deleteProduct);

adminRouter.get("/products", authMiddleware, getAdminProductsPage);
