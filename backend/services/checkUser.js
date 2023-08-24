import jwt from "jsonwebtoken";
const SECRET = '64TDresr3A4T54hta'

export const checkUser = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer /, '')
        if (!token) throw new Error('No access')
        req.userId = jwt.verify(token, SECRET).userId
        next()
        
    } catch (err) {
        console.log(err);
        res.status(403).json({error:err.message})
    }
}