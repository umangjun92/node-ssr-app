import { RequestHandler } from "express";
import { ExtendedRequest } from "../utils/types";

export const get404Page: RequestHandler = (req: ExtendedRequest, res) => {
	res.status(404).render("404", { pageTitle: "404" });
};
