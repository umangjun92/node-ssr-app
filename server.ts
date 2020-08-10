import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { connectToDB } from "./utils/db";
import { adminRouter } from "./routes/admin";
import { shopRouter } from "./routes/shop";
import { RootDir } from "./utils/path";
import { get404Page } from "./controllers/errors.controller";
import { ExtendedRequest } from "./utils/types";
import { UserModel } from "./models/user.model";
// import { User } from "./models/user.model";

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(RootDir, "public")));

app.use(async (req: ExtendedRequest, res, next) => {
	const user = await UserModel.findById("5f2ea51a59423e4390043149");
	try {
		if (user) {
			req.user = user;
		} else {
			console.error("user not found");
		}
		next();
	} catch (e) {
		console.log(e);
		next();
	}
});

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use("/", get404Page);

(async () => {
	await connectToDB();
	const user = await UserModel.findOne();
	if (!user) {
		UserModel.create({ name: "test", email: "test@test.com", cart: [] });
	}
	app.listen(PORT, () => {
		console.log(`server started on localhost:${PORT}`);
	});
})();
