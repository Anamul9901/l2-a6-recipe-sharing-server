import { model, Schema } from 'mongoose';
import { TFollower } from './follower.interface';

const followerSchema = new Schema<TFollower>({
  userId: {
    type: String,
    required: true,
  },
  followerEmail: {
    type: String,
    required: true,
  },
});

export const Follower = model<TFollower>('Follower', followerSchema);
