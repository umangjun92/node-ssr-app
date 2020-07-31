import { ObjectId } from "mongodb";
import { ProductAttributes } from "./product.model";

export interface CartItem {
	productId: ObjectId;
	quantity: number;
	title?: string;
	price?: number;
	imageUrl?: string;
}
