import { Recipes } from "../models/recipe.model.js";




const getAllRecipies = async (req, res) => {
    const recipes = await Recipes.find();
    res.status(200).send(recipes);
};

const  createRecipies = async (req, res) => {
    const data = req.body;
    try {
        const recipe = new Recipes(data);
        const addedRecipe = await recipe.save();
        console.log(recipe);
        res.status(201).send(addedRecipe);
    }
    catch (err) {
        res.status(400).send(err);
    }
};


const getRecipeById = async (req, res) => {
    const { id } = req.params;

    try {
        const recipes = await Recipes.findById(id);
        res.status(200).send(recipes);
    }
    catch (err) {
        res.status(400).send(err);
    }
};


const deletById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipes.findByIdAndDelete(id);
        res.status(200).send(recipe);
    }
    catch (err) {
        res.status(400).send(err);
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const recipe = await Recipes.findByIdAndUpdate(id, { ...data });
        res.status(200).send(recipe);
    }
    catch (err) {
        res.status(400).send(err);
    }
};

export { getAllRecipies , createRecipies,updateById , deletById, getRecipeById}