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

const getAllRecipe = catchAsync(async (req, res) => {
  const result = await RecipeService.getAllRecipeFromDB();
  if (!result.length) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully',
    data: result,
  });
});

const getSingleRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RecipeService.getSingleRecipeFromDB(id);
  if (!result.length) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully',
    data: result,
  });
});

const deleteRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RecipeService.deleteRecipeFromDB(id);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe deleted successfully',
    data: result,
  });
});

export const RecipeControllers = {
  createRecipe,
  getAllRecipe,
  getSingleRecipe,
  deleteRecipe,
};
