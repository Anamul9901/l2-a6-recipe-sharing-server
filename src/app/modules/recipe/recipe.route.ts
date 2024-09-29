import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { RecipeValidation } from './recipe.validation';
import { RecipeControllers } from './recipe.controller';

const router = Router();

router.post(
  '/',
  validateRequest(RecipeValidation.recipeValidationSchema),
  RecipeControllers.createRecipe
);

router.get('/', RecipeControllers.getAllRecipe);

router.get('/:id', RecipeControllers.getSingleRecipe);

router.delete('/', RecipeControllers.deleteRecipe);

export const RecipeRouter = router;
