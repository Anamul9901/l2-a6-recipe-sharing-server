import { TFollower } from './follower.interface';
import { Follower } from './follower.model';

const createFollowerIntoDB = async (payload: TFollower) => {
  const result = await Follower.create(payload);
  return result;
};

const getAllFollowerFromDB = async () => {
  const result = await Follower.find();
  return result;
};

const deleteFollowerFromDB = async (id: string) => {
  const result = await Follower.deleteOne({ _id: id });
  return result;
};

export const FollowerService = {
  createFollowerIntoDB,
  getAllFollowerFromDB,
  deleteFollowerFromDB,
};
