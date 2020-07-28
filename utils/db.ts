// import { Sequelize } from "sequelize-typescript";
import { Sequelize } from "sequelize";
import { UserFactory } from "../models/user.model";
import { ProductFactory } from "../models/product.model";
import { CartFactory } from "../models/cart.model";
import { CartItemFactory } from "../models/cart-item";
import { OrderFactory } from "../models/order";
import { OrderItemFactory } from "../models/order-item";

// import path from "path";
// import { Product } from "../models/product.model";
// import { User } from "../models/user.model";
// import { ProductFactory } from "../models/product.model";
// import { UserFactory } from "../models/user.model";

export const db = new Sequelize({
	database: "postgres",
	username: "postgres",
	password: "postgres123",
	dialect: "postgres",
	// models: [path.join(__dirname, "models")],
});

// db.addModels([User, Product]);

export const Product = ProductFactory(db);
export const User = UserFactory(db);
export const Cart = CartFactory(db);
export const CartItem = CartItemFactory(db);
export const Order = OrderFactory(db);
export const OrderItem = OrderItemFactory(db);
// Product.a;

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);

// import pg from "pg";

// export const pool = new pg.Pool({
// 	host: "localhost",
// 	port: 5432,
// 	user: "postgres",
// 	database: "postgres",
// 	password: "postgres123",
// 	// connectionString: "postgres://postgres:postgres123@localhost:5432/",
// 	// Promise:
// });
