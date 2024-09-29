import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../../types';

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

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser);

router.get('/me', auth(USER_ROLE.user), UserControllers.getSingleUser);

router.put(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser
);

router.post('/forgate-password', UserControllers.forgatePassword);

router.patch('/reset-password/:id/:token', UserControllers.resetPassword);

export const UserRouter = router;
