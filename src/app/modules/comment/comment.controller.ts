import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { CommentService } from './comment.service';
import sendResponse from '../../utils/sendResponse';

const createComment = catchAsync(async (req, res) => {
  const result = await CommentService.createCommentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment create successfully',
    data: result,
  });
});

const getAllComment = catchAsync(async (req, res) => {
  const result = await CommentService.getAllCommentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment retrieved successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentService.updateCommentFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment update successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentService.deleteCommentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment delete successfully',
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getAllComment,
  updateComment,
  deleteComment,
};
