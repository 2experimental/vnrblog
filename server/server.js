const exp = require("express");
const app = exp();
const path=require('path');
require('dotenv').config();//process.env
const mongoose = require("mongoose");
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");
const cors=require('cors')
app.use(cors())

const port = process.env.PORT || 4000;

app.use(exp.static(path.join(__dirname,'../client/dist')));

//db connection
mongoose.connect(process.env.DBURL)
    .then(() => {
        app.listen(port, () => console.log(`server listening on port ${port}..`))
        console.log("DB connection success")
    })
    .catch(err => console.log("Error in DB connection ", err))

//body parser middleware
app.use(exp.json())
//connect API rouites
app.use('/user-api',userApp)
app.use("/author-api",authorApp)
app.use('/admin-api',adminApp)
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
})

//error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler :",err)
    res.send({message:err.message})
})