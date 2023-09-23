import { Model, Schema, SchemaTypes, model } from "mongoose";
import { MenuEntry } from "./menuEntry.model";
import { getSchema } from "../auth/user.model";


export interface Food extends MenuEntry{
    ingredients: string[];
}

