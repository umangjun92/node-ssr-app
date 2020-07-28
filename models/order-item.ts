import { Model, BuildOptions, Sequelize, DataTypes } from "sequelize";

interface OrderItemAttributes {
	id?: number;
	orderId?: number;
	productId?: number;
	quantity: number;
}

export interface OrderItemModel extends Model<OrderItemAttributes>, OrderItemAttributes {}

type OrderItemStatic = typeof Model & { new (value?: object, options?: BuildOptions): OrderItemModel };

export function OrderItemFactory(seq: Sequelize): OrderItemStatic {
	return seq.define(
		"order_item",
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
