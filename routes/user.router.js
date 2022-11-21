import express from "express";
import { Login, Signup , getUsers } from "../controllers/user.controller.js";

const router = express.Router();




router.post("/signup" , Signup)
router.get('/getUsers' , getUsers)
router.post("/login" , Login)




export default router;


