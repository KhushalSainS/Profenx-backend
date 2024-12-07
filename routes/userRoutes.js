import express from 'express';
import { signup, login, addExpense } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/addExpense', addExpense); // New route for adding an expense

module.exports = router;