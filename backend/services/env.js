import 'dotenv'
import { config } from "dotenv";

config({path: '../.env'})

export const {DB_URI, PORT, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, FRONTEND_URL} = process.env