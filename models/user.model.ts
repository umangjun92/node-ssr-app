import {
	Model,
	Sequelize,
	ModelCtor,
	DataTypes,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	Association,
	Optional,
	BuildOptions,
	BelongsToCreateAssociationMixin,
} from "sequelize";
// import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { db } from "../utils/db";

// interface UserAttributes {
// 	id: number;
// 	name: string;
// 	email: string;
// 	avatarImgUrl: string;
// }

// interface UserCreationAttributes extends Optional<UserAttributes, "id" | "avatarImgUrl"> {}

// export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
// 	id!: number;
// 	name!: string;
// 	email!: string;
// 	avatarImgUrl!: string;

// 	// timestamps!
// 	readonly createdAt!: Date;
// 	readonly updatedAt!: Date;

// 	createProduct!: HasManyCreateAssociationMixin<Product>;
// 	getProducts!: HasManyGetAssociationsMixin<Product>;

// 	static associations: {
// 		products: Association<User, Product>;
// 	};
// }

// User.init(
// 	{
// 		id: {
// 			type: DataTypes.INTEGER,
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		name: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		email: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		avatarImgUrl: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 	},
// 	{ sequelize: db, schema: "node-course", tableName: "users" }
// );

// // @Table({ schema: "node-course", tableName: "users" })
// // export class User extends Model<User> {
// // 	@Column({
// // 		allowNull: false,
// // 		type: DataType.STRING,
// // 	})
// // 	name: string;

// // 	@Column({
// // 		allowNull: false,
// // 		type: DataType.STRING,
// // 	})
// // 	email: string;

// // 	@Column({
// // 		type: DataType.STRING,
// // 	})
// // 	avatarImgUrl?: string;

// // 	@HasMany(() => Product as any)
// // 	products: Product[];
// // }

interface UserAttributes {
	id?: number;
	name: string;
	email: string;
	avatarImgUrl?: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

// export class User extends Model<UserModel, UserAttributes> {
// 	readonly id!: number;
// 	name!: string;
// 	email!: string;
// 	avatarImgUrl?: string;
// 	// timestamps!
// 	readonly createdAt!: Date;
// 	readonly updatedAt!: Date;

// 	createProduct!: BelongsToCreateAssociationMixin<Product>; // Note the null assertions!
// 	// addProject!: HasManyAddAssociationMixin<Project, number>;
// 	// hasProject!: HasManyHasAssociationMixin<Project, number>;
// 	// countProjects!: HasManyCountAssociationsMixin;
// 	// createProject!: HasManyCreateAssociationMixin<Project>;
// }

type UserStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(seq: Sequelize): UserStatic {
	return seq.define(
		"user",
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			avatarImgUrl: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ schema: "node-course" }
	);
}
