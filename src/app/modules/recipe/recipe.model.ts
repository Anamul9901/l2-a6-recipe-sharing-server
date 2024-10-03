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
  publishUserImage: {
    type: String,
    required: false,
  },
  publishUserName: {
    type: String,
    required: false,
  },
  cookingTime: {
    type: String,
    required: false,
  },
  isPremium: {
    type: Boolean,
    required: false,
    default: false,
  },
  idPublish: {
    type: Boolean,
    required: false,
    default: true,
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
  instructions: {
    type: String,
    required: false,
  },
});

export const Recipe = model<TRecipe>('Recipe', recipeSchema);
