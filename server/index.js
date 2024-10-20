import express from 'express';//import means we are using type module so we have to write in package.json "type":"module"
import Connection from './db/db.js';
import Route from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const app =express();
app.use(cors());
app.use(bodyParser.json({extended:true}));

app.use(bodyParser.urlencoded({extended:true}));


app.use('/',Route);

Connection();


const port=8000;
app.listen(port,()=>{
    console.log(`server started successfully on port ${port}`)
})