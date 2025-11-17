import User from "../models/User.js";
import { generateToken } from "../middleware/jwt.js";

// register new user
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken({ _id: user._id });
    res.status(201).json({ user, token });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(400).json({ msg: "Registration failed!", error });
  }
}

// login user
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found!" });

    const isMatch = await user.authenticate(password);
    if (!isMatch) return res.status(403).json({ msg: "Incorrect password!" });

    const token = generateToken({ _id: user._id });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ msg: "Login failed!", error });
  }
}

// get all users
export async function getUsers(req, res) {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching users", error });
  }
}

// delete user
export async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found!" });
    }
    res.status(200).json({ msg: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user", error });
  }
}
