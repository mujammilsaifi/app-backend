import mongoose from "mongoose";
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
   
},{timestamps:true});
export default mongoose.model("Post",postSchema);