import { RequestHandler } from "express";
// import { Product } from "../models/product.model";
// import { readFile } from "fs";
// import { getCartItemById, getAllCartItems } from "../models/cart.model";
import { QueryResult } from "pg";
import { ExtendedRequest } from "../utils/types";
import { Model } from "sequelize-typescript";
import { get404Page } from "./errors.controller";
import { ProductModel } from "../models/product.model";
export const Products = [];

export const getAddProductPage: RequestHandler = (req, res) => {
	res.render("add-product", { pageTitle: "Add Product", prod: {} });
};

export const postAddProduct: RequestHandler = async (req: ExtendedRequest, res) => {
	const { description, imageUrl, price, title } = req.body;
	await ProductModel.create({ price, title, description, imageUrl, userId: req.user._id });
	res.redirect("/admin/products");
	// const newProd = new Product({ description, imageUrl, price, title, userId: req.user._id });
	// newProd.save().then(() => {
	// 	res.redirect("/");
	// });
};

export const getEditProductPage: RequestHandler = async (req: ExtendedRequest, res) => {
	const prodId = req.params.id;
	const prod = await ProductModel.findById(prodId);
	res.render("add-product", { pageTitle: "Edit Product", prod });
};

export const editProductPage: RequestHandler = async (req: ExtendedRequest, res) => {
	const id = req.params.id;
	const { title, imageUrl, price, description } = req.body;
	await ProductModel.findByIdAndUpdate(id, { title, imageUrl, price, description }, { useFindAndModify: false });
	res.redirect("/admin/products");
};

export const deleteProduct: RequestHandler = async (req, res) => {
	const id = req.params.id;
	await ProductModel.findByIdAndDelete(id);
	res.redirect("/admin/products");
	// Product.delete(id)
	// 	.then(() => {
	// 		res.redirect("/admin/products");
	// 	})
	// 	.catch((e) => console.log(e));
};

export const getProductDetailsPage: RequestHandler = async (req, res) => {
	const { id } = req.params;
	try {
		console.log(id);
		const prod = await ProductModel.findById(id);
		if (prod) {
			res.render("product-detail", { pageTitle: prod.title, prod });
		} else {
			get404Page(req, res, () => {});
		}
	} catch (e) {
		console.error(e);
		res.send(e);
	}
};

export const getAdminProductsPage: RequestHandler = async (req: ExtendedRequest, res) => {
	const products = await ProductModel.find({ userId: req.user._id });
	console.log(products);
	res.render("shop", { pageTitle: "admin-products", products, isAdmin: true });
};

export const getIndexPage: RequestHandler = async (req: ExtendedRequest, res) => {
	const products = await ProductModel.find();
	res.render("shop", { pageTitle: "shop", products, isAdmin: false });
};

export const getProductsPage: RequestHandler = (req, res) => {};
