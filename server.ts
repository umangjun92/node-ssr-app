import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { connectToDB } from "./utils/db";
import { adminRouter } from "./routes/admin";
import { shopRouter } from "./routes/shop";
import { RootDir } from "./utils/path";
import { get404Page } from "./controllers/errors.controller";
import { ExtendedRequest } from "./utils/types";
import { User } from "./models/user.model";

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(RootDir, "public")));

// app.use((req: ExtendedRequest, res, next) => {
// User.findById("5f21bf3ec9c929837490dd3e")
// 	.then((user) => {
// 		if (user) {
// 			req.user = new User(user);
// 			next();
// 		} else {
// 			console.error("user not found");
// 			next();
// 		}
// 	})
// 	.catch((e) => console.error(e));
// });

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use("/", get404Page);

(async () => {
	await connectToDB();
	app.listen(PORT, () => {
		console.log(`server started on localhost:${PORT}`);
	});
})();
