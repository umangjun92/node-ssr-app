import bcrypt from "bcryptjs";

import { ExtendedRequest } from "../utils/types";
import { RequestHandler } from "express";
import { UserModel } from "../models/user.model";

export const getLoginPage: RequestHandler = (req: ExtendedRequest, res) => {
	res.render("login", { pageTitle: "Login", isAuth: false });
};

export const postLogin: RequestHandler = async (req: ExtendedRequest, res) => {
	const { email, password } = req.body;
	// res.setHeader("Set-Cookie", "isAuth=true");
	try {
		const user = await UserModel.findOne({ email });
		if (user) {
			try {
				const isPswrdCorrect = await bcrypt.compare(password, user.password);
				if (isPswrdCorrect) {
					req.session.isAuth = true;
					req.session.user = user;
					req.session.save((err) => {
						if (err) {
							console.log(err);
						} else {
							res.redirect("/");
						}
					});
				} else {
					res.redirect("/login");
				}
			} catch (e) {
				console.log(e);
				res.redirect("/login");
			}
		} else {
			res.redirect("/login");
		}
	} catch (e) {
		console.log(e);
		res.redirect("/login");
	}
};

export const getSignupPage: RequestHandler = (req: ExtendedRequest, res) => {
	res.render("signup", { pageTitle: "Signup", isAuth: false });
};

export const postSignup: RequestHandler = async (req: ExtendedRequest, res) => {
	const { email, password1, password2, name } = req.body;
	if (password1 !== password2) {
		res.send("passwords dont match");
	} else {
		const user = await UserModel.findOne({ email });
		if (user) {
			res.send("user already exists");
		} else {
			const hashedPswrd = await bcrypt.hash(password1, 12);
			await UserModel.create({ name, email, password: hashedPswrd, cart: [] });
			res.redirect("/");
		}
	}
};

export const postLogout: RequestHandler = (req: ExtendedRequest, res) => {
	// res.setHeader("Set-Cookie", "isAuth=true");
	req.session.destroy(() => {
		res.redirect("/login");
	});
};
