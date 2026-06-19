import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is required"]
    },
    
    content:{
        type:String,
        required:[true, "Content is required"]
    },
    
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true, "author ID is required"]
    }
},
{
    timestamps:true
});

export const Post = mongoose.model("Post", postSchema);