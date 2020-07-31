import { RequestHandler } from "express";

export const get404Page: RequestHandler = (req, res) => {
	res.status(404).render("404", { pageTitle: "404" });
};
