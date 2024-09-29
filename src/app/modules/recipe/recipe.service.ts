import { TRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';

const createRecipeIntoDB = async (payload: TRecipe) => {
  const result = await Recipe.create(payload);
  return result;
};


export const RecipeService = {
    createRecipeIntoDB
}
