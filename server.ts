import express from "express";
import bodyParser from "body-parser";
import path from "path";
import csurf from "csurf";

import { connectToDB } from "./utils/db";
import { adminRouter } from "./routes/admin";
import { shopRouter } from "./routes/shop";
import { RootDir } from "./utils/path";
import { get404Page } from "./controllers/errors.controller";
import { ExtendedRequest } from "./utils/types";
import { UserModel } from "./models/user.model";
import { authRouter } from "./routes/auth";
import { sessionMiddleware } from "./middlewares/session.middleware";
// import { User } from "./models/user.model";

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(RootDir, "public")));

app.use(sessionMiddleware);

const csrfProtection = csurf();
app.use(csrfProtection);

app.use(async (req: ExtendedRequest, res, next) => {
	const user = await UserModel.findById(req.session?.user?._id);
	if (user) {
		req.user = user;
	} else {
		console.log("user not found");
	}
	next();
});

app.use((req: ExtendedRequest, res, next) => {
	res.locals.isAuth = req.session.isAuth;
	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use(authRouter);

app.use("/", get404Page);

(async () => {
	await connectToDB();
	// const user = await UserModel.findOne();
	// if (!user) {
	// 	UserModel.create({ name: "test", email: "test@test.com", cart: [] });
	// }
	app.listen(PORT, () => {
		console.log(`server started on localhost:${PORT}`);
	});
})();
