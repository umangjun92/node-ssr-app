import {
	Model,
	Sequelize,
	DataTypes,
	BelongsToCreateAssociationMixin,
	Association,
	Optional,
	BuildOptions,
} from "sequelize";
import { UserModel } from "./user.model";
// // import { Product } from "../utils/db";
// // import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
// import { User } from "./user.model";

// interface ProductAttributes {
// 	id: number;
// 	title: string;
// 	price: number;
// 	imageUrl: string;
// 	description: string;
// 	UserId: number;
// }

// interface ProductCreationAttributes extends Optional<ProductAttributes, "id" | "UserId"> {}

// export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
// 	readonly id!: number;
// 	title!: string;
// 	price!: number;
// 	imageUrl: string;
// 	description!: string;
// 	readonly UserId!: number;

// 	// timestamps!
// 	readonly createdAt!: Date;
// 	readonly updatedAt!: Date;

// 	// createProduct!: BelongsToCreateAssociationMixin<User>; // Note the null assertions!
// 	// addProject!: HasManyAddAssociationMixin<Project, number>;
// 	// hasProject!: HasManyHasAssociationMixin<Project, number>;
// 	// countProjects!: HasManyCountAssociationsMixin;
// 	// createProject!: HasManyCreateAssociationMixin<Project>;
// }

// type ProductStatic = typeof sequelize.Model & {
// 	new (values?: object, options?: sequelize.BuildOptions): ProductModel;
// };

// Product.init(
// 	{
// 		id: {
// 			primaryKey: true,
// 			autoIncrement: true,
// 			type: DataTypes.INTEGER.UNSIGNED,
// 			allowNull: false,
// 		},
// 		title: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		price: {
// 			type: DataTypes.DOUBLE,
// 			allowNull: false,
// 		},
// 		imageUrl: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		description: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		UserId: {
// 			type: DataTypes.INTEGER.UNSIGNED,
// 		},
// 	},
// 	{ sequelize: db, tableName: "products", schema: "node-course" }
// );
interface ProductAttributes {
	readonly id?: number;
	title: string;
	price: number;
	imageUrl: string;
	description: string;
	readonly userId?: number;
}

export interface ProductModel extends Model<ProductAttributes>, ProductAttributes {}

// export class Product extends Model<ProductModel, ProductAttributes> {
// 	// timestamps!
// 	readonly createdAt!: Date;
// 	readonly updatedAt!: Date;

// 	// createProduct!: BelongsToCreateAssociationMixin<UserModel>; // Note the null assertions!
// 	// addProject!: HasManyAddAssociationMixin<Project, number>;
// 	// hasProject!: HasManyHasAssociationMixin<Project, number>;
// 	// countProjects!: HasManyCountAssociationsMixin;
// 	// createProject!: HasManyCreateAssociationMixin<Project>;
// }

type ProductStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): ProductModel;
};

export function ProductFactory(seq: Sequelize): ProductStatic {
	return seq.define(
		"product",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				unique: true,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			schema: "node-course",
		}
	);
}

// // export const Product = db.define("product", {});

// // import { writeFile } from "fs";
// // import { db } from "../utils/db";
// // import { v4 as uuid } from "uuid";

// // import { RootDir, ProductsFilePath } from "../utils/path";
// // import { getProductsFromFile } from "../utils/getProductsFromFile";
// // import { QueryResult } from "pg";

// // interface IProduct {
// // 	id?: string;
// // 	title?: string;
// // 	imageUrl?: string;
// // 	price?: number;
// // 	description?: string;
// // }

// // export class Product implements IProduct {
// // 	id: string;
// // 	title: string;
// // 	imageUrl: string;
// // 	price: number;
// // 	description: string;

// // 	constructor(_title: string, _imageUrl: string, _price: number, _description: string) {
// // 		this.id = uuid();
// // 		this.title = _title;
// // 		this.imageUrl = _imageUrl;
// // 		this.price = _price;
// // 		this.description = _description;
// // 	}

// // 	save() {
// // 		return db.query(
// // 			`INSERT INTO "node-course".products (title, price, "imageUrl", description) VALUES ($1, $2, $3, $4)`,
// // 			[this.title, this.price, this.imageUrl, this.description]
// // 		);
// // 		// getProductsFromFile((err, data) => {
// // 		// 	let products = [];
// // 		// 	if (!err) {
// // 		// 		products = JSON.parse(data.toString());
// // 		// 	}
// // 		// 	products.push(this);
// // 		// 	writeFile(ProductsFilePath, JSON.stringify(products), (err) => {
// // 		// 		err && console.log(err);
// // 		// 	});
// // 		// });
// // 	}

// // 	static getAllProducts(): Promise<Product[]> {
// // 		return db.f
// // 	}

// // 	static getProductById(id: string): Promise<IProduct> {
// // 		return db
// // 			.query(`SELECT * FROM "node-course".products WHERE id = $1`, [id])
// // 			.then((res) => res.rows[0])
// // 			.catch((e) => e);
// // 		// getProductsFromFile((err, data) => {
// // 		// 	if (err) {
// // 		// 		cb();
// // 		// 	} else {
// // 		// 		cb(JSON.parse(data.toString()).find((prod: IProduct) => prod.id === id));
// // 		// 	}
// // 		// });
// // 	}

// // 	static editProductById(id: string, newData: IProduct, cb: (_data?: IProduct[]) => void) {
// // 		getProductsFromFile((err, data) => {
// // 			if (err) {
// // 				cb();
// // 			} else {
// // 				const products = JSON.parse(data.toString());
// // 				const newProducts = products.map((prod) => (prod.id === id ? { ...prod, ...newData } : prod));
// // 				writeFile(ProductsFilePath, JSON.stringify(newProducts), (err) => {
// // 					!err && cb(newProducts);
// // 				});
// // 			}
// // 		});
// // 	}

// // 	static deleteProductById(id: string, cb: () => void) {
// // 		getProductsFromFile((err, data) => {
// // 			if (err) {
// // 				cb();
// // 			} else {
// // 				const products = JSON.parse(data.toString());
// // 				const newProducts = products.filter((prod) => prod.id !== id);
// // 				writeFile(ProductsFilePath, JSON.stringify(newProducts), (err) => {
// // 					!err && cb();
// // 				});
// // 			}
// // 		});
// // 	}
// // }
