import { model, Schema } from 'mongoose';
import { TComment } from './comment.interface';

const commentSchema = new Schema<TComment>({
  postId: {
    type: String,
    required: true,
    immutable: true,
  },
  commentUserId: {
    type: String,
    required: true,
    immutable: true,
  },
  commentUserImage: {
    type: String,
    required: true,
  },
  commentUserName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Comment = model<TComment>('Comment', commentSchema);
