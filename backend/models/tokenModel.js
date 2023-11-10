import mongoose from "mongoose";

const Schema = mongoose.Schema

const tokenModel = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    clientUUID: {
        type:String,
        required: true,
        unique:true
    },
    refreshToken: {
        type:String,
        required: true,
        unique:true
    },
    expireAt: {
        type: Date,
        required:true
    }

}, {timestamps:true})

tokenModel.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.model('tokenModel', tokenModel)