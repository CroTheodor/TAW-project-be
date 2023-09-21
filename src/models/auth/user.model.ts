import { Document, Schema, SchemaTypes, Model, model } from "mongoose";
import  crypto   from "crypto"
import { ROLES } from "../../utils/roles.enum.js";

/**
 * @openapi
 * components:
 *  schemas:
 *      UserDTO:
 *          type: object
 *          required:
 *              - email
 *              - name
 *              - lastname
 *              - roles
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  default: jane.doe@example.com
 *              name:
 *                  type: string
 *                  default: jane
 *              lastname:
 *                  type: string
 *                  default: doe
 *              roles:
 *                   type: string
 *                   example: role1
 *              password:
 *                   type: string
 *                   example: passwordPwd
 */

export interface User extends Document{
    readonly _id: Schema.Types.ObjectId;
    name : string;
    lastname: string;
    email:string;
    roles: ROLES[];
    salt: string,
    digest: string,
    refreshToken?:string,  
    setPassword: (pwd:string)=>void,
    validatePassword: (pwd:string)=>boolean,
    hasRole:(role:ROLES)=>boolean,
    addRole:(role:ROLES)=>boolean,
    verifyRefreshJWT:(jwt:string)=>void,
    setRefreshJwt:(jwt:string)=>void
}

const userSchema = new Schema<User>( {
    name: {
        type: SchemaTypes.String,
        required: true
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique:true
    },
    lastname: {
        type: SchemaTypes.String,
        required: true,
    },
    roles:  {
        type: [SchemaTypes.String],
        required: true 
    },
    salt:  {
        type: SchemaTypes.String,
        required: false 
    },
    digest:  {
        type: SchemaTypes.String,
        required: true 
    },
    refreshToken: {
        type: SchemaTypes.String,
        required:false
    }
})

userSchema.methods.setPassword = function( pwd:string ) {

    this.salt = crypto.randomBytes(16).toString('hex'); 
    const hmac = crypto.createHmac('sha512', this.salt );
    hmac.update( pwd );
    this.digest = hmac.digest('hex'); 

}

userSchema.methods.validatePassword = function( pwd:string ):boolean {
    const hmac = crypto.createHmac('sha512', this.salt );
    hmac.update(pwd);
    const digest = hmac.digest('hex');
    return (this.digest === digest);
}

userSchema.methods.hasRole = function(role:ROLES):boolean{
    return this.roles.includes(role);
}

userSchema.methods.addRole = function(role:ROLES):boolean{
    if(this.roles.includes(role))
        return false;
    this.roles.push(role);
    return true;
}

userSchema.methods.setRefreshJwt = function(jwt:string):void{
    this.refreshToken = jwt;
}

export function getSchema() { return userSchema; }


let userModel: any;
export function getModel() : Model<User>  { 
    if( !userModel ) {
        userModel = model('User', getSchema() )
    }
    return userModel;
}

export function newUser( data : any ): User {
    let _usermodel = getModel();
    let user = new _usermodel( data );

    return user;
}