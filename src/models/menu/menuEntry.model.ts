import { Schema, Document, SchemaTypes, Model, model } from "mongoose";

export interface MenuEntry extends Document{
    readonly _id: Schema.Types.ObjectId;
    name: string;
    price: number;
    description: string;
    picture_url: string;
    available: boolean;
    type: string;
    ingredients?: string[];
    volume?: number;
}


const entrySchema = new Schema<MenuEntry>(
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
        picture_url: {
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
        available:{
            type: SchemaTypes.Boolean,
            required:true
        },
        type:{
            type: SchemaTypes.String,
            required: true,
        },
        volume:{
            type: SchemaTypes.Number,
            required: false
        }
    }
);

let menuEntry: Model<MenuEntry>;

export function getSchema(): Schema<MenuEntry>{
    return entrySchema;
}

export function getModel() : Model<MenuEntry>  { 
    if( !menuEntry ) {
        menuEntry = model('MenuEntry', getSchema() )
    }
    return menuEntry;
}

export function newItem( data : any ): MenuEntry {
    let _menuModel = getModel();
    let menu = new _menuModel( data );

    return menu;
}

export const attributesToCheck = {
    drink:["picture_url", "name", "description", "price", "volume"],
    food:["picture_url", "name", "description", "price", "ingredients"],
    dessert:["picture_url", "name", "description", "price"],
}


export const availableTypes = ["drink", "dessert", "food"];