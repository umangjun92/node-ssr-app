import { Model, BuildOptions, Sequelize, DataTypes } from "sequelize";

interface CartAttributes {
	readonly id?: number;
	userId?: number;
}

export interface CartModel extends Model<CartAttributes>, CartAttributes {}

type CartStatic = typeof Model & { new (values?: object, options?: BuildOptions): CartModel };

export function CartFactory(seq: Sequelize): CartStatic {
	return seq.define(
		"cart",
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
		},
		{ schema: "node-course" }
	);
}

// import { getCartDataFromFile } from "../utils/getCartDataFromFile";
// import { writeFile } from "fs";
// import { CartDataFilePath } from "../utils/path";

// const CartData = [];

// interface ICartItem {
// 	id?: string;
// 	quantity?: number;
// }

// export class CartItem implements ICartItem {
// 	id: ICartItem["id"];
// 	quantity: ICartItem["quantity"];

// 	constructor(id: string, quantity: number, cb: (data: any[]) => void) {
// 		this.id = id;
// 		this.quantity = quantity;
// 		this._save(cb);
// 	}

// 	private _save(cb: (data: ICartItem[]) => void) {
// 		let cart: ICartItem[];
// 		getCartDataFromFile((cartData: ICartItem[]) => {
// 			cart = [...cartData];
// 			const indexForCurrentId = cart.findIndex((item) => item.id === this.id);
// 			if (indexForCurrentId !== -1) {
// 				cart[indexForCurrentId].quantity = this.quantity || (cart[indexForCurrentId] as any).quantity + 1;
// 			} else {
// 				cart.push({ id: this.id, quantity: this.quantity || 1 });
// 			}
// 			writeFile(CartDataFilePath, JSON.stringify(cart), (err) => {
// 				err && console.log(err);
// 				cb(cart);
// 			});
// 		});
// 	}
// }

// export function getAllCartItems(cb: (data: CartItem[]) => void) {
// 	getCartDataFromFile(cb);
// }

// export function getCartItemById(id: string, cb: (data: CartItem) => void) {
// 	getCartDataFromFile((cartData: CartItem[]) => {
// 		// cb(cartData.find((item) => item.id === id));
// 	});
// }
