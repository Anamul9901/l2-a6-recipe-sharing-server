import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { RecipeValidation } from './recipe.validation';
import { RecipeControllers } from './recipe.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../../types';

const router = Router();

router.post(
  '/',
  validateRequest(RecipeValidation.recipeValidationSchema),
  RecipeControllers.createRecipe
);

router.get('/', RecipeControllers.getAllRecipe);

router.get('/:id', RecipeControllers.getSingleRecipe);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  RecipeControllers.deleteRecipe
);

export const RecipeRouter = router;
