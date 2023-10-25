import mongoose, { Schema } from "mongoose";

const imageModel = new mongoose.Schema({

    imageOriginalName: {
        type: String,
        required: true
    },

    imageURL: {
        type: String,
        required: true,
        unique: true
    },

    imagePath: {
        type: String,
        required: true,
        unique: true
    },

    favorite: {
        type: Boolean,
        required: true,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

}, {timestamps: true})

export default mongoose.model('image', imageModel)