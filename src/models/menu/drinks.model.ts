import { Model, Schema, SchemaTypes, model } from "mongoose";
import { MenuEntry } from "./menuEntry.model";



export interface Drink extends MenuEntry{
    volume: number;
    ingredients?: string[];
}


