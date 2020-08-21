import bcrypt from "bcryptjs";
import { createTransport } from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import crypto from "crypto";
import { validationResult } from "express-validator";

import { ExtendedRequest } from "../utils/types";
import { RequestHandler } from "express";
import { UserModel, IUserDocument } from "../models/user.model";

const transporter = createTransport(
	sendgridTransport({
		auth: {
			api_key: "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",
		},
	})
);

export const getLoginPage: RequestHandler = (req: ExtendedRequest, res) => {
	res.render("login", { pageTitle: "Login", isAuth: false });
};

export const postLogin: RequestHandler = async (req: ExtendedRequest, res) => {
	// res.setHeader("Set-Cookie", "isAuth=true");
	try {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			const { email } = req.body;
			const user = (await UserModel.findOne({ email })) as IUserDocument;
			req.session.isAuth = true;
			req.session.user = user;
			req.session.save((err) => {
				if (err) {
					res.redirect("/login");
					throw err;
				} else {
					res.redirect("/");
				}
			});
		} else {
			res.redirect("/login");
			throw errors.array().map(({ msg }) => msg);
		}
	} catch (e) {
		console.log("Error when Logging In >>> ", e);
	}
};

export const getSignupPage: RequestHandler = (req: ExtendedRequest, res) => {
	res.render("signup", { pageTitle: "Signup", isAuth: false });
};

export const postSignup: RequestHandler = async (req: ExtendedRequest, res) => {
	try {
		const errors = validationResult(req);
		if (errors) {
			res.redirect("/signup");
			throw errors.array().map(({ msg }) => msg);
		} else {
			const { email, password1, name } = req.body;
			const hashedPswrd = await bcrypt.hash(password1, 12);
			await UserModel.create({ name, email, password: hashedPswrd, cart: [] });
			res.redirect("/");
			try {
				await transporter.sendMail({
					to: email,
					from: "k.umang.0606@gmail.com",
					subject: "Welcome to Shop",
					html: `<h1>Hi ${name},</h1><p>Welcome to the Shop. Click on the link to get started</p>`,
				});
			} catch (e) {
				console.log("Error sending welcome Email >>> ", e);
			}
		}
	} catch (e) {
		console.log("Error signing up >>> ", e);
	}
};

export const postLogout: RequestHandler = (req: ExtendedRequest, res) => {
	// res.setHeader("Set-Cookie", "isAuth=true");
	req.session.destroy(() => {
		res.redirect("/login");
	});
};

export const getResetPasswordPage: RequestHandler = (req: ExtendedRequest, res) => {
	res.render("reset-password", { pageTitle: "Reset Password", isAuth: false });
};

export const postResetPassword: RequestHandler = async (req: ExtendedRequest, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });
		if (!user) {
			res.redirect("/reset-password");
			throw "Email not found";
		} else {
			crypto.randomBytes(32, async (err, buffer) => {
				if (err) {
					res.redirect("/reset-password");
					throw err;
				} else {
					const token = buffer.toString("hex");
					user.resetPasswordToken = token;
					user.resetPasswordTokenExpiration = Date.now() + 60 * 60 * 1000;
					await user.save();
					res.redirect("/");
					transporter.sendMail({
						html: `<p>
                        localhost:3000/reset/${token}
                            <a href="localhost:3000/reset/${token}" target="blank">Click here</a>
                             to reset your password.
                        </p>`,
						subject: "Reset Password",
						from: "k.umang.0606@gmail.com",
						to: user.email,
					});
				}
			});
		}
	} catch (e) {
		console.log("reset password error: ", e);
	}
};

export const getNewPasswordPage: RequestHandler = async (req: ExtendedRequest, res) => {
	const token = req.params.token;
	try {
		const user = await UserModel.findOne({
			resetPasswordToken: token,
			resetPasswordTokenExpiration: { $gt: Date.now() },
		});
		if (user) {
			res.render("new-password", {
				pageTitle: "Create New Password",
				isAuth: false,
				userId: user.id,
				passwordToken: token,
			});
		} else {
			res.redirect("/login");
			throw "Invalid Token";
		}
	} catch (e) {
		console.log("error in new password page >>>", e);
	}
};

export const createNewPassword: RequestHandler = async (req: ExtendedRequest, res) => {
	const { password, password2, userId, passwordToken } = req.body;

	try {
		if (password !== password2) {
			res.redirect(`/reset/${passwordToken}`);
			throw "password don't match";
		} else {
			const user = await UserModel.findOne({
				_id: userId,
				resetPasswordToken: passwordToken,
				resetPasswordTokenExpiration: { $gt: Date.now() },
			});
			if (user) {
				const hashedPswrd = await bcrypt.hash(password, 12);
				user.password = hashedPswrd;
				user.resetPasswordToken = undefined;
				user.resetPasswordTokenExpiration = undefined;
				await user.save();
				res.redirect("/login");
			} else {
				res.redirect(`/login`);
				throw "Invalid token";
			}
			// const hashedPswrd = await bcrypt.hash(password, 12);
			// req.user.password = hashedPswrd;
			// req.user.resetPasswordToken = undefined;
			// req.user.resetPasswordTokenExpiration = undefined;
			// await req.user.save();
			// res.redirect("/login");
		}
	} catch (e) {
		console.log("error when creating new password >>>", e);
	}
};
