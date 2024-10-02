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
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: false,
    default: 'https://i.ibb.co.com/z89cgQr/profile.webp',
  },
  role: {
    type: String,
    required: false,
    enum: ['admin', 'user'],
    default: 'user',
  },
  bio: {
    type: String,
    required: false,
    default: 'Add your bio',
  },
  follower: {
    type: Number,
    required: false,
    default: 0,
  },
  following: {
    type: Number,
    required: false,
    default: 0,
  },
  premium: {
    type: Boolean,
    required: false,
    default: false,
  },
  premiumLastDate: {
    type: String,
    required: false,
  },
  payment: {
    type: Number,
    required: false,
    default: 0,
  },
  isBlocked: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
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
