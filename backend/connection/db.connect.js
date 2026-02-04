import mongoose from "mongoose";

const db = async(req, res)=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/AI_Chat');
        console.log('DB connected Successfully');
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Internal server Error",error})
    }
};


export {db};