import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const newUser = new User({ username:username, password:password });
    await newUser.save();
    console.log(newUser._id)
    console.log("signup passed!!!")
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.log("error is: "+error)
    console.log(error.message)
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
    const { username, date, amount, commonExpense, title } = req.body;
    const user = await User.findOne({ username:username });
    if (!user) {
      console.log("user not found")
      return res.status(404).json({ message: 'User not found' });
    }
    user.expenses.push({ Date: date, Amount: amount, category: commonExpense, title: title });
    await user.save();
    console.log("expense added")
    res.status(200).json({ message: 'Expense added successfully' });
  } catch (error) {
    console.log(error)
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};

export const addExpectedData = async(req,res)=>{
  try {
    const { username, dailyExpense, monthlyExpense } = req.body;
    const user = await User.findOne({username:username});
    if (!user) {
      console.log("user not found")
      return res.status(404).json({ message: 'User not found' });
    }
    user.maxMonthlyExpense=monthlyExpense;
    user.maxDailyExpense=dailyExpense;
    await user.save();
    console.log('Max Expense added successfully')
    res.status(200).json({ message: 'Max Expense added successfully' });
  } catch (error) {
    console.log(error);
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
}

export const getExpenses = async(req,res)=>{
  try {
    const { username } = req.body;
    const user = await User.findOne({username:username});
    if (!user) {
      console.log("user not found")
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Expenses fetched')
    res.status(200).json({ expenses: user.expenses, message: 'Expenses fetched' });
  } catch (error) {
    console.log(error);
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
}


