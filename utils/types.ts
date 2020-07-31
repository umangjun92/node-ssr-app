import { Request } from "express";
import { User, UserAttributes } from "../models/user.model";
// import { User } from "../utils/db";

export interface ExtendedRequest extends Request {
	// user: UserAttributes;
	user: User;
}
