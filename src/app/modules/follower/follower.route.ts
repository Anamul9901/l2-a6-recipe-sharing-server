import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { FollowerValidation } from './follower.validation';
import { FollowerControllers } from './follower.controller';

const router = Router();

router.post(
  '/',
  validateRequest(FollowerValidation.followerValidationSchema),
  FollowerControllers.createFollower
);

router.get('/', FollowerControllers.getAllFollower);

router.delete('/:id', FollowerControllers.deleteFollower);

export const FollowerRouter = router;
