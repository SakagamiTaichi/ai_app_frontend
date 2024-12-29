import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: String,
  category: String,
});

const IngredientModel = mongoose.model("Ingredient", ingredientSchema);

export default IngredientModel;
