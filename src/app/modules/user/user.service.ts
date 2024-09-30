/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import AppError from '../../errors/AppError';
import { TChangePassword, TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import nodemailer from 'nodemailer';
import { getUserInfo } from '../../middlwares/auth';

const signUpUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  const jwtPayload = {
    email: result?.email,
    role: result?.role,
    userId: result?._id,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });
  return { data: result, token: accessToken };
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
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });

  const {
    _id,
    email,
    password,
    role,
    profileImg,
    follower,
    following,
    bio,
    premium,
    payment,
  } = isUserExists;
  const userData = {
    _id,
    email,
    password,
    role,
    profileImg,
    follower,
    following,
    bio,
    premium,
    payment,
  };
  return {
    token: accessToken,
    data: userData,
  };
};

const changePassword = async (payload: TChangePassword) => {
  const isUserExists = await User.findOne({ email: payload?.email });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.prePassword,
    isUserExists?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, 'Previous passord is incorrect!');
  }

  // hash the new password
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const updatePassword = await User.updateOne(
    { email: payload?.email },
    { password: hashedPassword }
  );

  if (updatePassword.modifiedCount === 0) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Password update failed!'
    );
  }

  const jwtPayload = {
    email: isUserExists?.email,
    role: isUserExists?.role,
    userId: isUserExists?._id,
    profileImg: isUserExists?.profileImg,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });

  return {
    token: accessToken,
  };
};

const forgatePassword = async (payload: any) => {
  const isUserExists = await User.findOne({ email: payload?.email });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  const accessToken = jwt.sign(
    { id: isUserExists?._id, email: isUserExists?.email },
    config.jwt_access_secret as string,
    { expiresIn: '10m' }
  );

  // nodejs email sender
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.reset_password_email,
      pass: config.reset_password_password,
    },
  });

  const mailOptions = {
    from: 'anamulhaque9901@gmail.com',
    to: `${isUserExists?.email}`,
    // to: `vloggera1018@gmail.com`,
    subject: 'Reset your password',
    text: `http://localhost:3000/reset-password/${accessToken}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('error', error);
    } else {
      return { message: 'Success' };
    }
  });
};

const resetPassword = async (payload: any) => {
  const { token, password } = payload;

  let decoded: any;
  try {
    decoded = jwt.verify(token, config.jwt_access_secret as string);
  } catch (err) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error verifying token'
    );
  }
  
  // Hash the new password
  const hashedPassword: any = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const id = decoded?.id;
  const updatePassword = await User.updateOne(
    { _id: id },
    { password: hashedPassword }
  );

  if (updatePassword?.modifiedCount === 0) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Password reset failed!'
    );
  }

  return { message: 'Password reset successfully!' };
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getMyData = async () => {
  const user = getUserInfo();
  const result = await User.find({ email: user?.email });
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await User.findById({ _id: id });
  const { role, profileImg, name, _id, premium, following, follower, bio } =
    result as TUser;
  const finalResult = {
    role,
    profileImg,
    name,
    _id,
    premium,
    following,
    follower,
    bio,
  };
  return finalResult;
};

const updateUser = async (id: string, payload: TUser) => {
  const user = getUserInfo();
  let result;
  if (
    (payload?.follower ||
      payload?.following ||
      payload?.follower == 0 ||
      payload?.following == 0) &&
    !payload?.bio &&
    !payload?.premium &&
    !payload?.payment &&
    !payload?.isBlocked &&
    !payload?.isDeleted &&
    !payload?.name &&
    !payload?.email &&
    !payload?.password &&
    !payload?.profileImg &&
    !payload?.role
  ) {
    result = await User.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else {
    const findRecipeByUser = await User.findOne({
      email: user?.email,
      _id: id,
    });

    if (findRecipeByUser || user?.role === 'admin') {
      result = await User.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
      });
    } else {
      throw new AppError(httpStatus.UNAUTHORIZED, 'This is not your account');
    }
  }

  return result;
};

export const UserService = {
  signUpUserIntoDB,
  loginUser,
  changePassword,
  forgatePassword,
  resetPassword,
  getAllUser,
  getMyData,
  getSingleUser,
  updateUser,
};
