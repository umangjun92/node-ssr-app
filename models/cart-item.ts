import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";

interface CartItemAttributes {
	readonly id?: number;
	quantity: number;
	readonly productId?: number;
	readonly cartId?: number;
}

export interface CartItemModel extends Model<CartItemAttributes>, CartItemAttributes {}

type CartItemStatic = typeof Model & { new (values?: object, options?: BuildOptions): CartItemModel };

export function CartItemFactory(seq: Sequelize): CartItemStatic {
	return seq.define(
		"cart_item",
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
			quantity: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
		},

		{ schema: "node-course" }
	);
}
