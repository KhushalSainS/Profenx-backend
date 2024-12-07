import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import connectDB from "./Config/dbConfig.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use(cors());  
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});