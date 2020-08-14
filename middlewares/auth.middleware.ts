import { RequestHandler } from "express";

import { ExtendedRequest } from "../utils/types";

export const authMiddleware: RequestHandler = (req: ExtendedRequest, res, next) => {
	if (req.session?.isAuth) {
		next();
	} else {
		res.redirect("/login");
	}
};
