import { RequestHandler } from "express";

import { ExtendedRequest } from "../utils/types";
import { get404Page } from "./errors.controller";
import { ProductModel } from "../models/product.model";

export const Products = [];

export const getAddProductPage: RequestHandler = (req: ExtendedRequest, res) => {
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
	try {
		const prod = await ProductModel.findOne({ _id: id, userId: req.user.id });
		if (prod) {
			prod.title = title;
			prod.imageUrl = imageUrl;
			prod.price = price;
			prod.description = description;
			await prod.save();
			res.redirect("/admin/products");
		} else {
			res.redirect("/admin/products");
			throw "Product doesn't exist for this user";
		}
	} catch (e) {
		console.log("Error Editing Product >>> ", e);
	}
};

export const deleteProduct: RequestHandler = async (req: ExtendedRequest, res) => {
	const id = req.params.id;
	try {
		const del = await ProductModel.findOneAndDelete({ _id: id, userId: req.user.id });
		if (!del) {
			res.redirect("/admin/products");
			throw del;
		} else {
			res.redirect("/admin/products");
		}
	} catch (e) {
		console.log("Error deleteing product >>> ", e);
	}
	// Product.delete(id)
	// 	.then(() => {
	// 		res.redirect("/admin/products");
	// 	})
	// 	.catch((e) => console.log(e));
};

export const getProductDetailsPage: RequestHandler = async (req: ExtendedRequest, res) => {
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
	res.render("shop", { pageTitle: "admin-products", products, isAdmin: true });
};

export const getIndexPage: RequestHandler = async (req: ExtendedRequest, res) => {
	const products = await ProductModel.find();
	res.render("shop", {
		pageTitle: "shop",
		products,
		isAdmin: false,
	});
};

export const getProductsPage: RequestHandler = (req, res) => {};
