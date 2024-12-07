import express from 'express';
import { signup, login, addExpense, addExpectedData, getExpenses } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/addExpense', addExpense); // New route for adding an expense
router.post('/addExpected',addExpectedData);
router.get("/expenses",getExpenses);

export default router;