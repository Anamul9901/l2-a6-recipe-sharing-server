import { z } from 'zod';

const signUpValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['admin', 'user']).optional(),
    profileImg: z.string().optional(),
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .max(20, { message: 'Password can not be more than 20 caracters' }),
    bio: z.string().optional(),
    follower: z.number().optional(),
    following: z.number().optional(),
    premium: z.boolean().optional(),
    premiumLastDate: z.boolean().optional(),
    payment: z.number().optional(),
    isBlocked: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      role: z.enum(['admin', 'user']).optional(),
      profileImg: z.string().optional(),
      bio: z.string().optional(),
      follower: z.number().optional(),
      following: z.number().optional(),
      premium: z.boolean().optional(),
      premiumLastDate: z.boolean().optional(),
      payment: z.number().optional(),
      isBlocked: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
    })
    .optional(),
});

const logInValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }),
    password: z.string({ required_error: 'password is required!' }),
  }),
});

const changePasswordValidationSchema = z.object({
  doby: z.object({
    email: z.string({ required_error: 'Email is required!' }),
    prePassword: z.string({ required_error: 'Previous password is required!' }),
    newPassword: z.string({ required_error: 'New password is required!' }),
  }),
});

export const UserValidation = {
  signUpValidationSchema,
  logInValidationSchema,
  changePasswordValidationSchema,
  updateUserValidationSchema,
};
