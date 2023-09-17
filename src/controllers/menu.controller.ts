import { MenuEntry } from "../models/menu/menuEntry.model";
import * as Drinks from "../models/menu/drinks.model";
import * as Food from "../models/menu/food.model";
import * as Desserts from "../models/menu/dessert.model";

const attributesToCheck = {
    drinks:["picture", "name", "description", "price", "volume"],
    food:["picture", "name", "description", "price"],
    desserts:["picture", "name", "description", "price"],
}



export const getAvailableItems = async (req, res) =>{
    let food, drinks, desserts;
    try{
        food = await Food.getModel().find({available:true});
        drinks = await Drinks.getModel().find({available:true});
        desserts = await Desserts.getModel().find({available:true});
    }
    catch(err){
        res.sendStatus(404);
        return;
    }
    const menu = {
        food: food,
        drinks: drinks,
        desserts: desserts
    }
    res.status(200).json(menu);
}
export const getAllItems = async (req, res) =>{
    let food, drinks, desserts;
    try{
        food = await Food.getModel().find();
        drinks = await Drinks.getModel().find();
        desserts = await Desserts.getModel().find();
    }
    catch(err){
        res.sendStatus(404);
    }
    const menu = {
        food: food,
        drinks: drinks,
        desserts: desserts
    }
    res.status(200).json(menu);
}

export const addDrink = (req, res) => {
    const item : Drinks.Drink = req.body;
    const attributes = Object.keys(item);
    attributesToCheck.drinks.forEach(
        (attribute : string) => {
            if(!attributes.includes(attribute)){
                return res.status(400).json({message:`Attribute ${attribute} missing`})
            }
        }
    )
    if(!item.available){
        item.available = false;
    }
    const drink : MenuEntry = Drinks.newItem(item);
    console.log(drink);
    drink.save().then(
        (el) =>{
            res.status(200).json({message : `Success, ${el} added to the DB`});
        }
    ).catch(
        err =>{
            console.log(err);
            return res.sendStatus(400);
    })
}

