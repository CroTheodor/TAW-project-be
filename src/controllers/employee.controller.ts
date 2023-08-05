import * as user from '../models/user';
import { ROLES } from '../utils/roles.enum';

export const getAllEmployees = (req, res)=>{
    const role = req.query.role;
    if(role){
        console.log(role);
        user.getModel().find({roles:role},{digest:0, salt:0, refreshToken:0, __v : 0}).then(
            result=>res.status(200).json(result)
        ).catch(err=>{
            res.sendStatus(404);
        });
        return;
    }
    user.getModel().find({}, {digest:0, salt:0, refreshToken:0, __v : 0}).catch(err=>{
        res.sendStatus(404);
    }).then(
        result=> res.status(200).json(result)
    )
}

export const getAllRoles = (req,res)=>{
    res.json(Object.keys(ROLES));
}

export const getEmployeeById = (req,res)=>{
    const id = req?.params?.id;
    if(!id)
        return res.sendStatus(400);
    user.getModel().findOne({_id:id},{digest:0, salt:0, refreshToken:0, __v : 0}).then(
        employee=>res.json(employee)
    ).catch(err=>{
        console.log(err);
        res.sendStatus(404);
    })
}

export const updateEmployee= (req,res)=>{
    const id = req?.body?.id;
    if(!id){
        return res.status(400).json({message:"Id is required to update employee"});
    }
    const email = req?.body?.email;
    const name = req?.body?.name;
    const lastname = req?.body?.lastname;
    const updateProprieties = {};
    if(email)
        updateProprieties['email'] = email;
    if(name)
        updateProprieties['name'] = name;
    if(lastname)
        updateProprieties['lastname'] = lastname;
    user.getModel().updateOne({_id:id},{$set:{...updateProprieties}})
                    .then(id=>res.json({message:"Employee successfully updated"}))
                    .catch(err=>{
                        console.log(err);
                        res.sendStatus(404);
                    })

}

export const deleteEmployee=(req,res)=>{
    const id = req?.body?.id;
    if(!id){
        return res.status(400).json({message:"Id is required to delete employee"});
    }
    user.getModel().findByIdAndDelete(id).then(employee=>res.json({message:"Employee successfully deleted", id:employee?._id}))
                                        .catch(err=>{
                                            console.log(err);
                                            res.sendStatus(404);
                                        })
}
