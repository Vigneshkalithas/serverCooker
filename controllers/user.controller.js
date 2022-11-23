import { Users } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sessions } from "../models/session.model.js";
import nodemailer from "nodemailer";

const Signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const ExistUser = await Users.findOne({ username: username });
    if (ExistUser) {
      // res.status(400).send("user already exists");
      res.status(201).send({ message: "user already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const userData = { username, password: hash, role };
      const user = new Users(userData);
      const token = jwt.sign(
        { _id: user._id + Date.now() },
        process.env.SECRET
      );
      const sessionData = new Sessions({ userId: user._id, token });
      await user.save();
      await sessionData.save();
      res
        .status(201)
        .send({ message: "sign up successfully", sessionData: sessionData });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  const user = await Users.find();
  res.status(200).send(user);
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });

    if (!user) {
      return res.status(401).send({ message: "Invalid Credentials" });
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (!result) res.status(401).send({ message: "Invalid Credentials" });
        if (result) {
          const token = jwt.sign(
            { _id: user.id + Date.now() },
            process.env.SECRET
          );
          const sessionData = new Sessions({ userId: user._id, token });
          await user.save();
          await sessionData.save();
          res.status(200).json({
            message: "User logged in successfully",
            sessionData,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const Logout = async (req, res) => {
  try {
    const { token } = req.body;
    const expireCheck = await Sessions.findOneAndUpdate(
      { token },
      { expired: true }
    );
    await expireCheck.save();
    res.status(200).send({ message: "logout succesfully" });
  } catch (error) {
    console.log(error);
  }
};

const Auth = async (req, res) => {
  try {
    const { userId, token } = req.body;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(403).send({ message: "Please Login" });
    } else {
      return res.send({ role: user.role });
    }
  } catch (error) {
    console.log(error);
  }
};

const ForgetPassword = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await Users.findOne({ username });
    if (!user) {
      res.status(401).send({ message: "user not exists" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "15m",
      });
      await Mail(email, token);

      res.status(200).send({ token: token, user });
    }
  } catch (error) {
    console.log(error);
  }
};

async function Mail(email, token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL_TEST,
      pass: process.env.EMAIL_TEST_APP_PSWD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Cooking Box" <vigneshk@tolemy.io>', // sender address
    to: `${email}`, // list of receivers
    subject: "Reset Password", // Subject line
    text: `Copy and Paste this link in browser - ${token}`, // plain text body
    html: `<b>Copy and Paste this link in browser - ${token}</b>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
}

const Verify = async (req, res) => {
  const { token } = req.body;
  try {
    const verifyToken = jwt.verify(token, process.env.SECRET);
    console.log(verifyToken);
    res.status(200).send({ message: "verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "verification failed" });
  }
};

const Changepassword = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await Users.findByIdAndUpdate(id, { password: hash });
    console.log(user);
    await user.save();
    res.status(200).send({ message: "Changed Succussfully" });
  } catch (error) {
    console.log(error);
  }
};

export {
  Signup,
  Login,
  Logout,
  getUsers,
  Auth,
  ForgetPassword,
  Verify,
  Changepassword,
};
