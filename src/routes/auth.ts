import express from "express";
import { handleLogin, handleLogout, handleRefreshToken, handleRegister } from '../controllers/auth.controller';
import passport from "passport";
import passportHTTP = require('passport-http');
import { User } from "../models/auth/user.model";
import * as user from '../models/auth/user.model';

 
const router = express.Router();

passport.use(new passportHTTP.BasicStrategy(
    function(username, password, done : any) {
  
      console.log("New login attempt from " + username );
      user.getModel().findOne( {email: username} , (err : any, user : any)=>{
        if( err ) {
          console.log(err);  
          return done( {statusCode: 500, error: true, errormessage:err} );
        }
  
        if( !user ) {
          return done(null,false,{statusCode: 500, error: true, errormessage:"Invalid user"});
        }
  
        if( user.validatePassword( password ) ) {
          return done(null, user);
        }
  
        return done(null,false,{statusCode: 500, error: true, errormessage:"Invalid password"});
      })
    }
  ));


router.get('/login', passport.authenticate('basic', { session: false, failWithError:true}), handleLogin );
router.post('/register', handleRegister);
router.get('/refresh', handleRefreshToken);
router.get('/logout/:id', handleLogout);

module.exports = router;