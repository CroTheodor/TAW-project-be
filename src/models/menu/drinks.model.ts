import { Model, Schema, SchemaTypes, model } from "mongoose";
import { MenuEntry } from "./menuEntry.model";



export interface Drink extends MenuEntry{
    volume: number;
    ingredients?: string[];
}


const drinkSchema = new Schema<Drink>(
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
            required: false
        },
        volume: {
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

export function getSchema(): Schema<Drink>{
    return drinkSchema;
}

export function getModel() : Model<Drink>  { 
    if( !menuEntry ) {
        menuEntry = model('Drink', getSchema() )
    }
    return menuEntry;
}

export function newItem( data : any ): Drink {
    let _menuModel = getModel();
    let menu = new _menuModel( data );

    return menu;
}