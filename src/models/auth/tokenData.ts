import { Schema } from "mongoose";
import { ROLES } from "../../utils/roles.enum";

export interface TokenData{
    name: string;
    lastname: string;
    email: string;
    roles: ROLES[];
    id: Schema.Types.ObjectId;
}