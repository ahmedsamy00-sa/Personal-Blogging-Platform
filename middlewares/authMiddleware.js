import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "express-async-handler";

export const authMiddleware = asyncHandler(async (req, res, nxt) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return nxt(new ApiError("You are not authenticated! Please login to get access.",401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.jwt_key);
        req.user = decoded;
        nxt();
    } catch (err) {
        return nxt(new ApiError("Invalid or expired token", 401));
    }
});

export const authorizeRoles = (...roles) => {
    return (req, res, nxt) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return nxt(
                new ApiError(
                    "You do not have permission to access this resource",
                    403
                )
            );
        }

        nxt();
    };
};