import { body, validationResult } from 'express-validator';
import { validatorMiddleware } from '../../middlewares/validatorMiddleware.js';

export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
    validatorMiddleware
];

export const validateRegisterUser = [
    body('name').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
    body('phone').isMobilePhone().withMessage('Invalid phone number')
    .isLength({min : 11, max: 11}).withMessage('Phone number must be exactly 11 numbers'),
    body('role').optional().isIn(['user', 'admin']),
    body('confirmPassword').isLength({min: 6}).withMessage('Confirm Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number')
    .custom((value, { req })=>{
        if(value !== req.body.password){
            throw new Error('Confirm password does not match password', 400);
        };
        return true;

    }),
    validatorMiddleware
];
