import { body } from "express-validator";

export const userValiadation = [
    body("fullname", "fullname must be at least 3 characters and not more than 100").isLength({min:3, max:100}),
    body("username", "Username must be at least 3 characters and not more than 100").isLength({min:3, max:100}),
    body("email", "Email is incorrect").isEmail(),
    body('password', "Password must be at least 6 characters").isLength({min:4})
]