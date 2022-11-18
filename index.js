import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const app = express();
app.use(express.json())

await mongoose.connect(process.env.MONGO_URL)

app.get("/",(req,res)=>{
    res.send("hello world")
})
const PORT = 4000;
app.listen(PORT, ()=>{
    console.log("listning on port " + PORT)
});