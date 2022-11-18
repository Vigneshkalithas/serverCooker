import express from "express";
import { createRecipies, deletById, getAllRecipies, getRecipeById, updateById } from "../controllers/recipe.controller.js";
import { Recipes } from "../models/recipe.model.js";

const router = express.Router();



router.get("/" , getAllRecipies);


router.post("/" , createRecipies)
router.get("/:id", getRecipeById)
router.patch("/:id" , updateById)
router.delete("/:id" , deletById)



export default router;


