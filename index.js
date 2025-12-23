import express from "express"
import dotenv from './config/dotenv.js';
import router from "./routers/index.js";
import bodyParser from "body-parser";
import db from "./config/db.js";
import cookieParser from "cookie-parser";
import flash from "connect-flash/lib/flash.js";
import session from "express-session";

const app = express();
const port = dotenv.PORT || 3000;

app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    secret : 'dax',
    resave : false,
    saveUninitialized : true
}));
app.use('/uploads' , express.static('uploads'));
app.use(flash());


app.use('/',router);


app.listen(port , (err)=>{
    if(!err){
        console.log(`server started http://localhost:${port}`);
    }
})