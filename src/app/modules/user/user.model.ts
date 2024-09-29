/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
const bcrypt = require('bcrypt');

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
  },
  bio: {
    type: String,
    required: false,
  },
  follower: {
    type: Number,
    required: false,
  },
  following: {
    type: Number,
    required: false,
  },
  premium: {
    type: Boolean,
    required: false,
  },
  payment: {
    type: Number,
    required: false,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
