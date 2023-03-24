import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import { fileURLToPath } from 'url';

const app = express();
/* app.use('/Images/Avatars', express.static('Images/Avatars'));
app.use('/Images/PostImages', express.static('Images/PostImages')); */
dotenv.config();

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__dirname: ', __dirname);
console.log('__filename: ', __filename); */

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
/* app.use(express.static(path.join(__dirname, "client/public"))); */

const PORT = process.env.PORT || 5000;

/* app.use(express.static(
    path.join(__dirname, '../client/build/static/index.html'))); */

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server run on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('strictQuery', false);