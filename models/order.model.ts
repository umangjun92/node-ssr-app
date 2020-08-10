import { ObjectId } from "mongodb";
import { CartItem } from "./cart.model";
import { Schema, Document, model, Model } from "mongoose";

async function createOrder(this: IOrderModel, orderDetails: IOrderDocument) {
	return await this.create(orderDetails);
}

async function getOrdersByUserId(this: IOrderModel, userId: Schema.Types.ObjectId) {
	return await this.find({ userId });
}

interface OrderItem {
	productId: Schema.Types.ObjectId;
	quantity: number;
	price: number;
	title: string;
}

interface IOrder {
	items: OrderItem[];
	userId: Schema.Types.ObjectId;
}

export interface IOrderDocument extends IOrder, Document {}

interface IOrderModel extends Model<IOrderDocument, {}> {
	createOrder: typeof createOrder;
	getOrdersByUserId: typeof getOrdersByUserId;
}

const OrderSchema = new Schema<IOrderDocument>({
	items: [
		{
			productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
			quantity: { type: Number, required: true },
			price: { type: Number, required: true },
			title: { type: String, required: true },
		},
	],
	userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

OrderSchema.statics.createOrder = createOrder;
OrderSchema.statics.getOrdersByUserId = getOrdersByUserId;

export const OrderModel = model<IOrderDocument>("Order", OrderSchema) as IOrderModel;

// console.log(OrderSchema.statics.createOrder);

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
