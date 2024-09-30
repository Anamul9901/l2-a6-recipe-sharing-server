import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FollowerService } from './follower.service';

const createFollower = catchAsync(async (req, res) => {
  const result = await FollowerService.createFollowerIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follower create successfully',
    data: result,
  });
});

const getAllFollower = catchAsync(async (req, res) => {
  const result = await FollowerService.getAllFollowerFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follower retrieved successfully',
    data: result,
  });
});

const deleteFollower = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FollowerService.deleteFollowerFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follower delete successfully',
    data: result,
  });
});

export const FollowerControllers = {
  createFollower,
  getAllFollower,
  deleteFollower,
};
