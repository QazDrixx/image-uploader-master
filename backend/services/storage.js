import multer from "multer";
import { randomUUID } from "node:crypto";
import { mkdir } from "node:fs/promises";
import { parse } from 'node:path'

const uploadFolder = 'media/'
export const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const path = `${uploadFolder}`
        try {
            await mkdir(path, {recursive:true}, (err) => {if(err) throw err})
        } catch (err){
            console.error(err);
        }
        cb(null, path)
    },

    filename: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null, `${randomUUID()}${parse(file.originalname).ext}`)
    },

})

export const fileFilter = (req, file, cb) =>{
    if (file.mimetype.includes('image')) cb(null, true)
    else cb(null, false)
}