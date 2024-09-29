import { z } from 'zod';

const recipeValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: 'Title is required' }),
    description: z.string().optional(),
    image: z.string().optional(),
    publishUser: z.string().nonempty({ message: 'Publish user is required' }),
    isPremium: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    rating: z
      .number()
      .min(0, { message: 'Rating must be at least 0' })
      .max(5, { message: 'Rating cannot exceed 5' })
      .optional(),
    upvote: z.number().optional(),
    downvote: z.number().optional(),
    comment: z
      .array(
        z.object({
          user: z.string().nonempty({ message: 'User is required' }),
          message: z.string().nonempty({ message: 'Message is required' }),
        })
      )
      .optional(),
  }),
});

const updateRecipeValidationSchema = z.object({
  body: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      isPremium: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
      rating: z
        .number()
        .min(0, { message: 'Rating must be at least 0' })
        .max(5, { message: 'Rating cannot exceed 5' })
        .optional(),
      upvote: z.number().optional(),
      downvote: z.number().optional(),
      comment: z
        .array(
          z.object({
            user: z.string().nonempty({ message: 'User is required' }),
            message: z.string().nonempty({ message: 'Message is required' }),
          })
        )
        .optional(),
    })
    .optional(),
});

export const RecipeValidation = {
  recipeValidationSchema,
  updateRecipeValidationSchema,
};
