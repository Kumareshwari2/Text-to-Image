import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// 🔹 REGISTER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🔹 Validation
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // 🔹 Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // 🔹 Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 🔹 Save user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // 🔹 Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            success: true,
            token,
            user: { name: user.name },
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// 🔹 LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 🔹 Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 🔹 Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            success: true,
            token,
            user: { name: user.name },
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// 🔹 USER CREDITS
const userCredits = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name },
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { registerUser, loginUser, userCredits };