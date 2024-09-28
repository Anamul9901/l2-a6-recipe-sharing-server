/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';

const router = Router();

const moduleRoutes: any = [
  {
    path: '/user',
    route: UserRouter,
  },
];

moduleRoutes.forEach((route: any) => router.use(route.path, route.route));

export default router;
