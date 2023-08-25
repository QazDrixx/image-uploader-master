import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../models/userModel.js";
import { validationResult } from "express-validator";
import { config } from "dotenv";

config({path: '../../.env'})

export const userRegistration = async (req, res) => {
    try {
        const validate = validationResult(req)
        if (!validate.isEmpty()) return res.status(400).json({msg: 'Incorrect email/username or password'})
        
        const {fullname, username, email, password} = req.body
        
        const userExist = await userSchema.exists({$or:[{username:username}, {email:email}]})
        if (userExist) return res.status(400).json({msg: 'Such user already exist'});

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const doc = new userSchema({
            fullname: fullname,
            username: username,
            email: email,
            password: passwordHash
        })

        const user = await doc.save()
        
        const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:'14d'})
        res.send({...user._doc, token})

    } catch(err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"})
    }
}

export const userLogin = async (req, res) => {
    try {
        const {emailOrUsername, password} = req.body
        const user = await userSchema.findOne({$or:[{username:emailOrUsername}, {email:emailOrUsername}]}).orFail('User not found')

        if (!await bcrypt.compare(password, user.password)) throw new Error('Incorrect password')
        const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:'14d'})
        res.json({...user._doc, token})

    } catch (err) {
        console.log(err);
        res.status(403).json({msg:'Incorect email/username or password'})
    }

}

export const getUser = async (req, res) => {
    try {
        const user = await userSchema.findById(req.userId)
        if(!user) return res.status(404).json({msg:'User not found'})
        const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:'14d'})
        res.json({...user._doc, token})

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"})
    }
}