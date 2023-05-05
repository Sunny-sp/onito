import express from "express";
import mongoose from "mongoose";
import formRouter from './formRouter.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URL);
console.log('connected to mongoose database successfully!');
app.listen(process.env.PORT || 8080, () => {
    console.log('connect to 8080 port!');
});

app.use(cors({origin: 'http://localhost:3000'}));
app.use('/formDetails', formRouter);
