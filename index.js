import express from 'express';
import mongoose from 'mongoose';
<<<<<<< HEAD
import cors from "cors";
import userRoutes from './routes/userRoutes';
=======
import userRoutes from './routes/userRoutes.js';
import connectDB from "./Config/dbConfig.js";
import bodyParser from "body-parser";
>>>>>>> a2fe34a2fe07f23c88f2b0e57ab09d235818c48d

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use(cors());  
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});