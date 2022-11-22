import express from "express";
import {
  createRecipies,
  deletById,
  getAllRecipies,
  getRecipeById,
  updateById,
} from "../controllers/recipe.controller.js";
import { Recipes } from "../models/recipe.model.js";
import { authorizeAdmin, authorizeUser } from "../middlewares/auth.recipe.js";

const router = express.Router();

router.get("/", getAllRecipies);

router.post("/", authorizeAdmin, createRecipies); //admin
router.get("/:id", getRecipeById);
router.patch("/:id", authorizeUser, updateById); //norml & admin
router.delete("/:id", authorizeAdmin, deletById); // admin

export default router;
