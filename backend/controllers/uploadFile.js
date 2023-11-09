import { parse } from 'path'
import { rm } from 'fs';
import imageModel from '../models/imageModel.js';

export const uploadImage = async (req, res) => {
    try {
        const files = req.files
        if (files.length == 0) throw new Error("No image file provided");

        const docs = files.map(file => {
            const {originalname, destination, path} = file
            return {
                imageOriginalName: parse(originalname).name,
                imageURL: `${req.protocol}://${req.get('host')}/${path.replace(/\\/g, '/')}`,
                imagePath: destination,
                favorite: false,
                owner: req.userId
            }
        });
        const uploadedImages = await imageModel.insertMany(docs)
        res.json(uploadedImages)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({msg:err.message});
    }
}

export const getAllImages = async (req, res) => {
    try {
        const images = await imageModel.find({owner:req.userId}).populate('owner')
        res.json(images)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:err.message});
    }
}

export const getOneImage = async (req, res) => {
    try {
        const image = await imageModel.findOne({$and:[{owner: req.userId}, {_id: req.params.id}]})
        res.json(image)

    } catch (err) {
        console.log(err);
        res.status(400).json({msg:err.message});
    }
}

export const deleteImage = async (req, res) => {
    try {
        const image = await imageModel.findOne({$and:[{owner: req.userId}, {_id: req.params.id}]})
        if (!image) return res.status(404).json({msg: 'image not found'})
        await imageModel.deleteOne({_id: image._id})
        
        rm(image.imagePath, {recursive:true}, (err) => {if(err) throw new Error(err)})
        
        res.json({msg: 'Image deleted successfully'})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: err.message});
    }
}

export const updateImage = async (req, res) => {
    try {
        const image = await imageModel.findOneAndUpdate({$and:[{owner: req.userId}, {_id: req.params.id}]}, req.body, {new:true})
        res.json(image)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: err.message});
    }
}