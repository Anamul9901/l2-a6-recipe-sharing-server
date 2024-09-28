import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const signUpUser = catchAsync(async (req, res) => {
  const result = await UserService.signUpUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await UserService.changePassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password update successfully',
    data: result,
  });
});

const forgatePassword = catchAsync(async (req, res) => {
  console.log('from contro=----', req.body);
  const result = await UserService.forgatePassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Check your email!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const body = req.body;
  const params = req.params;
  const data = { ...body, ...params };
  await UserService.resetPassword(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
  });
});

export const UserControllers = {
  signUpUser,
  loginUser,
  changePassword,
  forgatePassword,
  resetPassword,
};
