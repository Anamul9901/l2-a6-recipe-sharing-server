export interface TRating {
  postId: string;
  rating: number;
  userEmail: string;
  type: 'rating' | 'upvote' | 'downvote';
}
