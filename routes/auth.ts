import { Router } from "express";
import { getLoginPage, postLogin, postLogout } from "../controllers/auth.controller";

export const authRouter = Router({});

authRouter.get("/login", getLoginPage);

authRouter.post("/login", postLogin);

authRouter.post("/logout", postLogout);
