import { Router } from "express";

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

export const authRouter = Router({});

authRouter.get("/login", getLoginPage);
authRouter.post("/login", postLogin);

authRouter.get("/signup", getSignupPage);
authRouter.post("/signup", postSignup);

authRouter.post("/logout", postLogout);

authRouter.get("/reset-password", getResetPasswordPage);
authRouter.post("/reset-password", postResetPassword);

authRouter.get("/reset/:token", getNewPasswordPage);
authRouter.post("/new-password", createNewPassword);
