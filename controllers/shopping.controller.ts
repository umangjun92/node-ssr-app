import { RequestHandler } from "express";
import { ExtendedRequest } from "../utils/types";
import { Cart, CartItem, Product, OrderItem, Order } from "../utils/db";
import { CartModel } from "../models/cart.model";
import { CartItemModel } from "../models/cart-item";
import { OrderModel } from "../models/order";
// import { CartItem } from "../models/cart.model";

export const handlePost_AddProductToCart: RequestHandler = (req: ExtendedRequest, res) => {
	const productId = +req.params.id;
	const userId = req.user.id;
	// const quantity = req.body.quantity || 1;
	let currentCart: CartModel;
	Cart.findOne({ where: { userId } })
		.then((cart) => {
			if (cart) {
				currentCart = cart;
			}
			return CartItem.findOne({ where: { cartId: cart?.id, productId } });
		})
		.then((cartItem) => {
			if (cartItem) {
				CartItem.update(
					{ quantity: cartItem.quantity + 1 },
					{ where: { cartId: currentCart?.id, productId } }
				).then(([num, cartItems]) => {
					// res.json(cartItems);
					res.redirect(req.body.redirectTo);
				});
			} else {
				CartItem.create({ cartId: currentCart?.id, productId, quantity: 1 }).then((updatedCartItem) => {
					// res.json(updatedCartItem);
					res.redirect(req.body.redirectTo);
				});
			}
		})
		.catch((e) => res.send(e));
	// CartItem.create({ quantity, productId }, {});
	// new CartItem(req.params.id, req.body.quantity, () => {
	// 	res.redirect(req.body.redirectTo);
	// });
};

export const getCartPage: RequestHandler = (req: ExtendedRequest, res) => {
	let cartItems: CartItemModel[];
	Cart.findAll({ where: { userId: req.user.id } })
		.then((carts) => {
			const cart = carts[0];
			return CartItem.findAll({ where: { cartId: cart.id } });
		})
		.then((_cartItems) => {
			cartItems = _cartItems;
			return Product.findAll({ where: { id: _cartItems.map((item) => item.productId as number) } });
		})
		.then((products) => {
			const updatedProds = products.map((prod) => {
				const cartItemIndex = cartItems.findIndex((item) => item.id === prod.id);
				if (cartItemIndex !== -1) {
					return { ...(prod as any).dataValues, quantity: cartItems[cartItemIndex].quantity };
				} else {
					return prod;
				}
			});
			res.render("cart.ejs", { pageTitle: "Cart", cartItems: updatedProds });
		})
		.catch((e) => res.send(e));
	// ;
};

export const getCheckoutPage: RequestHandler = (req, res) => {
	res.render("checkout.ejs", { pageTitle: "Checkout" });
};

export const handlePost_Checkout: RequestHandler = (req: ExtendedRequest, res) => {
	const userId = req.user.id;
	let order: OrderModel;
	let currentCart: CartModel | null;
	Order.create({ userId })
		.then((_order) => {
			order = _order;
			return Cart.findOne({ where: { userId } });
		})
		.then((cart) => {
			currentCart = cart;
			return CartItem.findAll({ where: { cartId: cart?.id } });
		})
		.then((cartItems) =>
			OrderItem.bulkCreate(
				cartItems.map(({ quantity, productId }) => ({ quantity, productId, orderId: order.id }))
			)
		)
		.then((orderItems) => {
			CartItem.destroy({ where: { cartId: currentCart?.id } });
		})
		.then((res) => console.log(res))
		.catch((e) => res.send(e));
};
