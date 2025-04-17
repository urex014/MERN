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
        return res.status(400).json({success:false, message:"you cant leave this blank"});
    }
    const newProduct=new Product(product);//get from our db
    

    try{
        await newProduct.save();
        res.status(201).json({succes:true,  data: newProduct});
    }catch(error){
        console.error(`error in adding product: ${error}`);
        res.status(500).json({sucess:false, message:"server error"});
    }
})
//im creating a new app.something to delete items
app.delete('/api/products/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"deleted successfully"});
    }catch(error){
        console.error(`this shit failed: ${error}`);
        res.status(500).json({success:false, message:"product not found"});
    }
})
//another endpoint to colelct from db and show the user 
app.get('/api/products', async (req,res)=>{
    try{
        const products = await Product.find({}) ;
        res.status(200).json({message:`${products}`, succes:true});
        console.log("it worked");
    }catch(error){
        res.status(500).json({success:false, message:"couldn'tt find product"});
    }
});
app.put('api/products/:id', async(req,res)=>{
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"invalid product", success:false});
    }
    try{
        const updatedProduct = await product.findByIdAndUpdate(id,product, {new:true});
        res.status(200).json({
            message:`${updatedProduct}`,
            success:true
        })
    }catch(error){
        res.status(500).json({message:'failed', success:false})
        console.log(`error:${error}`);
    }
})
//console.log(process.env.MONGO_URL)
app.listen(5000, ()=>{
    connectDB()
    console.log("this is listening at http://localhost:5000/products");
})
