import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import connectDB from "./Config/dbConfig";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});