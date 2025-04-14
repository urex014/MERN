import express from 'express';


const app = express();
app.get("/", (res,req)=>{
    res.send("server is up and running");
})
app.listen(5000, ()=>{
    console.log("this is listening at http://localhost:5000");
})
//WXV27UcUi7g1QMbq