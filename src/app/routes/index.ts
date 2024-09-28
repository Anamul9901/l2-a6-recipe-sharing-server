import { Router } from "express";

const router = Router();

const moduleRoutes: any = [
  // {
  //     path: '/',
  //     route:
  // }
];

moduleRoutes.forEach((route: any) => router.use(route.path, route.route));

export default router;
