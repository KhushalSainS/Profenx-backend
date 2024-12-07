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


