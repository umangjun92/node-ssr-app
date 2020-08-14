import { Router } from "express";

import { getLoginPage, postLogin, postLogout, getSignupPage, postSignup } from "../controllers/auth.controller";

export const authRouter = Router({});

authRouter.get("/login", getLoginPage);
authRouter.post("/login", postLogin);

authRouter.get("/signup", getSignupPage);
authRouter.post("/signup", postSignup);

authRouter.post("/logout", postLogout);
