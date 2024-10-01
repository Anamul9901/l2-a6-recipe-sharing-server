import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RatingService } from './rating.service';

const createRating = catchAsync(async (req, res) => {
  const type = req.body.type;
  const result = await RatingService.createRatingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${type} create successfully`,
    data: result,
  });
});

const getAllRating = catchAsync(async (req, res) => {
  const result = await RatingService.getAllRatingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Retrieved successfully`,
    data: result,
  });
});

const deleteRating = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RatingService.deleteRatingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete successfully',
    data: result,
  });
});

export const RatingControllers = {
  createRating,
  getAllRating,
  deleteRating,
};
