import bcrypt from "bcrypt";
import userSchema from "../models/userModel.js";
import { validationResult } from "express-validator";
import { TokenApi, verifyRefreshToken, findeRefreshToken, deleteRefreshToken } from "../services/tokenService.js";
import { randomUUID } from "node:crypto";


export const userRegistration = async (req, res) => {
    try {
        const validate = validationResult(req)
        if (!validate.isEmpty()) return res.status(400).json({msg: 'Incorrect email/username or password'})
        const { username, email, password } = req.body
        
        const userExist = await userSchema.exists({$or:[{username:username}, {email:email}]})
        if (userExist) return res.status(400).json({msg: 'Such user already exist'});

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const doc = new userSchema({
            username: username,
            email: email,
            password: passwordHash
        })

        const user = await doc.save()

        const clientUUID = randomUUID() 
        const {accessToken, refreshToken} = TokenApi(user._id, clientUUID)
        res.cookie('clientUUID', clientUUID, {maxAge: 3600*24*30, httpOnly:true})
        res.cookie('refreshToken', refreshToken, {maxAge: 3600*24*30, httpOnly:true})
        res.send({...user._doc, accessToken})

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

        const clientUUID = randomUUID() 
        const {accessToken, refreshToken} = TokenApi(user._id, clientUUID)
        res.cookie('clientUUID', clientUUID, {maxAge: 3600*24*30, httpOnly:true})
        res.cookie('refreshToken', refreshToken, {maxAge: 3600*24*30, httpOnly:true})

        res.json({...user._doc, accessToken})

    } catch (err) { 
        console.log(err);
        res.status(403).json({msg:'Incorect email/username or password'})
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await userSchema.findById(req.userId)
        if(!user) return res.status(404).json({msg:'User not found'})
        // const {accessToken} = generateTokens(user._id)
        res.json({...user._doc})

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"})
    }
}

export const refresh = async (req, res) => {
    try {
        const {refreshToken, clientUUID} = req.cookies

        if (!refreshToken || !clientUUID) return res.status(401).json({msg: "Unauthorized user"})

        const userId = verifyRefreshToken(refreshToken)
        const tokenFromDB = await findeRefreshToken(refreshToken)

        if (!userId || !tokenFromDB) return res.status(401).json({msg: "Unauthorized user"})

        const newTokens = TokenApi(userId, clientUUID)
        console.log(newTokens);
        res.cookie('refreshToken', newTokens.refreshToken, {maxAge: 3600*24*30, httpOnly:true})
        res.json({accessToken:newTokens.accessToken})

       
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"})
    }
}

export const logout = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        
        await deleteRefreshToken(refreshToken)
        res.clearCookie('refreshToken')
        res.clearCookie('clientUUID')
            
        return res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Something went wrong"})
    }
}