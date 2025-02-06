import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const DB_LINK = process.env.DB_LINK || 'mongodb://127.0.0.1/';
console.log(DB_LINK);

const db = mongoose.connect(`${DB_LINK}/api-tankstelle`);

export default db;


