import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { CommentValidation } from './comment.validation';
import { CommentControllers } from './comment.controller';

const router = Router();

router.post(
  '/',
  validateRequest(CommentValidation.commentValidationSchema),
  CommentControllers.createComment
);

router.get('/', CommentControllers.getAllComment);

router.put('/:id', CommentControllers.updateComment);

router.delete('/:id', CommentControllers.deleteComment);

export const CommentRouter = router;
