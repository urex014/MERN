import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
export async function connectDB(){
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongo db connected: ${conn}`)
    }catch{

    }
}