//verify if the user is admin or moderator and protect the routes  -> AUTH
import config from "../config.js";
import jwt from "jsonwebtoken";
import User from '../models/User.js'
import Role from '../models/Role.js'

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "no token provided" });
try {
  const decoded = jwt.verify(token, config.SECRET)
  req.userId = decoded.id

  const user = await User.findById(req.userId, {password: 0})
  console.log(user)

  if(!user) return res.status(404).json({message: 'User not Found'})
  next();
} catch (error) {
  return res.status(401).json({message: "unauthorized"})
}
};

export const isModerator = async (req, res, next) =>{
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})
  for (let i = 0; i < roles.length; i++) {
    if(roles[i].name === 'moderator'){
      next()
      return
    }  
  }
  return res.status(403).json({message: 'require moderator role'})
}
export const isAdmin = async (req, res, next) =>{
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})
  for (let i = 0; i < roles.length; i++) {
    if(roles[i].name === 'admin'){
      next()
      return
    }  
  }
  return res.status(403).json({message: 'require admin role'})
}
