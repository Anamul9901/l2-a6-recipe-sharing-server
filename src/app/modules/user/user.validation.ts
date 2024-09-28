import { z } from 'zod';

const signUpValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['admin', 'user']),
    profileImg: z.string().optional(),
    password: z
    .string({ invalid_type_error: 'Password must be a string' })
      .max(20, { message: 'Password can not be more than 20 caracters' }),
  }),
});

const logInValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }),
    password: z.string({ required_error: 'password is required!' }),
  }),
});

export const UserValidation = {
  signUpValidationSchema,
  logInValidationSchema,
};
