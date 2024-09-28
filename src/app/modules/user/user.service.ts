import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const signUpUserIntoDB = async (payload: TUser) => {
  console.log('user', payload);
  const result = await User.create(payload);
  const { _id, name, email, profileImg, role } = result;
  const findResult = { _id, name, email, profileImg, role };
  return findResult;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.findOne({ email: payload?.email });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isPassswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  if (!isPassswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password is incorrect!');
  }

  //create token and sent to the client

  const jwtPayload = {
    email: isUserExists?.email,
    role: isUserExists?.role,
    userId: isUserExists?._id,
    profileImg: isUserExists?.profileImg,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });

  const { _id, email, password, profileImg, role } = isUserExists;
  const userData = { _id, email, password, profileImg, role };
  return {
    token: accessToken,
    data: userData,
  };
};

export const UserService = {
  signUpUserIntoDB,
  loginUser,
};
