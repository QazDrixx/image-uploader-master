import jwt from "jsonwebtoken";
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY} from "./env.js";
import tokenModel from "../models/tokenModel.js";


export const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId:userId}, ACCESS_SECRET_KEY, {expiresIn:'30s'})
    const refreshToken  = jwt.sign({userId:userId}, REFRESH_SECRET_KEY, {expiresIn:'30d'})

    return {accessToken, refreshToken}
}

export const saveRefreshToken = async (newRefreshToken, userId, clientUUID) => {
    const tokenData = await tokenModel.findOne({$and:[{userId:userId}, {clientUUID:clientUUID}]})

    if (tokenData) {
        tokenData.refreshToken = newRefreshToken
        return await tokenData.save()
    } else {
        const date = new Date()
        const newToken = new tokenModel({
            refreshToken:newRefreshToken,
            userId:userId,
            clientUUID:clientUUID,
            expireAt:date.setTime(date.getTime() + 3600*24*30)
        })
        return await newToken.save()
    }
}

export const TokenApi = (userId, clientUUID) => {
    const {accessToken, refreshToken} = generateTokens(String(userId))
    saveRefreshToken(refreshToken, userId, clientUUID)

    return {accessToken, refreshToken}

}

export const verifyRefreshToken = (refreshToken) => {
    try {
        return jwt.verify(refreshToken, REFRESH_SECRET_KEY).userId
        
    } catch (err) {
        return null
    }
}

export const findToken = async (refreshToken) => {
    const tokenData = await tokenModel.findOne({refreshToken:refreshToken})
    return tokenData.refreshToken
}

