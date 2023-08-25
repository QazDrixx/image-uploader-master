import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({path: '../../.env'})

export const checkUser = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer /, '')
        if (!token) throw new Error('No access')
        req.userId = jwt.verify(token, process.env.SECRET_KEY).userId
        next()
        
    } catch (err) {
        console.log(err);
        res.status(403).json({error:err.message})
    }
}