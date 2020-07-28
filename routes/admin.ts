import { Router } from "express";

import {
	getAddProductPage,
	postAddProduct,
	getIndexPage,
	getAdminProductsPage,
	getEditProductPage,
	editProductPage,
	deleteProduct,
} from "../controllers/products.controller";

export const adminRouter = Router({});

adminRouter.get("/product", getAddProductPage);

adminRouter.post("/product", postAddProduct);

adminRouter.get("/product/:id", getEditProductPage);

adminRouter.post("/product/:id", editProductPage);

adminRouter.post("/product/delete/:id", deleteProduct);

adminRouter.get("/products", getAdminProductsPage);
