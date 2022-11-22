import express from "express";
import {
  Login,
  Signup,
  Logout,
  getUsers,
  Auth,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.get("/getUsers", getUsers);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/auth", Auth);

export default router;
