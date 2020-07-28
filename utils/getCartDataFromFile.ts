import { readFile } from "fs";

import { CartDataFilePath } from "./path";

export function getCartDataFromFile(cb: ( _data: any[]) => void) {
	readFile(CartDataFilePath, (err, data) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(data.toString()));
		}
	});
}
