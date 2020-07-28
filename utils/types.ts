import { Request } from "express";
import { UserModel } from "../models/user.model";
// import { User } from "../utils/db";

export interface ExtendedRequest extends Request {
	user: UserModel;
}
