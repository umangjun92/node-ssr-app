import { RequestHandler } from "express";
// import { Product } from "../models/product.model";
// import { readFile } from "fs";
// import { getCartItemById, getAllCartItems } from "../models/cart.model";
import { QueryResult } from "pg";
import { Product, Cart, CartItem } from "../utils/db";
import { ExtendedRequest } from "../utils/types";
import { Model } from "sequelize-typescript";
import { ProductModel } from "../models/product.model";
import { CartModel } from "../models/cart.model";
export const Products = [];

export const getAddProductPage: RequestHandler = (req, res) => {
	res.render("add-product", { pageTitle: "Add Product", prod: {} });
};

export const postAddProduct: RequestHandler = (req: ExtendedRequest, res) => {
	const { title, imageUrl, price, description } = req.body;
	Product.create({ title, imageUrl, price, description, userId: req.user.id });
	// req.user.
	// 	.then(() => res.redirect("/"))
	// 	.catch((e) => res.send(e));
	// new Product(title, imageUrl, price, description)
	// 	.save()
	// 	.then(() => res.redirect("/"))
	// 	.catch((e) => console.log(e));
};

export const getEditProductPage: RequestHandler = (req: ExtendedRequest, res) => {
	const prodId = req.params.id;
	const userId = req.user.id;

	Product.findAll({ where: { id: prodId, userId } })
		.then((prods) => {
			const prod = prods[0];
			if (prod) {
				res.render("add-product", { pageTitle: "Edit Product", prod });
			} else {
				res.render("404", { pageTitle: "404" });
			}
		})
		.catch((e) => res.send(e));
	// Product.findByPk(id)
	// 	.then((data) => {
	// 		if (data) {
	// 			res.render("add-product", { pageTitle: "Edit Product", prod: data.toJSON() });
	// 		} else {
	// 			res.render("404", { pageTitle: "404" });
	// 		}
	// 	})
	// 	.catch((e) => res.send(e));
	// Product.getProductById(id).then((prod) => res.render("add-product", { pageTitle: "Edit Product", prod }));
	// Product.getProductById(id, (prod) => {
	// 	res.render("add-product", { pageTitle: "Edit Product", prod });
	// });
};

export const editProductPage: RequestHandler = (req, res) => {
	const id = req.params.id;
	const { title, imageUrl, price, description } = req.body;
	Product.update({ title, imageUrl, price, description }, { where: { id } })
		.then(() => res.redirect("/admin/products"))
		.catch((e) => res.send(e));
	// Product.editProductById(id, { title, imageUrl, price, description }, (x) => {
	// 	res.redirect("/admin/products");
	// });
};

export const deleteProduct: RequestHandler = (req, res) => {
	const id = req.params.id;
	Product.destroy({ where: { id } })
		.then(() => res.redirect("/admin/products"))
		.catch((e) => res.send(e));
	// Product.deleteProductById(id, () => {
	// 	res.redirect("/admin/products");
	// });
};

export const getProductDetailsPage: RequestHandler = (req, res) => {
	const { id } = req.params;
	// Product.findByPk(id)
	// 	.then((data) =>
	// 		getCartItemById(id, (cartItem) => {
	// 			if (data) {
	// 				const prod = data.toJSON() as ProductModel;
	// 				const updatedProd = { ...prod, quantity: cartItem ? cartItem.quantity : 0 };
	// 				res.render("product-detail", { pageTitle: prod.title, prod: updatedProd });
	// 			} else {
	// 				res.render("404", { pageTitle: "404" });
	// 			}
	// 		})
	// 	)
	// 	.catch((e) => res.send(e));
	// Product.getProductById(id)
	// 	.then((prod) => {
	// 		getCartItemById(id, (cartItem) => {
	// 			const updatedProd = { ...prod, quantity: cartItem ? cartItem.quantity : 0 };
	// 			prod
	// 				? res.render("product-detail", { pageTitle: prod.title, prod: updatedProd })
	// 				: res.render("404", { pageTitle: "404" });
	// 		});
	// 	})
	// 	.catch((e) => console.log(e));
	// Product.getProductById(id, (prod) => {
	// 	getCartItemById(id, (cartItem) => {
	// 		const updatedProd = { ...prod, quantity: cartItem ? cartItem.quantity : 0 };
	// 		prod
	// 			? res.render("product-detail", { pageTitle: prod.title, prod: updatedProd })
	// 			: res.render("404", { pageTitle: "404" });
	// 	});
	// });
};

export const getAdminProductsPage: RequestHandler = (req: ExtendedRequest, res) => {
	Product.findAll({ where: { userId: req.user.id } })
		.then((products) => res.render("admin-products", { pageTitle: "Admin Products", products }))
		.catch((e) => res.send(e));
	// Product.getAllProducts((products) => res.render("admin-products", { pageTitle: "Admin Products", products }));
};

export const getIndexPage: RequestHandler = (req: ExtendedRequest, res) => {
	const userId = req.user.id;
	let currentCart: CartModel | null;
	Cart.findOne({ where: { userId } })
		.then((cart) => {
			// currentCart = cart;
			return Promise.all([Product.findAll(), CartItem.findAll({ where: { cartId: cart?.id } })]);
		})
		.then(([products, cartItems]) => {
			const updatedProds = products.map((prod) => {
				const cartItemIndex = cartItems.findIndex((item) => item.id === prod.id);
				if (cartItemIndex !== -1) {
					return { ...(prod as any).dataValues, quantity: cartItems[cartItemIndex].quantity };
				} else {
					return prod;
				}
			});
			res.render("shop", { pageTitle: "Shop", products: updatedProds });
		})
		.catch((e) => res.send(e));
	// Product.findAll()
	// 	.then((products) => res.render("shop", { pageTitle: "Shop", products }))
	// 	.catch((e) => res.send(e));
	// Product.getAllProducts((products) => {
	// 	getAllCartItems((cartData) => {
	// 		let updatedProds = products.map((prod) => {
	// 			let currentCartItem = cartData.find((item) => item.id === prod.id);
	// 			return { ...prod, quantity: currentCartItem ? currentCartItem.quantity : 0 };
	// 		});
	// 		res.render("shop", { pageTitle: "Shop", products: updatedProds });
	// 	});
	// });
	// Product.getAllProducts().then((products) => {
	// 	getAllCartItems((cartData) => {
	// 		let updatedProds = products.map((prod) => {
	// 			let currentCartItem = cartData.find((item) => String(item.id) === String(prod.id));
	// 			return { ...prod, quantity: currentCartItem ? currentCartItem.quantity : 0 };
	// 		});
	// 		// console.log(updatedProds);
	// 		res.render("shop", { pageTitle: "Shop", products: updatedProds });
	// 	});
	// });
};

export const getProductsPage: RequestHandler = (req, res) => {
	// Product.getAllProducts((products) => res.render("products", { pageTitle: "Products", products }));
};
