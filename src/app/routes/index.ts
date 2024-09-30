/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { RecipeRouter } from '../modules/recipe/recipe.route';
import { FollowerRouter } from '../modules/follower/follower.route';

const router = Router();

const moduleRoutes: any = [
  {
    path: '/user',
    route: UserRouter,
  },
  {
    path: '/recipe',
    route: RecipeRouter,
  },
  {
    path: '/follower',
    route: FollowerRouter,
  },
];

moduleRoutes.forEach((route: any) => router.use(route.path, route.route));

export default router;
