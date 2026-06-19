import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


// @desc register a new user
// @route POST /api/v1/auth/register
// @access Public
export const registerUser = asyncHandler(async(req, res, nxt) =>{
    const data = req.body;
    const userExists = await User.find({
        $or:[
            {email:data.email},
            {phone:data.phone}]
    });
    if(userExists.length){
        return nxt(new ApiError('Invalid Email or phone number'), 400);
    };

    if(data.password !== data.confirmPassword){
        return nxt( new ApiError('Password and Confirm password do not match'), 400);
    };

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser = await User.create({
        name:data.name,
        email:data.email,
        phone:data.phone,
        password:hashedPassword
    });
    const token = jwt.sign({id:newUser.id, email:newUser.email, role:newUser.role}, process.env.jwt_key,{ expiresIn: '1h'});
    res.status(201).json({
        status:"success",
        message:"User signed up successfully",
        data:{
            user:{
                id:newUser.id,
                name:newUser.name,
                email:newUser.email,
                phone:newUser.phone
            },
            token: token
        }
    });
});


// @desc login a user
// @route POST /api/v1/auth/login
// @access Public
export const loginUser = asyncHandler(async(req, res, nxt) =>{
    const {email, password} = req.body;
    const user = await User.find({email});
    if(!user.length){
        return nxt(new ApiError('Invalid Email or Password', 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if(!isPasswordValid){
        return nxt(new ApiError('Invalid Email or Password', 400));
    }

    const token = jwt.sign({id:user[0].id, email:user[0].email, role:user[0].role}, process.env.jwt_key, { expiresIn:'1h' });
    res.status(200).json({
        status:"success",
        message:"User logged in successfully",
        data:{
            user:{
                id:user[0].id,
                name:user[0].name,
                email:user[0].email,
                phone:user[0].phone
            },
            token: token
        },
    });
});