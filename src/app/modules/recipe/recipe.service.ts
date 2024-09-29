import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { getUserInfo } from '../../middlwares/auth';
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

const updateRecipeFromDB = async (id: string, payload: TRecipe) => {
  const user = getUserInfo();

  const findRecipeByUser = await Recipe.findOne({
    publishUser: user?.email,
    _id: id,
  });

  let result;
  if (findRecipeByUser || user?.role === 'admin') {
    result = await Recipe.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This is not your recipe');
  }
  return result;
};

const deleteRecipeFromDB = async (id: string) => {
  const user = getUserInfo();

  const findRecipeByUser = await Recipe.findOne({
    publishUser: user?.email,
    _id: id,
  });

  let result;
  if (findRecipeByUser || user?.role === 'admin') {
    result = await Recipe.deleteOne({ _id: id });
  } else {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This is not your recipe');
  }

  return result;
};

export const RecipeService = {
  createRecipeIntoDB,
  getAllRecipeFromDB,
  getSingleRecipeFromDB,
  updateRecipeFromDB,
  deleteRecipeFromDB,
};
