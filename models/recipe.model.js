import mongoose from "mongoose";



const recipeSchema = new mongoose.Schema({
    recipeName:{
        type:String,
        required:[true ,'Recipe name is required']
    },
    recipePoster:{
        type:String,
        required:true
    },
    cookingTime:{
        type:Number,
        min:5,
        required:true
    },
    step:{
        type:[String],

    },
    ingName:{
        type:String,
        required:true,
    },
    ingQty:{
        type:Number,
        required:true,
        
    },
    about:{
        type:String,
        required:true
    }

})

export const Recipes = mongoose.model("recipe" ,recipeSchema)