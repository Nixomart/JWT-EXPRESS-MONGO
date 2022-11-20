//verify if the user is admin or moderator and protect the routes  -> AUTH
import config from "../config.js";
import jwt from "jsonwebtoken";
import User from '../models/User.js'

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "no token provided" });
try {
  const decoded = jwt.verify(token, config.SECRET)
  
  const user = User.findById(decoded.id, {password: 0})
  console.log(user)

  if(!user) return res.status(404).json({message: 'User not Found'})
  next();
} catch (error) {
  return res.status(401).json({message: "unauthorized"})
}
};
