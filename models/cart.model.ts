import { ObjectId } from "mongodb";

export interface CartItem {
	productId: ObjectId;
	quantity: number;
	// title?: string;
	// price?: number;
	// imageUrl?: string;
}
