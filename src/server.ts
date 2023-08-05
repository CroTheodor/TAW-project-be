import express from 'express';
import cors from 'cors';
import mongoose = require('mongoose');
import * as user from "./models/user"
import http = require('http');
import { ROLES } from './utils/roles.enum';
require('dotenv').config();
const app = express();
import passport from "passport";
import passportHTTP = require('passport-http');

const PORT = process.env.PORT || 3500


app.use( (req,res,next) => {
  console.log("------------------------------------------------")
  console.log("New request for: "+req.url );
  console.log("Method: "+req.method);
  next();
})
app.use(express.json())
app.use(cors());

app.use('/auth', require('./routes/auth'));
app.use(`/api/v1/employees`, require('./routes/api/v1/employees/employee.service'));

mongoose.connect(process.env.DATABASE_URL as string,{ useUnifiedTopology: true, useNewUrlParser: true}).then(
    ()=> {
        let server = http.createServer(app);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
).catch(
    (err) => {
      console.log("Error Occurred during initialization");
      console.log(err);
    }
)

