import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true
    },
    message:{
      type:String,
      required:true
    },
    reply:{
      type:String,
      required:true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);


const Message = mongoose.model("Message", MessageSchema);

export { Message };
