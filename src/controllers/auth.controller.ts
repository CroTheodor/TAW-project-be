import { TokenData } from '../models/tokenData';
import { User, getSchema, getModel } from '../models/user';
import * as user from '../models/user';
import { ROLES } from '../utils/roles.enum';
import jsonwebtoken = require('jsonwebtoken');



export const handleLogin = (req , res) => {
    const tokenData :TokenData = {
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email,
        id:req.user.id,
        roles: req.user.roles
    }

    let tokenSigned = jsonwebtoken.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1h"});
    let refreshToken = jsonwebtoken.sign(
        {name:req.user.name, lastname:req.user.lastname},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"1d"}
        )
    user.getModel().findOne({'email': req.user.email}, (err,user : User)=>{
        if(user){
            user.setRefreshJwt(refreshToken);
            user.save();
        }
    });
    res.cookie('refreshToken', refreshToken, 
            {   httpOnly : true, 
                sameSite:'none',
                secure:true, 
                maxAge: 24 * 60 * 60 * 60 * 1000
            });
    res.status(200).json({token:tokenSigned });
}

export const handleRegister=(req,res)=>{
    let u = user.newUser( req.body );
    if( !req.body.password ) {
      return res.status(500).json({error: true, errormessage: "Password field missing"});
    }
    u.setPassword( req.body.password );
    u.save().then( (data) => {
      return res.status(200).json({ error: false, errormessage: "", id: data._id });
    }).catch( (reason) => {
      if( reason.code === 11000 )
        return res.sendStatus(409);
      return  res.status(500).json({ error: true, errormessage: "DB error"});
    })
}

export const handleLogout=(req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.refreshToken)
        return res.sendStatus(204);
    user.getModel().findOne({"id":req.params.id}, (err, u)=>{
        if(u){
            u.refreshToken = "";
            u.save().then(()=>{
                res.clearCookie('refreshToken',
                {   httpOnly : true, 
                    sameSite:'none',
                    secure:true, 
                    maxAge: 24 * 60 * 60 * 60 * 1000
                })
                res.sendStatus(200);
            }).catch((err)=>{
                console.log(err);
                return  res.status(500).json({ error: true, errormessage: "DB error"});
            })
        }
    })
}

export const handleRefreshToken = (req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.refreshToken)
        res.status(404).json({token:''});
    const refreshToken = cookies.refreshToken;
    user.getModel().findOne({refreshToken:refreshToken}, (err, u) =>{
        if(u){
            const tokenData :TokenData = {
                name: u.name,
                lastname: u.lastname,
                email: u.email,
                id:u.id,
                roles:u.roles
            }
        
            let tokenSigned = jsonwebtoken.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1h"});
            let refreshToken = jsonwebtoken.sign(
                {name:u.name, lastname:u.lastname},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:"1d"}
            )
            u.setRefreshJwt(refreshToken);
            res.cookie('refreshToken', refreshToken, 
            {   httpOnly : true, 
                sameSite:'none',
                secure:true, 
                maxAge: 24 * 60 * 60 * 60 * 1000
            });
            u.save().then(()=>{
                return res.status(200).json({token:tokenSigned });
            }).catch(err=>{
                return res.status(500).json({ error: true, errormessage: "DB error"});
            })
        }
        else{
            return res.status(500);
        }
    })
}
