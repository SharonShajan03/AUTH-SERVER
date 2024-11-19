const mongoose = require('mongoose')

const conectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(conectionString).then(res=>{
    console.log('mongodb Connected with serverTest ')
}).catch(err=>{
    console.log("mongodb connection failed");
    console.log(err);
    
})