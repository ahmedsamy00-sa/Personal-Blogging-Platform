import ApiError from '../utils/ApiError.js';
import asyncHandler from "express-async-handler";
import { Post } from '../models/postModel.js';


// @desc get all users 's posts
// @route GET /api/v1/posts/
// @access Public
export const getPosts = asyncHandler(async(req, res, nxt)=>{
    const posts = await Post.find();
    if(!posts){
        return nxt(new ApiError('No posts found', 400)); 
    }
    res.status(200).json(posts);
});


// @desc Create a post
// @route POST /api/v1/posts/add
// @access Protected
export const addPost = asyncHandler(async(req, res, nxt)=>{
    const data = req.body;
    const userId = req.user.id;

    const post = await Post.create({
        title:data.title,
        content:data.content,
        authorId:userId
    });
    res.status(201).json({message:"Post published successfully",
        data:{
            postId:post.id,
            title:post.title,
            content:post.content,
            authorId: post.authorId
        }
    });
});


// @desc update specific post
// @route PUT /api/v1/posts/:id
// @access protected
export const updatePost = asyncHandler(async(req, res, nxt)=>{
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await Post.findById(postId);
    
    if(!post){
        return nxt(new ApiError('Post not found', 404));
    };

    if(post.authorId.toString() !== userId){
        return nxt(new ApiError('You do not have permission to update this post', 401))
    };

    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {new:true, runValidators:true});
    res.status(200).json({
        status:"success",
        message:"Post updated successfully",
        data:{
            postId:updatedPost.id,
            title:updatedPost.title,
            content:updatedPost.content,
            authorId: updatedPost.authorId
        }
    });
});


// @desc Delete a specific post
// @route DELETE /api/v1/posts/:id
// @access Private
export const deletePost = asyncHandler(async(req, res, nxt)=>{
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await Post.findById(postId);
    
    if(!post){
        return nxt(new ApiError('Post not found', 400));
    };

        if(post.authorId.toString() !== userId){
        return nxt(new ApiError('You do not have permission to delete this post', 401))
    };
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
        status:"success",
        message:"Post deleted successfully",
    });
});