function isBalanced(input) {
	if (input.length % 2 !== 0) {
		return false;
	} else {
		const secondHalf = input.slice(input.length / 2);
		secondHalf.replace(/\(|\{|\[/g);
		// if (/* input.slice(0, input.length / 2) === input.slice(input.length / 2) */) {
		// 	// isBalanced(input.slice(0, input.length/2))
		// 	// return true;
		// } else {
		// 	return false;
		// }
	}
}

function alt(input) {
	if (input.length % 2 !== 0) {
		return false;
	} else {
		let opens = [];
		let closes = [];
		for (let i = 0; i < input.length; i++) {
			const openMatch = input[i].match(/\(|\{|\[/);
			const closeMatch = input[i].match(/\)|\}|\]/);
			if (openMatch) {
				opens.push(openMatch[0]);
			} else if (closeMatch) {
				let closeVal = "";
				console.log("closeMatch[0]", closeMatch[0]);
				if (closeMatch[0].match(/\)/)) {
					closeVal = closeMatch[0].replace(/\)/, "(");
				} else if (closeMatch[0].match(/\}/)) {
					closeVal = closeMatch[0].replace(/\}/, "{");
				} else {
					closeVal = closeMatch[0].replace(/\]/, "[");
				}

				// console.log(closeMatch[0].replace(/\]/, "["));
				closes.push(closeVal);
			}
			console.log("opens", opens);
			console.log("closes", closes);
			if (opens[opens.length - 1] === closes[0]) {
				opens.pop();
				closes.shift();
			}
			// input[i].replace(/\(/, ")")
		}
		if (closes.length === 0 && opens.length === 0) {
			return true;
		} else {
			return false;
		}
	}
}

console.log(alt("{[()]{{}}}"));
