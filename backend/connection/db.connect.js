import mongoose from "mongoose";
import 'dotenv/config';

const db = async(req, res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB connected Successfully');
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Internal server Error",error})
    }
};


export {db};