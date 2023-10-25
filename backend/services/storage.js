import multer from "multer";
import { randomUUID } from "node:crypto";
import { mkdir } from "node:fs/promises";
import { parse } from 'node:path'

const uploadFolder = 'media/'
export const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const path = `${uploadFolder}${getFolderName()}`
        try {
            await mkdir(path, {recursive:true}, (err) => {if(err) throw err})
        } catch (err){
            console.error(err);
        }
        cb(null, path)
    },

    filename: (req, file, cb) => {
        cb(null, `${randomUUID()}${parse(file.originalname).ext}`)
    },

})

export const fileFilter = (req, file, cb) =>{
    if (file.mimetype.includes('image')) cb(null, true)
    else cb(null, false)
}

function getFolderName() {
    const date = new Date()
    const addZero = (num) => num > 9 ? num : `0${num}`;
    return `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}-${addZero(date.getHours())}-${addZero(date.getMinutes())}_${randomUUID()}`
}