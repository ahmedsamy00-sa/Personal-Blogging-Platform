import { validationResult } from "express-validator";

export const validatorMiddleware = (req, res, nxt)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }
    nxt()
}
