import type { Order, OrderStatus } from "../types/order";

const statuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
];

const customers = [
  "علی احمدی",
  "سارا محمدی",
  "رضا کریمی",
  "ندا حسینی",
  "امیر رحیمی",
  "مینا جعفری",
  "امید مرادی",
  "سارا احمدی",
];

export const orders: Order[] = Array.from({ length: 30 }, (_, index) => {
  const orderNumber = 1001 + index;

  return {
    id: `ORD-${orderNumber}`,
    customer: customers[index % customers.length],
    price: 850000 + ((index * 375000) % 8500000),
    items: (index % 6) + 1,
    status: statuses[index % statuses.length],
    createdAt: new Date(
      Date.UTC(2026, 6, 1 + (index % 30), 10 + (index % 8), 30),
    ).toISOString(),
  };
});
