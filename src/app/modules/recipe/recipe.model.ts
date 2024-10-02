import { model, Schema } from 'mongoose';
import { TRecipe } from './recipe.interface';

const recipeSchema = new Schema<TRecipe>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  publishUser: {
    type: String,
    required: true,
    immutable: true,
  },
  publishUserId: {
    type: String,
    required: true,
    immutable: true,
  },
  isPremium: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  upvote: {
    type: Number,
    required: false,
    default: 0,
  },
  downvote: {
    type: Number,
    required: false,
    default: 0,
  },
  comment: {
    type: [
      {
        user: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
      },
    ],
    required: false,
  },
});

export const Recipe = model<TRecipe>('Recipe', recipeSchema);
