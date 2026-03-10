import { User } from "../db/tableUsers.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { fullName, agentCode, password, role } = req.body;

    if (!fullName || !agentCode) {
      return res.status(400).json({ message: "Enter all fields" });
    }

    const userExists = await User.findOne({ agentCode });
    if (userExists) {
      return res.status(400).json({ message: "Agent code already exists" });
    }

    const passwordToHash = role === "agent" ? fullName : password;
    const passwordHash = await bcrypt.hash(passwordToHash, 10);

    const newUser = new User({
      fullName,
      agentCode,
      passwordHash,
      role: role ? role : "agent",
    });

    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Enter old and new password" });
    }

    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    user.passwordHash = newHash;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { agentCode, password } = req.body;

    if (!agentCode || !password) {
      return res.status(400).json({ error: "Enter all fields" });
    }

    const user = await User.findOne({ agentCode });

    if (!user) {
      return res.status(400).json({ error: "agent is not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful",role : user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const returnUser = async (req, res) => {
  try {
    const token = req.user;
    if (!token) {
      return res.status(401).json({ error: "token is not defind" });
    }
    
    const user = await User.findOne({ _id: token.id });
    
    if (!user) {
      return res.status(400).json({ error: "agent is not found" });
    }

    const returnuser = {
      id: user.id,
      agentCode : user.agentCode,
      fullName : user.fullName,
      role : user.role
    };

    res.status(200).json(returnuser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


