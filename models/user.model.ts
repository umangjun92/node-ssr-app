import { Document, model, Schema } from "mongoose";

import { CartItem } from "./cart.model";
import { OrderAttributes } from "./order.model";
import { IProductDocument, IProductModel } from "./product.model";

async function addToCart(this: IUserDocument, product: IProductDocument) {
	const cartProductIndex = this.cart.findIndex((item) => item.productId.equals(product._id));
	if (cartProductIndex === -1) {
		this.cart.push({ productId: product._id, quantity: 1 });
	} else {
		this.cart[cartProductIndex].quantity = this.cart[cartProductIndex].quantity + 1;
	}
	return this.save();
}

async function getCart(this: IUserDocument) {
	const userWithCart = await this.populate("cart.productId").execPopulate();

	return userWithCart.cart.map(({ productId, quantity }) => {
		const { description, id, imageUrl, price, title } = (productId as unknown) as IProductDocument;
		return { description, productId: id, imageUrl, price, quantity, title };
	});
}

async function deleteCartItem(this: IUserDocument, productId: string) {
	this.cart = this.cart.filter((item) => !item.productId.equals(productId));
	console.log("filteredc cart", this.cart);
	return await this.save();
	// console.log(filteredCart);
	// return filteredCart;
}

async function clearCart(this: IUserDocument) {
	this.cart = [];
	return await this.save();
}

interface IUser {
	name: string;
	email: string;
	password: string;
	cart: CartItem[];
	// orders: OrderAttributes[];
}
export interface IUserDocument extends IUser, Document {
	addToCart: typeof addToCart;
	getCart: typeof getCart;
	deleteCartItem: typeof deleteCartItem;
	clearCart: typeof clearCart;
}

const UserSchema = new Schema<IUserDocument>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cart: [
		{
			productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
			quantity: { type: Number, required: true },
		},
	],
});

UserSchema.methods.addToCart = addToCart;
UserSchema.methods.getCart = getCart;
UserSchema.methods.deleteCartItem = deleteCartItem;
UserSchema.methods.clearCart = clearCart;

// export async function addToCart(this: IUserDocument, product: IProductDocument) {
// 	const cartProductIndex = this.cart.findIndex((item) => item.productId.equals(product._id));
// 	if (cartProductIndex !== -1) {
// 		this.cart.push({ productId: product._id, quantity: 1 });
// 	} else {
// 		this.cart[cartProductIndex].quantity = this.cart[cartProductIndex].quantity + 1;
// 	}
// 	this.save();
// 	// this.addToCart()
// }

export const UserModel = model<IUserDocument>("User", UserSchema);
