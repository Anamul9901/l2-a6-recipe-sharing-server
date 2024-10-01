export interface TRating {
    postId: string;
    userEmail: string;
    type: 'rating'| 'upvote'
}