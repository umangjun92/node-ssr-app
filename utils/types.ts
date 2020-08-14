import { Request } from "express";
import { IUserDocument } from "../models/user.model";
import csurf from "csurf";
// import { User } from "../utils/db";

interface Session extends Express.Session {
	isAuth: boolean;
	user: IUserDocument;
}

export interface ExtendedRequest extends Request {
	session: Session;
	user: IUserDocument;
}
