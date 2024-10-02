import { z } from 'zod';

const commentValidationSchema = z.object({
  body: z.object({
    postId: z.string(),
    commentUserId: z.string(),
    commentUserImage: z.string(),
    commentUserName: z.string(),
    comment: z.string(),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z
    .object({
      postId: z.string().optional(),
      commentUserId: z.string().optional(),
      commentUserImage: z.string().optional(),
      commentUserName: z.string().optional(),
      comment: z.string(),
    })
    .optional(),
});

export const CommentValidation = {
  commentValidationSchema,
  updateCommentValidationSchema,
};
