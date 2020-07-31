import mongoose from "mongoose";

export async function connectToDB() {
	return await mongoose.connect("mongodb://127.0.0.1:27017/node-course?compressors=zlib&gssapiServiceName=mongodb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		useCreateIndex: true,
	});
}

// let _db: mongodb.Db;

// export function mongoConnect(cb: (client: mongodb.MongoClient) => void) {
// 	MongoClient.connect("mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb", {
// 		useUnifiedTopology: true,
// 	})
// 		.then((client) => {
// 			console.log("connected to mongoDB");
// 			_db = client.db("node-course");
// 			cb(client);
// 		})
// 		.catch((e) => console.log(e));
// }

// export function getDB() {
// 	if (_db) {
// 		return _db;
// 	} else {
// 		throw "No Database found!";
// 	}
// }
