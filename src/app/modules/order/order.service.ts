/* eslint-disable @typescript-eslint/no-explicit-any */
import { initiatePayment } from '../payment/payment.utils';
import Order from './order.model';

const createOrder = async (orderData: any) => {
  const { user, totalPrice } = orderData;

  const transactionId = `TXN-${Date.now()}`;
  const order = new Order({
    user,
    totalPrice,
    status: 'Pending',
    paymentStatus: 'Pending',
    transactionId,
  });

  await order.save();

  const paymentData = {
    transactionId,
    totalPrice,
    customerName: user.name,
    customerEmail: user.email,
    customerId: user.id,
    
  };

  //Payment
  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

const getAllOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};

export const orderService = {
  createOrder,
  getAllOrderFromDB,
};
