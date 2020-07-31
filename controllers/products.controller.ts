import { RequestHandler } from "express";
// import { Product } from "../models/product.model";
// import { readFile } from "fs";
// import { getCartItemById, getAllCartItems } from "../models/cart.model";
import { QueryResult } from "pg";
import { ExtendedRequest } from "../utils/types";
import { Model } from "sequelize-typescript";
import { Product } from "../models/product.model";
import { get404Page } from "./errors.controller";
export const Products = [];

export const getAddProductPage: RequestHandler = (req, res) => {
	res.render("add-product", { pageTitle: "Add Product", prod: {} });
};

export const postAddProduct: RequestHandler = (req: ExtendedRequest, res) => {
	const { description, imageUrl, price, title } = req.body;
	const newProd = new Product({ description, imageUrl, price, title, userId: req.user._id });
	// newProd.save().then(() => {
	// 	res.redirect("/");
	// });
};

export const getEditProductPage: RequestHandler = (req: ExtendedRequest, res) => {
	const prodId = req.params.id;
	// Product.findById(prodId)
	// 	.then((prod) => {
	// 		res.render("add-product", { pageTitle: "Edit Product", prod });
	// 	})
	// 	.catch((e) => console.log(e));
};

export const editProductPage: RequestHandler = (req: ExtendedRequest, res) => {
	const id = req.params.id;
	const { title, imageUrl, price, description } = req.body;
	// Product.update(id, new Product({ title, imageUrl, price, description, userId: req.user._id }))
	// 	.then(() => {
	// 		res.redirect("/admin/products");
	// 	})
	// 	.catch((e) => console.log(e));
};

export const deleteProduct: RequestHandler = (req, res) => {
	const id = req.params.id;
	// Product.delete(id)
	// 	.then(() => {
	// 		res.redirect("/admin/products");
	// 	})
	// 	.catch((e) => console.log(e));
};

export const getProductDetailsPage: RequestHandler = (req, res) => {
	const { id } = req.params;
	// Product.findById(id)
	// 	.then((prod) => {
	// 		if (prod) {
	// 			res.render("product-detail", { pageTitle: prod?.title, prod });
	// 		} else {
	// 			get404Page(req, res, () => {});
	// 		}
	// 	})
	// 	.catch((e) => console.log(e));
};

export const getAdminProductsPage: RequestHandler = (req: ExtendedRequest, res) => {
	// Product.findAll()
	// 	.then((products) => {
	// 		res.render("shop", { pageTitle: "admin-products", products, isAdmin: true });
	// 	})
	// 	.catch((e) => console.log(e));
};

export const getIndexPage: RequestHandler = (req: ExtendedRequest, res) => {
	// Product.findAll()
	// 	.then((products) => {
	// 		res.render("shop", { pageTitle: "shop", products, isAdmin: false });
	// 	})
	// 	.catch((e) => console.log(e));
};

export const getProductsPage: RequestHandler = (req, res) => {};
