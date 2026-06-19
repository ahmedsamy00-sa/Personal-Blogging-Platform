import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:[true, "Name is required"]
    },

    email:{
        type: String,
        required: [true, "Email is required"],
        unique:[true, "Email must be unique"],
        lowercase: true
    },

    phone:{
        type: String,
        required: [true, "Phone is required"],
        unique:[true, "Phone must be unique"],
    },

    password:{
        type:String,
        required:[true, "Password is required"],
        minLength:[6, "Password must be at least 6 characters long"]
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
{
    timestamps: true
});

export const User = mongoose.model("User", userSchema);
