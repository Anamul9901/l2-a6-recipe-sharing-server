/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';
import catchAsync from '../../utils/catchAsync';

const createOrderController = async (req: any, res: any) => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    sendResponse(res as any, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (err) {
    sendResponse(res as any, {
      statusCode: 500,
      success: true,
      message: (err as any)?._message,
      data: (err as any).errors,
    });
  }
};

const getAllOrderController = catchAsync(async(req, res)=>{
  const result = await orderService.getAllOrderFromDB();
  if (!result.length) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Order Found',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
})

export const orderController = {
  createOrderController,
  getAllOrderController
};
