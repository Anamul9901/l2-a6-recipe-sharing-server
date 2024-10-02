export interface TComment {
  user: string;
  message: string;
}

export interface TRecipe {
  title: string;
  description: string;
  image: string;
  publishUser: string;
  publishUserId: string;
  isPremium: boolean;
  isDeleted: boolean;
  rating: number;
  upvote: number;
  downvote: number;
  comment: TComment[];
}
