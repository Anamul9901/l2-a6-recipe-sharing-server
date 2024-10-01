import { TRating } from './rating.interface';
import { Rating } from './rating.model';

const createRatingIntoDB = async (payload: TRating) => {
  const result = await Rating.create(payload);
  return result;
};

const getAllRatingFromDB = async () => {
  const result = await Rating.find();
  return result;
};

const deleteRatingFromDB = async (id: string) => {
  const result = await Rating.deleteOne({ _id: id });
  return result;
};

export const RatingService = {
  createRatingIntoDB,
  getAllRatingFromDB,
  deleteRatingFromDB,
};
