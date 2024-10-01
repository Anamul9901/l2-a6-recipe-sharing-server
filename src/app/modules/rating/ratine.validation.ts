import { z } from 'zod';

const ratingValidationSchema = z.object({
  body: z.object({
    postId: z.string(),
    userEmail: z.string().email(),
    type: z.enum(['rating', 'upvote']),
  }),
});

export const RatingValidation = {
  ratingValidationSchema,
};
