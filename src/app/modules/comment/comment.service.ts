import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const createCommentIntoDB = async (payload: TComment) => {
  const result = await Comment.create(payload);
  return result;
};

const getAllCommentFromDB = async () => {
  const result = await Comment.find();
  return result;
};

const updateCommentFromDB = async (id: string, payload: TComment) => {
  const result = await Comment.updateOne({ _id: id }, payload, { new: true });
  return result;
};

const deleteCommentFromDB = async (id: string) => {
  const result = await Comment.deleteOne({ _id: id });
  return result;
};

export const CommentService = {
  createCommentIntoDB,
  getAllCommentFromDB,
  updateCommentFromDB,
  deleteCommentFromDB,
};
