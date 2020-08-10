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

export const shopRouter = Router();

shopRouter.get("/", getIndexPage);

shopRouter.get("/product/:id", getProductDetailsPage);

shopRouter.get("/cart", getCartPage);

shopRouter.get("/checkout", getCheckoutPage);

shopRouter.post("/checkout", handlePost_Checkout);

shopRouter.post("/add-to-cart/:id", handlePost_AddProductToCart);

shopRouter.post("/cart/delete/:productId", handlePost_DeleteFromCart);

shopRouter.get("/orders", getOrdersPage);
