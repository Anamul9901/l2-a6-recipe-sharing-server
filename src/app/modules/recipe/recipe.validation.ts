import { z } from 'zod';

const recipeValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: 'Title is required' }),
    description: z.string().optional(),
    image: z.string().optional(),
    publishUser: z
      .string()
      .nonempty({ message: 'Publish user Email is required' }),
    publishUserId: z
      .string()
      .nonempty({ message: 'Publish user Id is required' }),
    publishUserName: z.string().optional(),
    publishUserImage: z.string().optional(),
    isPremium: z.boolean().optional(),
    idPublish: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    cookingTime: z.string().optional(),
    rating: z
      .number()
      .min(0, { message: 'Rating must be at least 0' })
      .max(5, { message: 'Rating cannot exceed 5' })
      .optional(),
    upvote: z.number().min(0).optional(),
    downvote: z.number().min(0).optional(),
    instructions: z.string().optional(),
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
      idPublish: z.boolean().optional(),
      cookingTime: z.string().optional(),
      publishUserName: z.string().optional(),
      publishUserImage: z.string().optional(),
      rating: z
        .number()
        .min(0, { message: 'Rating must be at least 0' })
        .max(5, { message: 'Rating cannot exceed 5' })
        .optional(),
      upvote: z.number().min(0).optional(),
      downvote: z.number().min(0).optional(),
      instructions: z.string().optional(),
    })
    .optional(),
});

export const RecipeValidation = {
  recipeValidationSchema,
  updateRecipeValidationSchema,
};
