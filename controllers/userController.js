import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { userId, date, amount, category, title } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.expenses.push({ Date: date, Amount: amount, category, title });
    await user.save();
    res.status(200).json({ message: 'Expense added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addExpectedData = async(req,res)=>{
  try {
    const { username, dailyExpense, monthlyExpense } = req.body;
    const user = await User.find({username:username});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.maxMonthlyExpense=monthlyExpense;
    user.maxDailyExpense=dailyExpense;
    await user.save();
    res.status(200).json({ message: 'Max Expense added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


