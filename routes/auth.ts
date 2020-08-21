import { Router } from "express";
import { check, body } from "express-validator";
import bcrypt from "bcryptjs";

import {
	getLoginPage,
	postLogin,
	postLogout,
	getSignupPage,
	postSignup,
	getResetPasswordPage,
	postResetPassword,
	getNewPasswordPage,
	createNewPassword,
} from "../controllers/auth.controller";
import { ExtendedRequest } from "../utils/types";
import { UserModel } from "../models/user.model";

export const authRouter = Router({});

authRouter.get("/login", getLoginPage);
authRouter.post(
	"/login",
	[
		body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
		body("password").custom(async (value: string, { req }) => {
			const user = await UserModel.findOne({ email: req.body.email });
			if (!user) {
				throw "No user exists with this Email";
			} else {
				const isPswrdCorrect = await bcrypt.compare(req.body.password, user.password);
				if (!isPswrdCorrect) {
					throw "Incorrect Password";
				} else {
					return true;
				}
			}
		}),
	],
	postLogin
);

authRouter.get("/signup", getSignupPage);
authRouter.post(
	"/signup",
	[
		body("name")
			.notEmpty()
			.withMessage("Name is required")
			.isAlphanumeric()
			.withMessage("Name should have only numbers and letters")
			.normalizeEmail(),
		check("email")
			.isEmail()
			.withMessage("Invalid Email")
			.custom(async (value: string) => {
				const user = await UserModel.findOne({ email: value });
				if (user) {
					throw "Email already in use";
				}
				return true;
			}),
		body("password1")
			.custom((value: string, { req }) => {
				if (value !== req.body.password2) {
					throw "Passwords Don't Match";
				}
				return true;
			})
			.isLength({ min: 6 })
			.withMessage("Password should have at least 6 characters")
			.custom((value: string) => {
				if (!value) {
					return true;
				}
				if (!value.match(/[a-z]/)) {
					throw new Error("Password should have at least one small-case letter");
				}
				if (!value.match(/[A-Z]/)) {
					throw new Error("Password should have at least one capital-case letter");
				}
				if (!value.match(/[0-9]/)) {
					throw new Error("Password should have at least one numeric character");
				}
				if (!value.match(/[!@#$%&*-]/)) {
					throw new Error("Password should have at least one special character among ! @ # $ % & * - ");
				}
				return true;
			}),
	],
	postSignup
);

authRouter.post("/logout", postLogout);

authRouter.get("/reset-password", getResetPasswordPage);
authRouter.post("/reset-password", postResetPassword);

authRouter.get("/reset/:token", getNewPasswordPage);
authRouter.post("/new-password", createNewPassword);
