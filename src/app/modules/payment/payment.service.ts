/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'path';
import orderModel from '../order/order.model';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import { User } from '../user/user.model';

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await orderModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: 'Paid' },
      { new: true }
    );

    const user: any = await User.findOne({ email: verifyResponse?.cus_email });
    const currentDate = new Date();
    const newPremiumLastDate = new Date(currentDate); // Start with the current date

    // Calculate the new duration based on the payment amount
    if (verifyResponse?.amount === 300) {
      newPremiumLastDate.setMonth(newPremiumLastDate.getMonth() + 1); // Add 1 month
    } else if (verifyResponse?.amount === 1000) {
      newPremiumLastDate.setMonth(newPremiumLastDate.getMonth() + 6); // Add 6 months
    } else if (verifyResponse?.amount === 1500) {
      newPremiumLastDate.setFullYear(newPremiumLastDate.getFullYear() + 1); // Add 1 year
    }

    // Update premiumLastDate based on whether it exists
    let updatedPremiumLastDate: Date;

    if (user.premiumLastDate) {
      // If premiumLastDate exists, add to it
      const premiumLastDate = new Date(user.premiumLastDate);
      updatedPremiumLastDate = new Date(premiumLastDate); // Clone existing date

      // Add the new premium duration
      if (verifyResponse?.amount === 300) {
        updatedPremiumLastDate.setMonth(updatedPremiumLastDate.getMonth() + 1); // Add 1 month
      } else if (verifyResponse?.amount === 1000) {
        updatedPremiumLastDate.setMonth(updatedPremiumLastDate.getMonth() + 6); // Add 6 months
      } else if (verifyResponse?.amount === 1500) {
        updatedPremiumLastDate.setFullYear(updatedPremiumLastDate.getFullYear() + 1); // Add 1 year
      }
    } else {
      // If premiumLastDate does not exist, use the new calculated date
      updatedPremiumLastDate = newPremiumLastDate;
    }

    // Update the user with the new premium information
    await User.findOneAndUpdate(
      { email: verifyResponse?.cus_email },
      {
        premium: true,
        premiumLastDate: updatedPremiumLastDate.toISOString(),
        payment: Number(user?.payment) + Number(verifyResponse?.amount),
      },
      { new: true }
    );

    message = 'Successfully Paid';
  } else {
    message = 'Payment Failed!';
  }

  const filePath = join(__dirname, '../../../../src/public/index.html');
  let template = readFileSync(filePath, 'utf-8');
  template = template.replace('{{message}}', message);
  template = template.replace('{{message2}}', status);

  return template;
};

export const paymentServices = {
  confirmationService,
};
