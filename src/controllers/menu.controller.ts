import * as Menu from "../models/menu/menuEntry.model";
import { attributesToCheck } from '../models/menu/menuEntry.model';



function executeDBQuery(queryFilters, res){
    console.log(queryFilters);
    Menu.getModel().find(queryFilters).then(
        (result: Menu.MenuEntry[])=>{
            let menu = {}
            for(let i = 0; i < result.length; i++){
                if(!menu[result[i].type!]){
                    menu[result[i].type!] = new Array<Menu.MenuEntry>
                }
                menu[result[i].type!].push(result[i]!);
            }
            res.status(200).json(menu);
        }
    ).catch(
        err =>{
            console.error(err);
            return res.sendStatus(404);
        }
    )
}

export const getAvailableItems = async (req, res) =>{
    const type = req.query.type;
    let queryFilters = {available: true};
    if(type){
        queryFilters['type'] = type;
    }
    executeDBQuery(queryFilters, res);
}

export const getAllItems = async (req, res) =>{
    const type = req.query.type;
    const queryFilters = {}
    if(type){
        queryFilters['type'] = type;
    }
    executeDBQuery(queryFilters, res);
}

export const addItem = (req, res) => {
    const item : Menu.MenuEntry = req.body;
    
    if(!item.type){
        return res.status(400).json({message:"Attribute type is missing"});
    }
    if(!Menu.availableTypes.includes(item.type)){
        return res.status(400).json({message:"The type is not allowed"})
    }
    const attributes = Object.keys(item);
    const attributesToCheck = Menu.attributesToCheck[item.type];
    let missingAttribute = "";
    attributesToCheck.forEach(
        (attribute : string) => {
            if(!attributes.includes(attribute)){
                missingAttribute = attribute;
            }
        }
    )
    if(missingAttribute.length > 0){
        return res.status(400).json({"message":`Attribute ${missingAttribute} is missing.`})
    }
    if(!item.available){
        item.available = false;
    }
    const entry : Menu.MenuEntry = Menu.newItem(item);
    console.log(entry);
    entry.save().then(
        (el) =>{
            res.status(200).json({message : `Success, ${el} added to the DB`});
        }
    ).catch(
        err =>{
            console.error(err);
            return res.status(400).json({message:"Error connecting to the DB"});
    })
}


export const updateItem = async (req, res) =>{
    const id = req.params.id;
    if(!id){
        return res.sendStatus(400);
    }
    let item = {...req.body}
    if(Object.keys(item).includes("type")){
        return res.status(400).json({"message":"Cannot change the type of menu item"});
    }
    delete item.id;
    Menu.getModel().updateOne({_id:id}, {$set:{...item}}).then(
        el=>
        {return res.sendStatus(200)}
    ).catch(
        err=> {
            console.log(err);
            return res.sendStatus(400);
        }
    )
}

export const deleteItem = (req, res)=>{
    const id = req.params.id;
    Menu.getModel().deleteOne({_id:id}).then(
        el=>{
            return res.status(200).json(el);
        }
    ).catch(
        err=>{
            console.error(err);
            return res.sendStatus(404);
        }
    )
}

export const getById = (req,res)=>{
    const id = req.params.id;
    Menu.getModel().findById(id).then(
        el=>{
            return res.status(200).json(el);
        }
    ).catch(err=>{
        console.error(err);
        return res.sendStatus(404);
    })
}

