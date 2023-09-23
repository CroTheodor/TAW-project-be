import { Model, Schema, model, Document } from "mongoose";
import { MenuEntry } from "../menu/menuEntry.model";

export interface Table extends Document{
    readonly _id: Schema.Types.ObjectId;
    seats: number;
    guests: number;
    tableNumber: number;
}

const tableSchema = new Schema<Table>(
    {
        seats:{
            required: true,
            type:Schema.Types.Number
        },
        guests:{
            required: true,
            type:Schema.Types.Number
        },
        tableNumber:{
            required:true,
            unique:true,
            type:Schema.Types.Number
        }
    }
)

let table: Model<Table>;

export function getSchema(): Schema<Table>{
    return tableSchema;
}

export function getModel() : Model<Table>  { 
    if( !table ) {
        table = model('Table', getSchema() )
    }
    return table;
}

export function newItem( data : any ): Table {
    let _tableModel = getModel();
    let t = new _tableModel( data );

    return t;
}