import {Users} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Sessions} from '../models/session.model.js'

const Signup = async(req, res) => {
    const { username, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userData = { username, password: hash, role };
    const user = new Users(userData);
    const token = jwt.sign({ _id: user._id + Date.now() }, process.env.SECRET);
    const sessionData = new Sessions({ userId: user._id, token });
    await user.save();
    await sessionData.save();
    res.status(201).send(sessionData);
  
  };



  const getUsers = async (req, res) => {
    const user = await Users.find();
    res.status(200).send(user);
};



  
  const Login = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ username: username });

    if(!user){
      return res.status(401).send({ message: "Invalid Credentials" });
    }else{
      bcrypt.compare(password, user.password, async (err, result) => {
        if (!result) res.status(401).send({ message: "Invalid Credentials" });
        if (result) {
          const token = jwt.sign({ _id: user.id + Date.now() }, process.env.SECRET);
          const sessionData = new Sessions({ userId: user._id, token });
          await user.save();
          await sessionData.save();
          res.status(200).json({
            message : "User logged in successfully",
            sessionData
        })
        }
      });
    }

    
  };;


  const Auth = async (req , res) =>{
  const {userId ,token } = req.body
  const user = await Users.findById(userId);
   if(!user){
    return res.status(403).send({message:"Please Login"})
}
   else{
return res.send({role:user.role})
   }

  }
  
export { Signup , Login ,  getUsers , Auth};