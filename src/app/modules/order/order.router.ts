import { Router } from 'express';
import { orderController } from './order.controller';

const router = Router();

router.post('/create', orderController.createOrderController);

router.get('/', orderController.getAllOrderController);

export const orderRoutes = router;
