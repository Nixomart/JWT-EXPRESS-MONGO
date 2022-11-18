import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import config from "../config.js";

export const singup = async (req, res) => {
  const { username, email, password, roles } = req.body;
  
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });
  const savedUser = await newUser.save();

  //jwt
  const token = jwt.sign({id: savedUser._id}, config.SECRET, {
    expiresIn: 86400 // 24 hours
  })

  res.status(200).send({token})

};

export const singin = async (req, res) => {
  res.json("signin");
};
