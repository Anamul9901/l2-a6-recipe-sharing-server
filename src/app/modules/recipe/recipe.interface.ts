export interface TRecipe {
  title: string;
  description: string;
  image: string;
  publishUser: string;
  publishUserId: string;
  publishUserName: string;
  publishUserImage: string;
  cookingTime: string;
  isPremium: boolean;
  isDeleted: boolean;
  idPublish: boolean;
  rating: number;
  upvote: number;
  downvote: number;
  instructions: string;
}
