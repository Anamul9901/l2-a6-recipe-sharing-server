
export type TOrder = {
  user: {
    name: string;
    email: string;
    id: string;
  };
  totalPrice: number;
  status?: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentStatus?: 'Pending' | 'Paid' | 'Failed';
  transactionId: string;
};
