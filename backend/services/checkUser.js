import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({path: '../../.env'})

export const checkUser = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer /, '')
    if (!token) return res.status(403).json({msg: "Unauthorized user"})
    console.log(token);
    try {
        req.userId = jwt.verify(token, process.env.SECRET_KEY).userId
        next()
        
    } catch (err) {
        console.log(err);
        res.status(403).json({msg: "Invalid token"})
    }
}