import express from "express";
import morgan from "morgan";
import multer from "multer";
import cors from 'cors';
import mongoose from "mongoose";
import { config } from "dotenv";
import { checkUser } from "./services/checkUser.js";
import { userValiadation } from "./services/validation.js";
import { storage, fileFilter } from "./services/storage.js";
import * as imageController from "./controllers/uploadFile.js";
import * as userController from './controllers/userController.js'
import 'dotenv'

config({path: '../.env'})
const upload = multer({ storage: storage, fileFilter:fileFilter })
const app = express()

const DB_URI = process.env.DB_URI
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

mongoose.connect(DB_URI)
    .then(() => console.log(`db is ok, db URI is: ${DB_URI}`))
    .catch(err => console.log(err))

app.use('/media', express.static('media'));
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: ['http://localhost:5173', FRONTEND_URL]
}));


app.post('/images', upload.array('image'), checkUser, imageController.uploadImage)

app.get('/images', checkUser, imageController.getAllImages)

app.get('/images/:id', checkUser, imageController.getOneImage)

app.delete('/images/:id', checkUser, imageController.deleteImage)

app.post('/registration', userValiadation, userController.userRegistration)

app.post('/login', userController.userLogin)

app.get('/getUser', checkUser, userController.getUser)

app.patch('/images/:id', checkUser, imageController.updateImage)

const PORT = process.env.PORT || 5555

app.listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log(`The app is running on a port ${PORT}`);
})