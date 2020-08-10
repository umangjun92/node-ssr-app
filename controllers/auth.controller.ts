import { ExtendedRequest } from "../utils/types";
import { RequestHandler } from "express";
import { parseCookie } from "../utils/parseCookie";
import { UserModel } from "../models/user.model";

export const getLoginPage: RequestHandler = (req: ExtendedRequest, res) => {
	res.render("login", { pageTitle: "Login", isAuth: false });
};

export const postLogin: RequestHandler = async (req: ExtendedRequest, res) => {
	// res.setHeader("Set-Cookie", "isAuth=true");
	const user = await UserModel.findById("5f2ea51a59423e4390043149");
	try {
		if (user) {
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
	}
};

export const postLogout: RequestHandler = (req: ExtendedRequest, res) => {
	// res.setHeader("Set-Cookie", "isAuth=true");
	req.session.destroy(() => {
		res.redirect("/login");
	});
};
