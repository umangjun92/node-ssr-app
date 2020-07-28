import path from "path";

export const RootDir = path.dirname((process as any).mainModule.filename);

export const ProductsFilePath = path.join(RootDir, "data", "products.json");

export const CartDataFilePath = path.join(RootDir, "data", "cart-data.json");
