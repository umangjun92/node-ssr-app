import { Request } from "express";
import { IUserDocument } from "../models/user.model";
// import { User } from "../utils/db";

export interface ExtendedRequest extends Request {
	// user: UserAttributes;
	user: IUserDocument;
}
