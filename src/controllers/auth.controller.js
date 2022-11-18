import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import config from "../config.js";
import Role from "../models/Role.js";

export const singup = async (req, res) => {
  const { username, email, password, roles } = req.body;
  
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles){
    const RoleFound = await Role.find({name: {$in: roles}})
    newUser.roles = RoleFound.map(role => role._id)
  }else{
    const role = await Role.findOne({name: "user"})
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save();

  console.log('savedUser', savedUser)

  //jwt
  const token = jwt.sign({id: savedUser._id}, config.SECRET, {
    expiresIn: 86400 // 24 hours
  })

  res.status(200).send({token})

};

export const singin = async (req, res) => {

  //we look the user and with populate fuction we show the roles with de user atribute "roles"
  const userFound = await User.findOne({email: req.body.email}).populate("roles")
  
  if (!userFound) return res.status(400).json({message: 'user not found'})
  
  //we compare the password in the body with the user password
  const passwordCompare = await User.comparePassword(req.body.password, userFound.password)
  if(!passwordCompare) return res.status(401).json({token: null, message: 'invalid password'})

  //after find user we create a token with jwt and return it
  const token = jwt.sign({id:userFound._id}, config.SECRET, {
    expiresIn: 86400
  })

  console.log('userFound', userFound)
  res.json({token})
};
