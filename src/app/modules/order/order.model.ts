import mongoose from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new mongoose.Schema<TOrder>(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      id: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
    transactionId: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TOrder>('Order', OrderSchema);
