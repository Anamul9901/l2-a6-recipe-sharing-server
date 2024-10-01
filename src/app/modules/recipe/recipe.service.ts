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
  let result;

  // Check if only specific fields related to rating, upvote, downvote, or comments are being updated
  if (
    (payload?.rating ||
      payload?.upvote ||
      payload?.downvote ||
      (payload?.rating === 0 || payload?.upvote === 0 || payload?.downvote === 0) ||
      payload?.comment?.length) &&
    !payload?.title &&
    !payload?.description &&
    !payload?.image &&
    !payload?.publishUser &&
    !payload?.isPremium &&
    !payload?.isDeleted
  ) {
    result = await Recipe.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else {
    // Find recipe by user email or check if the user is an admin
    const findRecipeByUser = await Recipe.findOne({
      publishUser: user?.email,
      _id: id,
    });

    if (findRecipeByUser || user?.role === 'admin') {
      result = await Recipe.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
      });
    } else {
      throw new AppError(httpStatus.UNAUTHORIZED, 'This is not your recipe');
    }
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
