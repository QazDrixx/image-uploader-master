import express from "express";
import morgan from "morgan";
import multer from "multer";
import cors from 'cors';
import mongoose from "mongoose";
import { checkUser } from "./services/checkUser.js";
import { userValiadation } from "./services/validation.js";
import { storage, fileFilter } from "./services/storage.js";
import * as imageController from "./controllers/uploadFile.js";
import * as userController from './controllers/userController.js'

const upload = multer({ storage: storage, fileFilter:fileFilter })
const app = express()

mongoose.connect('mongodb+srv://qazdrixx:8aXQUWhsz0UngeI9@cluster0.pxfblkb.mongodb.net/image-upload-master?retryWrites=true&w=majority')
    .then(() => console.log('db ok'))
    .catch(err => console.log(err))

app.use('/media', express.static('media'));
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: ['http://localhost:5173', ]
}));


app.post('/images', upload.single('image'), checkUser, imageController.uploadImage)

app.get('/images', checkUser, imageController.getAllImages)

app.get('/images/:id', checkUser, imageController.getOneImage)

app.delete('/images/:id', checkUser, imageController.deleteImage)

app.post('/registration', userValiadation, userController.userRegistration)

app.post('/login', userController.userLogin)

app.get('/getUser', checkUser, userController.getUser)

app.listen(4444, (err) => {
    if(err) console.log(err);
    else console.log('OK');
})