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

    let formattedDate: any;
    const currentDate = new Date();

    // Determine future date based on the payment amount
    if (verifyResponse?.amount == 300) {
      const futureDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + 1)
      );
      formattedDate = futureDate.toISOString();
    } else if (verifyResponse?.amount == 1000) {
      const futureDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + 6)
      );
      formattedDate = futureDate.toISOString();
    } else if (verifyResponse?.amount == 1500) {
      const futureDate = new Date(
        currentDate.setFullYear(currentDate.getFullYear() + 1)
      );
      formattedDate = futureDate.toISOString();
    }

    // Check if premiumLastDate exists and if it is in the future
    let newPremiumLastDate: any;
    if (user.premiumLastDate && new Date(user.premiumLastDate) > currentDate) {
      const premiumLastDate = new Date(user.premiumLastDate);
      newPremiumLastDate = new Date(
        premiumLastDate.getTime() +
          (new Date(formattedDate).getTime() - currentDate.getTime())
      );
    } else {
      newPremiumLastDate = new Date(formattedDate);
    }

    await User.findOneAndUpdate(
      { email: verifyResponse?.cus_email },
      {
        premium: true,
        premiumLastDate: newPremiumLastDate.toISOString(),
        payment: user?.payment + verifyResponse?.amount,
      },
      { new: true }
    );

    message = 'Successfully Paid';
  } else {
    message = 'Payment Failed!';
  }

  const filePath = join(__dirname, '../../../../src/public/index.html');
  console.log('filepat', filePath);
  let template = readFileSync(filePath, 'utf-8');
  template = template.replace('{{message}}', message);
  template = template.replace('{{message2}}', status);

  return template;
};

export const paymentServices = {
  confirmationService,
};
