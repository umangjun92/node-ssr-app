import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import { MONGODB_URL } from "../config/db.config";

const SessionMongoDBStore = MongoDBStore(session);

const sessionStore = new SessionMongoDBStore({ uri: MONGODB_URL, collection: "sessions" });

export const sessionMiddleware = session({
	secret: "rn-demo-food-backend_secret-key",
	resave: false,
	saveUninitialized: false,
	store: sessionStore,
});
