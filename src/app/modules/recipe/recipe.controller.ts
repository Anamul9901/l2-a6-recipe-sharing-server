import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RecipeService } from './recipe.service';

const createRecipe = catchAsync(async (req, res) => {
  const result = await RecipeService.createRecipeIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe create successfully',
    data: result,
  });
});

export const RecipeControllers = {
  createRecipe,
};
