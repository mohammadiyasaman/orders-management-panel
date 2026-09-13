export type OrderStatus = "Pending" | "Processing" | "Completed" | "Cancelled";

export type Order = {
  id: string;
  customer: string;
  price: number;
  items: number;
  status: OrderStatus;
  createdAt: string;
};
