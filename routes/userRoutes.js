import express from 'express';
import { signup, login, addExpense } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/addExpense', addExpense); // New route for adding an expense

export default router;