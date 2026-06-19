import { body, check, validationResult } from 'express-validator';
import { validatorMiddleware } from '../../middlewares/validatorMiddleware.js';

export const addPostValidator = [
    body("title").notEmpty().withMessage("Title is required")
    .isLength({min:3}).withMessage("Post title is too short")
    .isLength({max:32}).withMessage("Post title is long"),
    body("content").notEmpty().withMessage("Content is required")
    .isLength({min:3}).withMessage("Post Content is too short"),
    validatorMiddleware
];

export const deletePostValidator = [
    check("id").isMongoId().withMessage("Invalid post id format"),
    validatorMiddleware
];

export const updatePostValidator = [
    check("id").isMongoId().withMessage("Invalid post id format"),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    validatorMiddleware
];