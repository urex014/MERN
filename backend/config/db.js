import mongoose from "mongoose";
export async function connectDB(){
    try{
        const mongo_url = process.env.MONGO_URL;
        const conn = await mongoose.connect(mongo_url);
        console.log(`mongo db connected: ${conn}`)
    }catch(error){
        console.log(`Error:${error}`)
        process.exit(1);
    }
}