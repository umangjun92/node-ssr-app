import { ObjectId, FilterQuery, UpdateQuery } from "mongodb";

import { getDB } from "../utils/db";
import { CartItem } from "./cart.model";
import { ProductAttributes, Product } from "./product.model";
import { OrderAttributes } from "./order.model";

export interface UserAttributes {
	readonly _id: ObjectId;
	name: string;
	email: string;
	cart: CartItem[];
	orders: OrderAttributes[];
}

export class User implements UserAttributes {
	_id!: ObjectId;
	name!: string;
	email!: string;
	cart: CartItem[];
	orders: OrderAttributes[];

	constructor({ email, name, _id, cart, orders }: UserAttributes) {
		this.name = name;
		this.email = email;
		if (_id) {
			this._id = _id;
		}
		if (cart) {
			this.cart = [...cart];
		}
		if (orders) {
			this.orders = [...orders];
		}
	}

	async save() {
		return await getDB().collection("users").insertOne(this);
	}

	static async findById(id: string): Promise<UserAttributes | null> {
		return await getDB()
			.collection("users")
			.findOne({ _id: new ObjectId(id) });
	}

	async addProductToCart(product: ProductAttributes) {
		const productId = product._id as ObjectId;
		const cartItems = [...this.cart] || [];
		const prodIndex = cartItems.findIndex((item) => item.productId.equals(productId));
		if (prodIndex === -1) {
			cartItems.push({ productId, quantity: 1 });
		} else {
			cartItems[prodIndex].quantity = cartItems[prodIndex].quantity + 1;
		}

		return await getDB()
			.collection("users")
			.updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: cartItems } });
	}

	async getCartWithProductDetails(): Promise<CartItem[]> {
		let cart = this.cart ? [...this.cart] : [];
		if (cart.length > 0) {
			const products = await Product.findAll({ _id: { $in: cart.map((item) => item.productId) } });
			if (products.length !== cart.length) {
				const latestProdIds = products.map((prod) => prod._id?.toHexString());
				this.cart = this.cart.filter((item) => latestProdIds.indexOf(item.productId.toHexString()) !== -1);
				cart = [...this.cart];
			}
			return products.map(({ title, _id, price, imageUrl }) => ({
				productId: _id as ObjectId,
				imageUrl,
				price,
				title,
				quantity: cart.find((item) => item.productId.equals(_id as ObjectId))?.quantity as number,
			}));
		} else {
			return cart;
		}
	}

	async deleteProductFromCart(productId: string) {
		const updatedCart = this.cart?.filter((item) => item.productId.toHexString() !== productId);
		return await getDB()
			.collection("users")
			.updateOne(
				{ _id: new ObjectId(this._id) } as FilterQuery<UserAttributes>,
				{ $set: { cart: updatedCart } } as UpdateQuery<UserAttributes>
			);
	}

	async clearCart() {
		return await getDB()
			.collection("users")
			.updateOne({ _id: this._id }, { $set: { cart: [] } });
	}
}
