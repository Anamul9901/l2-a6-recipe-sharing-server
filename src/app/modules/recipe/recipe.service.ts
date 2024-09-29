import { TRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';

const createRecipeIntoDB = async (payload: TRecipe) => {
  const result = await Recipe.create(payload);
  return result;
};

const getAllRecipeFromDB = async () => {
  const result = await Recipe.find();
  return result;
};

const getSingleRecipeFromDB = async (id: string) => {
  const result = await Recipe.find({ _id: id });
  return result;
};

const deleteRecipeFromDB = async (id: string, usreId: string) => {
  // const userData = await

  return true;
};

export const RecipeService = {
  createRecipeIntoDB,
  getAllRecipeFromDB,
  getSingleRecipeFromDB,
  deleteRecipeFromDB,
};
