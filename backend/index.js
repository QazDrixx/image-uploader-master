import express  from "express";
import morgan from "morgan";
import multer from "multer";
import cors from 'cors'
import { storage, fileFilter } from "./storage.js";
import { parse } from 'path'

const upload = multer({ storage: storage, fileFilter:fileFilter })
const app = express()

app.use('/media', express.static('media'));
app.use(morgan('dev'))
app.use(cors({
    origin: ['http://localhost:5173', ]
}));

app.post('/', upload.single('image'), (req, res) => {
    try {
        
        if (!req.file) {
            throw new Error("No image file provided");
        }

        const {originalname, filename, path} = req.file
        const pathToFile = path.replace(/\\/g, '/')
        const file = {
            ...req.file, 
            path: pathToFile,
            fileUrl: `${req.protocol}://${req.get('host')}/${pathToFile}`,
            originalname: parse(originalname).name,
            filename: parse(filename).name,
            fileExt: parse(filename).ext
        }

        console.log(file);
        res.send(file)
    }
    catch (err) {
        console.error("Error while processing request:", err.message);
        res.status(500).send(err.message);
    }
})

app.listen(4444, (err) => {
    if(err) console.log(err);
    else console.log('OK');
})