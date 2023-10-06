import { body } from "express-validator";

export const userValiadation = [
    body("username", "Username must be at least 1 characters").isLength({min:1}),
    body("email", "Email is incorrect").isEmail(),
    body('password', "Password must be at least 8 characters").isLength({min:8})
]