import { Model, BuildOptions, Sequelize, DataTypes } from "sequelize";

interface OrderAttributes {
	id?: number;
	userId?: number;
}

export interface OrderModel extends Model<OrderAttributes>, OrderAttributes {}

type OrderStatic = typeof Model & { new (value?: object, options?: BuildOptions): OrderModel };

export function OrderFactory(seq: Sequelize): OrderStatic {
	return seq.define(
		"order",
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
