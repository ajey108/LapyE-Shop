import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";  
import jwt from "jsonwebtoken";

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2h' });
};


// Login user
const loginUser = async (req, res) => {
    res.send('login');
};


// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });
    const user = await newUser.save();

    // Create token for the user
    const token = createToken(user._id);
    console.log(token);

    // Send success response with token
    res.json({ success: true, token, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};



const adminLogin = async (req, res) => {
    res.send('adminLogin');
 }
  

  

export { registerUser , loginUser, adminLogin };