export function parseCookie(cookie: string | undefined) {
	const cookieObj = {};
	cookie?.split(";").forEach((item) => {
		const [key, value] = item.trim().split("=");
		cookieObj[key] = value;
	});
	return cookieObj;
}
