import { Model, Schema, SchemaTypes, model } from "mongoose";
import { MenuEntry } from "./menuEntry.model";
import { getSchema } from "../auth/user.model";

export interface Dessert extends MenuEntry{
}


const dessertSchema = new Schema<Dessert>(
    {
        name: {
            type: SchemaTypes.String,
            required: true,
            unique: true
        },
        description: {
            type: SchemaTypes.String,
            required: true
        },
        picture: {
            type: SchemaTypes.String,
            required: true
        },
        price: {
            type: SchemaTypes.Number,
            required: true
        },
        available:{
            type: SchemaTypes.Boolean,
            required:true
        }
    }
);


let menuEntry: any;
export function getModel() : Model<Dessert>  { 
    if( !menuEntry ) {
        menuEntry = model('Dessert', getSchema() )
    }
    return menuEntry;
}

export function newItem( data : any ): Dessert {
    let _menuModel = getModel();
    let menu = new _menuModel( data );

    return menu;
}