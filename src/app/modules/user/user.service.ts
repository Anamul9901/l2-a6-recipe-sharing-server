import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';

const signUpUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  const { _id, name, email, profileImg } = result;
  const findResult = { _id, name, email, profileImg };
  return findResult;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.findOne({ email: payload?.email });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const { _id, email, password, profileImg } = isUserExists;
  const userData = { _id, email, password, profileImg };
  return userData;
};

export const UserService = {
  signUpUserIntoDB,
  loginUser,
};
