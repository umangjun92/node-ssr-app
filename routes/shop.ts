import { Router } from "express";

import { getIndexPage, getProductsPage, getProductDetailsPage } from "../controllers/products.controller";
import {
	getCartPage,
	getCheckoutPage,
	handlePost_AddProductToCart,
	handlePost_Checkout,
	handlePost_DeleteFromCart,
	getOrdersPage,
} from "../controllers/shopping.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const shopRouter = Router();

shopRouter.get("/", getIndexPage);

shopRouter.get("/product/:id", getProductDetailsPage);

shopRouter.get("/cart", authMiddleware, getCartPage);

shopRouter.get("/checkout", authMiddleware, getCheckoutPage);

shopRouter.post("/checkout", authMiddleware, handlePost_Checkout);

shopRouter.post("/add-to-cart/:id", authMiddleware, handlePost_AddProductToCart);

shopRouter.post("/cart/delete/:productId", authMiddleware, handlePost_DeleteFromCart);

shopRouter.get("/orders", authMiddleware, getOrdersPage);
