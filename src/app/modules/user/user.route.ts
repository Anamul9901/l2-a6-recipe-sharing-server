import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = Router();

router.post(
  '/signup',
  validateRequest(UserValidation.signUpValidationSchema),
  UserControllers.signUpUser
);

router.post(
  '/login',
  validateRequest(UserValidation.logInValidationSchema),
  UserControllers.loginUser
);

router.patch(
  '/change-password',
  // validateRequest(UserValidation.changePasswordValidationSchema),
  UserControllers.changePassword
);

router.post('/forgate-password', UserControllers.forgatePassword);

router.patch('/reset-password/:id/:token', UserControllers.resetPassword);

export const UserRouter = router;
