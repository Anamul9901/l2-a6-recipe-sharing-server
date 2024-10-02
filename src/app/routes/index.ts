/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { RecipeRouter } from '../modules/recipe/recipe.route';
import { FollowerRouter } from '../modules/follower/follower.route';
import { RatingRouter } from '../modules/rating/rating.route';
import { CommentRouter } from '../modules/comment/comment.route';
import { paymentRoutes } from '../modules/payment/payment.route';
import { orderRoutes } from '../modules/order/order.router';

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
  {
    path: '/rating',
    route: RatingRouter,
  },
  {
    path: '/comment',
    route: CommentRouter,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route: any) => router.use(route.path, route.route));

export default router;
