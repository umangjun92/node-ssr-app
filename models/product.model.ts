import { getDB } from "../utils/db";
import { ObjectId, FilterQuery } from "mongodb";

export interface ProductAttributes {
	readonly _id?: ObjectId;
	title: string;
	price: number;
	description: string;
	imageUrl: string;
	userId: ObjectId;
}

export class Product implements ProductAttributes {
	readonly _id?: ObjectId;
	title!: string;
	price!: number;
	description!: string;
	imageUrl!: string;
	userId!: ObjectId;

	constructor({ title, description, price, imageUrl, userId }: ProductAttributes) {
		this.title = title;
		this.description = description;
		this.price = price;
		this.imageUrl = imageUrl;
		this.userId = userId;
	}

	async save(): Promise<ProductAttributes[]> {
		const res = await getDB().collection("products").insertOne(this);
		return res.ops;
	}

	static async findAll(query?: FilterQuery<ProductAttributes>): Promise<ProductAttributes[]> {
		return await getDB().collection("products").find(query).toArray();
	}

	static async findById(id: string): Promise<ProductAttributes | null> {
		return await getDB()
			.collection("products")
			.findOne({ _id: new ObjectId(id) });
	}

	static async update(id: string, newProd: ProductAttributes) {
		return await getDB()
			.collection("products")
			.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: newProd });
	}

	static async delete(id: string) {
		return await getDB()
			.collection("products")
			.deleteOne({ _id: new ObjectId(id) });
	}
}
