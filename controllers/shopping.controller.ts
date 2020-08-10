import { RequestHandler } from "express";
import { ExtendedRequest } from "../utils/types";
import { Order, OrderModel } from "../models/order.model";
import { get404Page } from "./errors.controller";
import { ObjectId } from "mongodb";
import { ProductModel } from "../models/product.model";
// import { CartItem } from "../models/cart.model";

export const handlePost_AddProductToCart: RequestHandler = async (req: ExtendedRequest, res) => {
	const product = await ProductModel.findById(req.params.id);
	if (product) {
		await req.user.addToCart(product);
		res.redirect(req.body.redirectTo);
	} else {
		get404Page(req, res, () => {});
	}
	// const quantity = req.body.quantity || 1;
};

export const handlePost_DeleteFromCart: RequestHandler = async (req: ExtendedRequest, res) => {
	await req.user.deleteCartItem(req.params.productId);
	res.redirect("/cart");

	// req.user.deleteProductFromCart(req.params.productId).then(() => {
	// 	res.redirect("/cart");
	// });
};

export const getCartPage: RequestHandler = async (req: ExtendedRequest, res) => {
	const cartItems = await req.user.getCart();
	console.log(cartItems);
	res.render("cart.ejs", { pageTitle: "Cart", cartItems, isAuth: req.session.isAuth });
};

export const getCheckoutPage: RequestHandler = (req: ExtendedRequest, res) => {
	res.render("checkout.ejs", { pageTitle: "Checkout", isAuth: req.session.isAuth });
};

export const handlePost_Checkout: RequestHandler = async (req: ExtendedRequest, res) => {
	const user = req.user;
	const order = new OrderModel({ items: await user.getCart(), userId: user._id });
	await OrderModel.createOrder(order);
	await user.clearCart();
	console.log("done every");
	// const cartItems = await user.getCartWithProductDetails();
	// const newOrder = new Order({ user: { _id: user._id }, items: cartItems });
	// await newOrder.addOrder();
	// await user.clearCart();
	res.redirect("/orders");
};

export const getOrdersPage: RequestHandler = async (req: ExtendedRequest, res) => {
	const orders = await OrderModel.getOrdersByUserId(req.user._id);
	console.log("orders", orders);
	res.redirect("/");
};
