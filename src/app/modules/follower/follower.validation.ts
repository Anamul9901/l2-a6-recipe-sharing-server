import { z } from 'zod';

const followerValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    followerEmail: z.string(),
  }),
});

export const FollowerValidation = {
  followerValidationSchema,
};
