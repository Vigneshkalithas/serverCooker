import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipe.router.js";
import usersRoutes from "./routes/user.router.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// app.use(cors());
app.use(
  cors({
    origin: "https://beamish-pavlova-50ad58.netlify.app/login",
  })
);

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected");
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/recipe", recipeRoutes);
app.use("/user", usersRoutes);

// alknkhajd cmbkjccgcbv

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("listning on port " + PORT);
});
