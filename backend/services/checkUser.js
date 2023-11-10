import jwt from "jsonwebtoken";
import { ACCESS_SECRET_KEY } from "./env.js";

export const checkUser = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer /, '')
    if (!token) return res.status(401).json({msg: "Unauthorized user"})

    try {
        req.userId = jwt.verify(token, ACCESS_SECRET_KEY).userId
        next()
        
    } catch (err) {
        console.log(err);
        res.status(404).json({msg: "Invalid token"})
    }
}