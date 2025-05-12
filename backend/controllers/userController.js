import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, "project", {
    expiresIn: "3d",
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "This user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Incorrect email/password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error.message" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "This user already exists" });
    }

    //validate email format

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    //Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error.message" });
  }
};

//Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == "admin@forever.com" && password == "qwerty123") {
      const token = jwt.sign(email + password, "project");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Incorrect email/password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error.message" });
  }
};
export { loginUser, registerUser, adminLogin };
