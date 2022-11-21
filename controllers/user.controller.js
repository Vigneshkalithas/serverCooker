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




  
  const Login = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ username: username });
    if (!user) return res.status(401).send({ message: "Invalid Credentials" });
    bcrypt.compare(password, user.password, async (err, result) => {
      if (!result) res.status(401).send({ message: "Invalid Credentials" });
      if (result) {
        const token = jwt.sign({ _id: user.id + Date.now() }, process.env.SECRET);
        const sessionData = new Sessions({ userId: user._id, token });
        await user.save();
        await sessionData.save();
        res.status(200).send(sessionData);
      }
    });
  };;

export { Signup , Login };