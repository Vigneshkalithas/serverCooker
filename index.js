import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipe.router.js";

dotenv.config()

const app = express();
app.use(express.json())

await mongoose.connect(process.env.MONGO_URL)

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/recipe",recipeRoutes)

const PORT = 4000 || process.env.PORT;
app.listen(PORT, ()=>{
    console.log("listning on port " + PORT)
});
