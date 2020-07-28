import { readFile } from "fs";

import { ProductsFilePath } from "./path";

export function getProductsFromFile(cb: (err: NodeJS.ErrnoException, data: Buffer) => void) {
	readFile(ProductsFilePath, cb);
}