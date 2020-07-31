import { Model, BuildOptions, Sequelize, DataTypes } from "sequelize";
import { ObjectId } from "mongodb";
import { CartItem } from "./cart.model";

// interface OrderItem {
// 	productId: ObjectId;
// 	quantity: number;
// 	price: number;
// 	title: string;
// }

interface UserAttributes {
	_id: ObjectId;
}

export interface OrderAttributes {
	_id?: ObjectId;
	items: CartItem[];
	user: UserAttributes;
}

export class Order implements OrderAttributes {
	_id?: ObjectId;
	items: CartItem[];
	user: UserAttributes;

	constructor({ items, user, _id }: OrderAttributes) {
		this.items = [...items];
		this.user = user;
		if (_id) {
			this._id = _id;
		}
	}

	async addOrder() {
		// return await getDB().collection("orders").insertOne(this);
	}

	// static async getOrdersByUserId(userId: ObjectId): Promise<OrderAttributes[]> {
	// return await getDB()
	// 	.collection("orders")
	// 	.find({ user: { _id: userId } })
	// 	.toArray();
	// }
}
