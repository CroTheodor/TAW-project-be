import { Schema, Document } from "mongoose";

export interface MenuEntry extends Document{
    readonly _id: Schema.Types.ObjectId;
    name: string;
    price: number;
    description: string;
    picture_url: string;
    available: boolean;
}
