import express from 'express';
import cors from 'cors';
import mongoose = require('mongoose');
import {swaggerDocs} from './utils/swagger';
import { routes } from './routes';

const PORT = process.env.PORT || 3500
require('dotenv').config();
const app = express();

app.use( (req,res,next) => {
  console.log("------------------------------------------------")
  console.log("New request for: "+req.url );
  console.log("Method: "+req.method);
  next();
})
app.use(express.json())
app.use(cors());


mongoose.connect(process.env.DATABASE_URL as string,{ useUnifiedTopology: true, useNewUrlParser: true}).then(
    ()=> {
        //let server = http.createServer(app);
        app.listen(PORT, () => {
          routes(app);
          swaggerDocs(app, Number(PORT));
          console.log(`Server running on port ${PORT}`)
        });
    }
).catch(
    (err) => {
      console.log("Error Occurred during initialization");
      console.log(err);
    }
)

