import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { db, Product, User, Cart, CartItem, Order, OrderItem } from "./utils/db";
import { adminRouter } from "./routes/admin";
import { shopRouter } from "./routes/shop";
import { RootDir } from "./utils/path";
import { get404Page } from "./controllers/errors.controller";
import { ExtendedRequest } from "./utils/types";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(RootDir, "public")));

app.use((req: ExtendedRequest, res, next) => {
	User.findAll({ where: { id: 1 } })
		.then((users) => {
			req.user = users[0];
			next();
		})
		.catch((e) => res.send(e));
});

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use("/", get404Page);

Product.belongsTo(User, { foreignKey: "userId", constraints: true, onDelete: "CASCADE" });
Cart.belongsTo(User);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsTo(User);
Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

// db.sync({ force: true })
db.sync()
	.then(() => User.findAll())
	.then((users) => {
		if (!users || users.length === 0) {
			return User.create({ name: "test1", email: "test@test.com", avatarImgUrl: "dummy" });
		} else {
			return users[0];
		}
	})
	.then((user) => Cart.create({ userId: user.id }))
	.then(() => app.listen(3000).on("listening", () => console.log("server started on port 3000")))
	.catch((e) => console.log(e));
