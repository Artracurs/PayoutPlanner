const User = require('../../models/User'); 

// Get all users func
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // include passwords from res
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
