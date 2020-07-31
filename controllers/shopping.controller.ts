import { RequestHandler } from "express";
import { ExtendedRequest } from "../utils/types";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { get404Page } from "./errors.controller";
import { ObjectId } from "mongodb";
// import { CartItem } from "../models/cart.model";

export const handlePost_AddProductToCart: RequestHandler = async (req: ExtendedRequest, res) => {
	// const product = await Product.findById(req.params.id);
	// if (product) {
	// 	req.user.addProductToCart(product).then(() => {
	// 		res.redirect(req.body.redirectTo);
	// 	});
	// 	// await req.user.addProductToCart(product);
	// 	// res.redirect(req.body.redirectTo);
	// } else {
	// 	get404Page(req, res, () => {});
	// }
	// const quantity = req.body.quantity || 1;
};

export const handlePost_DeleteFromCart: RequestHandler = (req: ExtendedRequest, res) => {
	// req.user.deleteProductFromCart(req.params.productId).then(() => {
	// 	res.redirect("/cart");
	// });
};

export const getCartPage: RequestHandler = async (req: ExtendedRequest, res) => {
	// const cartItems = await req.user.getCartWithProductDetails();
	// res.render("cart.ejs", { pageTitle: "Cart", cartItems });
};

export const getCheckoutPage: RequestHandler = (req, res) => {
	res.render("checkout.ejs", { pageTitle: "Checkout" });
};

export const handlePost_Checkout: RequestHandler = async (req: ExtendedRequest, res) => {
	const user = req.user;
	// const cartItems = await user.getCartWithProductDetails();
	// const newOrder = new Order({ user: { _id: user._id }, items: cartItems });
	// await newOrder.addOrder();
	// await user.clearCart();
	res.redirect("/orders");
};

export const getOrdersPage: RequestHandler = async (req: ExtendedRequest, res) => {
	// const orders = await Order.getOrdersByUserId(req.user._id);
	// console.log("orders", orders);
	// res.redirect("/");
};
