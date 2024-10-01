import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { RatingValidation } from './ratine.validation';
import { RatingControllers } from './rating.controller';

const router = Router();

router.post(
  '/',
  validateRequest(RatingValidation.ratingValidationSchema),
  RatingControllers.createRating
);

router.get('/', RatingControllers.getAllRating);

router.delete('/:id', RatingControllers.deleteRating);

export const RatingRouter = router;
