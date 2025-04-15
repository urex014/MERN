import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
dotenv.config();
import Product from './models/product.model.js';

const app = express();
app.use(express.json());
app.post("/api/products", async (req,res)=>{//this app.something is to add items
    const product = req.body;
    if(!product.name || !product.image || !product.price){
        return res.status(400).json({success:false, message:"you cant leave this blank"})
    }
    const newProduct=new Product(product);
    

    try{
        await newProduct.save();
        res.status(201).json({succes:true,  data: newProduct});
    }catch(error){
        console.error(`error in adding product: ${error}`);
        res.status(500).json({sucess:false, message:"server error"});
    }
})
//im creating a new app.something to delete items
app.delete('/api/products/id:', (req,res)=>{
    const {id} = req.params
    console.log(`id:${id}`)
})
//console.log(process.env.MONGO_URL)
app.listen(5000, ()=>{
    connectDB()
    console.log("this is listening at http://localhost:5000/products");
})
//WXV27UcUi7g1QMbq