import jwt from "jsonwebtoken";
import  User  from "../models/User.js";

// generate a new token 
export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

//  verify token
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

// middleware to authenticate user
export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(404).json({ msg: "No token provided!" });
    }

    const token = authHeader.split(" ")[1];
    console.log({ token });

    const decoded = verifyToken(token);
    const user = await User.findById(decoded._id);

    if (!user) return res.status(404).json({ msg: "User not found!" });

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ msg: "Authentication failed!" });
  }
}
