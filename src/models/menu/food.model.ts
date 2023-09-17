import { Model, Schema, SchemaTypes, model } from "mongoose";
import { MenuEntry } from "./menuEntry.model";
import { getSchema } from "../auth/user.model";


export interface Food extends MenuEntry{
    ingredients: string[];
}


const foodSchema = new Schema<Food>(
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
        ingredients: {
            type: [SchemaTypes.String],
            required: true
        },
        available:{
            type: SchemaTypes.Boolean,
            required:true
        }
    }
);


let menuEntry: any;
export function getModel() : Model<Food>  { 
    if( !menuEntry ) {
        menuEntry = model('Food', getSchema() )
    }
    return menuEntry;
}

export function newItem( data : any ): Food {
    let _menuModel = getModel();
    let menu = new _menuModel( data );

    return menu;
}