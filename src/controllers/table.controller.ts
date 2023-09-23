import * as Table from "../models/tables/tables.model"
import { Response , Request} from "express"


function executeDBQuery(res : Response, queryParams: any){
    Table.getModel().find(queryParams)
                    .then(
                        (el)=>{
                            res.status(200).json(el); 
                        })
                    .catch(
                        (err)=>{
                            console.log(err);
                            return res.sendStatus(404);
                    })
}

export const getTables = (req: Request, res: Response)=>{
    const free = req.query.free;
    console.log(free);
    const queryParams = {}
    if(free === 'true'){
        queryParams['guests'] = 0;
    }
    if(free === "false"){
        queryParams['guests'] = { $gt:0};
    }
    executeDBQuery(res, queryParams);
}

export const getTableById = ( req: Request, res: Response )=>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"Id missing"});
    }
    const queryParams = { _id:id};
    executeDBQuery(res, queryParams);
}

export const updateTable =async ( req: Request, res: Response )=>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"Id missing"});
    }
    const tableUpdated = req.body;
    const table = await Table.getModel().findById(id);
    console.log(table);
    if(tableUpdated.guests){
        table.guests = tableUpdated.guests;
    }
    if(tableUpdated.seats){
        table.seats = tableUpdated.seats;
    }
    if(tableUpdated.tableNumber){
        table.tableNumber = tableUpdated.tableNumber;
    }
    table.save().then(
        ()=>{
            res.status(201).json({message:"Updated table"});
        }
    ).catch(
        (err)=>{
            console.log(err);
            return res.status(404).json({message:"DB error"});
    })
}

export const deleteTable = ( req: Request, res: Response )=>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"Id missing"});
    }
    Table.getModel().findByIdAndDelete(id).then(
        ()=>{
            res.status(200).json({message:"Successfully deleted"});
        }
    ).catch(
        (err)=>{
            console.log(err); 
            res.status(500).json({message:"DB error"});
    })
}

export const resetTable = ( req: Request, res: Response )=>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"Id missing"});
    }
    Table.getModel().updateOne({id}, {$set:{guests:0}}).then(
        ()=>{
            res.status(201);
        }
    ).catch(
        (err)=>{
            console.log(err);
            res.status(404);
    })
}

export const addTable = ( req: Request, res: Response )=> {
    const tableNumber = req.body.tableNumber;
    const seats = req.body.seats;
    if(!tableNumber){
        res.status(400).json({message:"Attribute tableNumber required!"});
    }
    if(!seats){
        res.status(400).json({message:"Attribute seats required!"});
    }
    const table = Table.newItem({seats:seats, tableNumber:tableNumber, guests:0})
    table.save().then(
        (el)=>{
            res.status(201).json({el});
        }).catch(
            (err)=>{
                console.log(err);
                return res.sendStatus(500);
        });
}