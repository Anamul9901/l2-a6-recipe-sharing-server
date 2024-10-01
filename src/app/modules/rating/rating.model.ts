import { model, Schema } from 'mongoose';
import { TRating } from './rating.interface';

const ratingSchema = new Schema<TRating>({
  postId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['rating', 'upvote', 'downvote'],
    required: true,
  },
});

export const Rating = model<TRating>('Rating', ratingSchema);
